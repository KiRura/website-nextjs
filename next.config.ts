import type { NextConfig } from "next";

export default {
   reactCompiler: true,
   experimental: {
      optimizePackageImports: ["@chakra-ui/react"]
   }
} satisfies NextConfig;
