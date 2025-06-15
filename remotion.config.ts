// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";
import { webpackOverride } from "./src/remotion/webpack-override.mjs";

// 优化图像格式和质量
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(90);

// 设置编解码器
Config.setCodec("h264");

// 设置合理的超时时间
Config.setTimeoutInMilliseconds(120000); // 2分钟

// 设置视频比特率
Config.setVideoBitrate("1M");

Config.overrideWebpackConfig(webpackOverride);
