/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // 解决 Remotion 平台特定依赖问题
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@remotion/compositor-win32-x64-msvc': 'commonjs @remotion/compositor-win32-x64-msvc',
        '@remotion/compositor-linux-x64-gnu': 'commonjs @remotion/compositor-linux-x64-gnu',
        '@remotion/compositor-linux-arm64-gnu': 'commonjs @remotion/compositor-linux-arm64-gnu',
        '@remotion/compositor-darwin-x64': 'commonjs @remotion/compositor-darwin-x64',
      });
    }
    
    // 忽略平台特定的可选依赖
    config.resolve = config.resolve || {};
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@remotion/compositor-win32-x64-msvc': false,
      '@remotion/compositor-linux-x64-gnu': false,
      '@remotion/compositor-linux-arm64-gnu': false,
      '@remotion/compositor-darwin-x64': false,
    };

    return config;
  },
};

module.exports = nextConfig;
