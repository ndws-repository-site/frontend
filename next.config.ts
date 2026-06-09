import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        qualities: [75, 100],
    },
    output: "standalone",
};

export default nextConfig;
