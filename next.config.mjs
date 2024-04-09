/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [      "usefuns.s3.ap-south-1.amazonaws.com",
      "usefuns-dev.s3.ap-south-1.amazonaws.com",],
      // Other image configuration options can be added here
    }
  };
  

export default nextConfig;
