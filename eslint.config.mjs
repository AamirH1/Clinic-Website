import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ["legacy/**", ".next/**", "node_modules/**"]
  }
];

export default eslintConfig;
