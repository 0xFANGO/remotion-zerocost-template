import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, readFile, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { z } from 'zod';

const execAsync = promisify(exec);

// 输入验证
const renderRequestSchema = z.object({
  compositionId: z.string(),
  inputProps: z.object({
    title: z.string(),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { compositionId, inputProps } = renderRequestSchema.parse(body);

    // 创建流式响应
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        
        const sendProgress = (data: any) => {
          const message = `data: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(message));
        };

        try {
          sendProgress({ stage: 'preparing', progress: 0 });

          // 1. 创建临时props文件
          const tmpDir = tmpdir();
          const propsFile = join(tmpDir, `props-${Date.now()}.json`);
          const outputFile = join(tmpDir, `video-${Date.now()}.mp4`);

          await writeFile(propsFile, JSON.stringify(inputProps));
          sendProgress({ stage: 'preparing', progress: 50 });

          // 2. 使用Remotion CLI渲染
          sendProgress({ stage: 'rendering', progress: 0 });
          
          const command = `npx remotion render ${compositionId} "${outputFile}" --props="${propsFile}" --log=verbose`;
          
          console.log('Executing command:', command);
          
          // 执行命令并捕获进度
          const childProcess = exec(command, { 
            cwd: process.cwd(),
            maxBuffer: 1024 * 1024 * 10, // 10MB buffer
          });

          let lastProgress = 0;
          
          // 监听stdout以获取进度信息
          childProcess.stdout?.on('data', (data: Buffer) => {
            const output = data.toString();
            console.log('Remotion output:', output);
            
            // 尝试解析进度信息
            const progressMatch = output.match(/(\d+)%/);
            if (progressMatch) {
              const progress = parseInt(progressMatch[1]);
              if (progress > lastProgress) {
                lastProgress = progress;
                sendProgress({ stage: 'rendering', progress });
              }
            }
          });

          childProcess.stderr?.on('data', (data: Buffer) => {
            console.error('Remotion error:', data.toString());
          });

          // 等待命令完成
          await new Promise((resolve, reject) => {
            childProcess.on('close', (code: number | null) => {
              if (code === 0) {
                resolve(code);
              } else {
                reject(new Error(`Remotion command failed with exit code ${code}`));
              }
            });
          });

          // 3. 读取生成的视频文件
          sendProgress({ stage: 'finalizing', progress: 0 });
          
          const videoBuffer = await readFile(outputFile);
          const videoBase64 = videoBuffer.toString('base64');

          // 4. 清理临时文件
          try {
            await unlink(propsFile);
            await unlink(outputFile);
          } catch (error) {
            console.warn('Failed to clean up temporary files:', error);
          }

          // 5. 发送最终结果
          sendProgress({ 
            stage: 'done', 
            progress: 100,
            videoBase64,
            fileName: `${inputProps.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp4`
          });

          controller.close();

        } catch (error) {
          console.error('CLI Render error:', error);
          sendProgress({ 
            stage: 'error', 
            error: error instanceof Error ? error.message : String(error) 
          });
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('CLI Request error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Invalid request',
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
} 