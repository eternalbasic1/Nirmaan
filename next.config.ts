import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/Home", destination: "/", permanent: true },
      {
        source: "/ProductDetail",
        destination: "/products/jk-super-cement-50kg",
        permanent: true,
      },
      { source: "/SiteDashboard", destination: "/dashboard", permanent: true },
    ];
  },
};
export default config;
