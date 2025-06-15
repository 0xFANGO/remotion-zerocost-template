[中文版](README.zh.md)

---

# Remotion Next.js Zero-Cost Template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Remotion 4.0](https://img.shields.io/badge/Remotion-4.0-blue)](https://www.remotion.dev/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)

**Tired of AWS bills and complex cloud setups just to render a video? This is the template for you.**

This is a powerful, open-source Remotion + Next.js template designed to render and download videos **entirely in the user's browser**. Say goodbye to AWS Lambda, S3 buckets, and complicated IAM roles. With this template, you can build and share your programmatic video creations with **zero cloud costs**.

It's the perfect starting point for hobbyists, indie developers, and anyone who wants to explore the magic of Remotion without the financial commitment.

![Demo GIF - A screen recording showing the process of clicking 'Render Video', the progress bar advancing, and then clicking 'Download Video' to save the file locally.](https://placehold.co/800x400/2d3748/ffffff/gif?text=Your+Epic+Demo+GIF+Here)
*(Suggestion: Replace the placeholder above with a real GIF of your project in action!)*

## Why This Template is a Game-Changer

The official Remotion templates are fantastic, but they often guide you down the path of server-side rendering on AWS Lambda. This is powerful for production-scale applications, but it introduces significant friction for many use cases:

-   **Cost:** AWS services aren't free. Even small projects can incur costs.
-   **Complexity:** Setting up AWS Lambda, S3, and IAM permissions is a steep learning curve.
-   **Barriers to Entry:** The need for a cloud account and extensive configuration can discourage newcomers.

This template **eliminates all of that**. It leverages Remotion's `renderMediaOnBrowser()` function to perform all the heavy lifting directly in the client.

## Key Features

-   🚀 **100% Free to Use & Deploy:** No cloud services, no hidden fees. Your browser is the server.
-   🌐 **Client-Side Rendering:** Renders videos directly in the browser using the latest WebCodecs API.
-   💨 **Built on Next.js 15:** Utilizes the latest features of Next.js with the App Router.
-   🎨 **Styled with TailwindCSS:** A utility-first CSS framework for rapid UI development.
-   📥 **Direct Download:** Users can download the rendered MP4 file with a single click.
-   📊 **Real-time Progress:** A clean UI shows the rendering progress, frame by frame.
-   🔧 **Easily Customizable:** Swap in your own Remotion compositions with minimal effort.
-   🚀 **Deploy Anywhere:** Easily deploy to static hosting platforms like Vercel, Netlify, or GitHub Pages.

## Getting Started

Get your project up and running in minutes.

1.  **Use this template:**
    Click the "Use this template" button at the top of the GitHub page to create your own repository.

2.  **Clone your new repository:**
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result!

## How It Works

This template harnesses the power of `renderMediaOnBrowser` from the `@remotion/renderer` package. Here's a simplified breakdown:

1.  A user clicks the "Render" button on the frontend.
2.  We call `renderMediaOnBrowser`, passing it our Remotion composition.
3.  Remotion uses the browser's built-in WebCodecs API to render each frame of the video.
4.  The progress is tracked and updated in the UI via state management.
5.  Once rendering is complete, the output is a `Blob` (a file-like object).
6.  This `Blob` is converted into a downloadable URL, which is then assigned to a download button.

All of this happens in the user's browser tab—no backend servers or cloud functions are involved in the rendering process.

## Customization

To use your own Remotion creation, you just need to update a few things:

1.  **Create your Remotion composition:**
    Develop your video in the `src/remotion/MyComposition.tsx` file (or create new ones). Don't forget to also update `src/remotion/Root.tsx` to register your new compositions.

2.  **Update the main page:**
    Open `src/app/page.tsx`. Find the `PLAYER_PARAMS` constant and update the `compositionName` to match the one you want to render. You can also adjust the `durationInFrames`, `fps`, and input props here.

That's it! The rendering and player components will automatically use your new composition.

## Deployment

Deploy this template for free on any static hosting provider. Since this template generates a fully static site, it can be hosted for free on platforms like Vercel or Netlify, allowing you to share your video creator with anyone.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fyour-repo-name)
*(Remember to replace the repository URL in the Vercel button with your own!)*

The build process will create a standard Next.js static export that can be hosted anywhere.

## Remotion Commands

You can still use all the standard Remotion commands for local development and testing.

-   **Open the Remotion Studio:**
    ```bash
    npx remotion studio
    ```
-   **Render a video using the CLI (for testing):**
    ```bash
    npx remotion render
    ```
-   **Upgrade Remotion packages:**
    ```bash
    npx remotion upgrade
    ```

## Contributing

Contributions are welcome! If you have ideas for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE.md) file for details. It's completely open-source and free for you to use, modify, and distribute.

---

_Made with ❤️ for the creative coding community._

---
