/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['categorygafpri.s3.us-east-2.amazonaws.com', 'tiendasgafpri.com'],
  },
  env: {
    API_URL: process.env.API_URL,
    IMAGE_ACCESS_KEY_ID: process.env.IMAGE_ACCESS_KEY_ID,
    IMAGE_SECRET_ACCESS_KEY: process.env.IMAGE_SECRET_ACCESS_KEY,
    IMAGE_REGION: process.env.IMAGE_REGION,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  },
};

export default nextConfig;
