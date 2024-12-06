/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    './src/common/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "primary-gradient": "linear-gradient(to right, #FF902F 0%, #FC6075 100%)"
      },
      colors : {
        'orange-opacity': 'rgba(255, 155, 68, 0.2)',
        'primary-card' : '#312d29',
        'primary-border' : '#464547',
        'primary-body' : '#242220'
      }
    },
  },
  plugins: [],
};
