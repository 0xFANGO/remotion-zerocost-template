[English Version](README.md)

---

# Remotion Next.js 零成本模板 (中文版)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Remotion 4.0](https://img.shields.io/badge/Remotion-4.0-blue)](https://www.remotion.dev/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)

**厌倦了仅仅为了渲染一个视频就得支付 AWS 账单和应付复杂的云设置？这个模板就是为你准备的。**

这是一个强大的开源 Remotion + Next.js 模板，旨在**完全在用户浏览器中**渲染和下载视频。告别 AWS Lambda、S3 存储桶和复杂的 IAM 角色。使用此模板，您可以**零云成本**构建和分享您的编程视频作品。

对于业余爱好者、独立开发者以及任何想要探索 Remotion 魅力而无需承担财务压力的朋友来说，这是一个完美的起点。

![演示 GIF - 屏幕录像显示点击"渲染视频"，进度条前进，然后点击"下载视频"将文件保存到本地。](https://placehold.co/800x400/2d3748/ffffff/gif?text=这里替换成你的项目GIF动图!)
*(建议：将上面的占位符替换为您项目实际运行的 GIF 动画！)*

## 为什么说这个模板改变了游戏规则？

Remotion 官方模板非常出色，但它们通常引导您走向在 AWS Lambda 上进行服务器端渲染的道路。这对于生产级应用来说功能强大，但对于许多使用场景却带来了巨大的阻力：

-   **成本：** AWS 服务不是免费的。即使是小项目也可能产生费用。
-   **复杂性：** 设置 AWS Lambda、S3 和 IAM 权限的学习曲线非常陡峭。
-   **入门门槛：** 需要云服务账户和繁琐的配置会劝退许多新手。

这个模板**消除了所有这些问题**。它利用 Remotion 的 `renderMediaOnBrowser()` 函数，将所有繁重的工作直接在客户端完成。

## 核心功能

-   🚀 **100% 免费使用和部署：** 没有云服务，没有隐藏费用。你的浏览器就是服务器。
-   🌐 **客户端渲染：** 使用最新的 WebCodecs API 直接在浏览器中渲染视频。
-   💨 **基于 Next.js 15 构建：** 基于最新版本的 Next.js 之上，并使用 App Router。
-   🎨 **使用 TailwindCSS 设计样式：** 一个功能优先的 CSS 框架，用于快速 UI 开发。
-   📥 **直接下载：** 用户只需单击一下即可下载渲染好的 MP4 文件。
-   📊 **实时进度：** 简洁的 UI 逐帧显示渲染进度。
-   🔧 **易于定制：** 只需最少的努力即可换上您自己的 Remotion 合成。
-   🚀 **随处部署：** 可轻松部署到 Vercel、Netlify 或 GitHub Pages 等静态托管平台。

## 快速上手
只需几分钟即可让您的项目运行起来。

1.  **使用此模板：**
    点击 GitHub 页面顶部的 "Use this template" 按钮，创建您自己的存储库。

2.  **克隆您的新存储库：**
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

3.  **安装依赖：**
    ```bash
    npm install
    # 或
    yarn install
    ```

4.  **运行开发服务器：**
    ```bash
    npm run dev
    ```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果！

## 工作原理

该模板利用了 `@remotion/renderer` 包中的 `renderMediaOnBrowser` 的强大功能。下面是简化的工作流程：

1.  用户在前端点击"渲染"按钮。
2.  我们调用 `renderMediaOnBrowser`，并将我们的 Remotion 合成传递给它。
3.  Remotion 使用浏览器内置的 WebCodecs API 来渲染视频的每一帧。
4.  通过状态管理在 UI 中跟踪并更新进度。
5.  渲染完成后，输出的是一个 `Blob`（一个类文件对象）。
6.  这个 `Blob` 被转换成一个可下载的 URL，然后赋给一个下载按钮。

所有这一切都发生在用户的浏览器标签页中——渲染过程不涉及任何后端服务器或云函数。

## 如何定制

要使用您自己的 Remotion 作品，只需更新几处：

1.  **创建您的 Remotion 合成：**
    在 `src/remotion/MyComposition.tsx` 文件中开发您的视频（或创建新文件）。别忘了同时更新 `src/remotion/Root.tsx` 来注册您的新合成。

2.  **更新主页面：**
    打开 `src/app/page.tsx`。找到 `PLAYER_PARAMS` 常量，并更新 `compositionName` 以匹配您想要渲染的合成名称。您还可以在此处调整 `durationInFrames`、`fps` 和输入属性。

就这样！渲染和播放器组件将自动使用您的新合成。

## 部署

在任何静态托管提供商上免费部署此模板。由于该模板会生成一个完全静态的网站，因此可以免费托管在 Vercel 或 Netlify 等平台上，让您可以与任何人分享您的视频创作工具。

[![使用 Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fyour-repo-name)
*(请记得将 Vercel 按钮中的存储库 URL 替换为您自己的！)*

构建过程将创建一个标准的 Next.js 静态导出文件，可以托管在任何地方。

## Remotion 命令

您仍然可以使用所有标准的 Remotion 命令进行本地开发和测试。

-   **打开 Remotion Studio：**
    ```bash
    npx remotion studio
    ```
-   **使用 CLI 渲染视频（用于测试）：**
    ```bash
    npx remotion render
    ```
-   **升级 Remotion 包：**
    ```bash
    npx remotion upgrade
    ```

## 贡献

欢迎各种贡献！如果您有改进的想法，请随时开启一个 issue 或提交一个 pull request。

## 许可证

该项目采用 **MIT 许可证**授权 - 详情请参阅 [LICENSE.md](LICENSE.md) 文件。它完全开源，您可以自由使用、修改和分发。 