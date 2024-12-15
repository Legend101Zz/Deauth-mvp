/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "source.unsplash.com",
      "lh3.googleusercontent.com", // For Google OAuth profile pictures
    ],
  },
};

export default nextConfig;
