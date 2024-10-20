/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,css,html}"],
  safelist: [
    {
      pattern: /./, // "." matches all content
      // variants: ["sm", "md", "lg", "xl", "2xl"] // you can add the variants you need here
    },
  ],

  plugins: [],
};
