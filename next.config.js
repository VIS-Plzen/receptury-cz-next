/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Pro hostování na vlastním serveru
  reactStrictMode: true, // Přísný režim Reactu

  // Nastavení proměnných prostředí
  // env: {
  //   GITHUB_BRANCH_NAME: process.env.NEXT_PUBLIC_GITHUB_BRANCH_NAME,
  //   NEXT_PUBLIC_BUILD_TIMESTAMP: new Date().toISOString(),
  // },
};

module.exports = nextConfig;
