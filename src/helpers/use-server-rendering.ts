import { z } from "zod";
import { useCallback, useMemo, useState } from "react";
import { CompositionProps } from "../../types/constants";

export type State =
  | {
      status: "init";
    }
  | {
      status: "preparing";
    }
  | {
      status: "bundling";
      progress: number;
    }
  | {
      status: "rendering";
      progress: number;
    }
  | {
      status: "finalizing";
      progress: number;
    }
  | {
      status: "error";
      error: Error;
    }
  | {
      status: "done";
      videoBlob: Blob;
      fileName: string;
    };

export const useServerRendering = (
  compositionId: string,
  inputProps: z.infer<typeof CompositionProps>,
) => {
  const [state, setState] = useState<State>({
    status: "init",
  });

  const renderMedia = useCallback(async () => {
    try {
      setState({ status: "preparing" });

      // 使用CLI渲染API
      const response = await fetch('/api/render-cli', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          compositionId,
          inputProps,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get response reader');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      // 读取流式响应
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        // 解码数据并添加到缓冲区
        buffer += decoder.decode(value, { stream: true });
        
        // 处理完整的消息
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // 保留未完成的行

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              switch (data.stage) {
                case 'bundling':
                  setState({
                    status: 'bundling',
                    progress: data.progress / 100,
                  });
                  break;
                
                case 'preparing':
                  setState({ status: 'preparing' });
                  break;
                
                case 'rendering':
                  setState({
                    status: 'rendering',
                    progress: data.progress / 100,
                  });
                  break;
                
                case 'finalizing':
                  setState({
                    status: 'finalizing',
                    progress: data.progress / 100,
                  });
                  break;
                
                case 'done':
                  // 将base64转换为Blob
                  const byteCharacters = atob(data.videoBase64);
                  const byteNumbers = new Array(byteCharacters.length);
                  for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                  }
                  const byteArray = new Uint8Array(byteNumbers);
                  const videoBlob = new Blob([byteArray], { type: 'video/mp4' });
                  
                  setState({
                    status: 'done',
                    videoBlob,
                    fileName: data.fileName,
                  });
                  break;
                
                case 'error':
                  throw new Error(data.error);
              }
            } catch (parseError) {
              console.warn('Failed to parse SSE data:', parseError);
            }
          }
        }
      }

    } catch (error) {
      console.error('Server rendering error:', error);
      setState({
        status: "error",
        error: error as Error,
      });
    }
  }, [compositionId, inputProps]);

  const undo = useCallback(() => {
    setState({ status: "init" });
  }, []);

  const downloadVideo = useCallback(() => {
    if (state.status === "done") {
      const url = URL.createObjectURL(state.videoBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = state.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [state]);

  return useMemo(() => {
    return {
      renderMedia,
      state,
      undo,
      downloadVideo,
    };
  }, [renderMedia, state, undo, downloadVideo]);
}; 