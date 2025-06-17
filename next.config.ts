import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "popcollectibles.store", 
      "via.placeholder.com", 
      "img.redbull.com", 
      "images.remotePatterns", 
      "drive.google.com", 
      "pikaso.cdnpk.net",
      "media.licdn.com",         // LinkedIn profile images
      "static.licdn.com",        // LinkedIn static assets
      "avatars.githubusercontent.com",  // GitHub avatar images
      "github.githubassets.com",        // GitHub assets
    ],
  },
};

export default nextConfig;