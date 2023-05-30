/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        "10px": [
          "1rem",
          {
            lineHeight: "0.9rem",
            fontWeight: "400",
          },
        ],
        "mobile-10px-spec": [
          "1rem",
          {
            letterSpacing: '0.08em',
            fontWeight: "400",
           
          },
        ],
        "11px": [
          "1.1rem",
          {
            lineHeight: "0.9rem",
            fontWeight: "400",
            letterSpacing: '0.06em',
          },
        ],
        "11px-less-condensed": [
          "1.1rem",
          {
            lineHeight: "0.9rem",
            fontWeight: "400",
            letterSpacing: '0.1em',
          },
        ],
        "12px": [
          "1.2rem",
          {
            lineHeight: "100%",
            fontWeight: "400",
            letterSpacing: '0.05em',
          },
        ],
        "14px": [
          "1.4rem",
          {
            lineHeight: "125%",
            fontWeight: "400",
            letterSpacing: '0.02em',
          },
        ],
        "16px": [
          "1.6rem",
          {
            lineHeight: "100%",
            fontWeight: "200",
            letterSpacing: '0.06em',
          },
        ],
        "16pxCustomline": [
          "1.6rem",
          {
            lineHeight: "150%",
            fontWeight: "200",
            letterSpacing: '0.01em',
          },
        ],
        "21px": [
          "2.1rem",
          {
            lineHeight: "100%",
            fontWeight: "400",

          },
        ],
        "24px": [
          "2.4rem",
          {
            lineHeight: "115%",
            fontWeight: "200",
            letterSpacing: '0.01em'
          },
        ],
        "28px": [
          "2.8rem",
          {
            lineHeight: "125%",
            fontWeight: "200",
            letterSpacing: '-0.01em'
          },
        ],
        "36px": [
          "3.6rem",
          {
            lineHeight: "115%",
            fontWeight: "200",
  
          },
        ],
        "40px": [
          "4rem",
          {
            lineHeight: "100%",
            fontWeight: "100",
  
          },
        ],
      },
      colors:{
        'soft-black': '#1A1A19',
        'soft-white':'#FCFBF8',
        'opacity-white':'#CDC9C1',
        'soft-grey':'#AAA69F',
        'mid-grey':'#726F6A',
        'soft-black-text':'#32312F',
        'spec-black':"#13181F"
      }
    },
    plugins: [],
  },
};
