import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/socialbee-ui/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    colors: {
      'primary-100': '#FDEFD4',
      'primary-200': '#FEE3AD',
      'primary-300': '#FEDB93',
      'primary-400': '#fed27a',
      'primary-500': '#FEC961',
      'primary-600': '#FEC147',
      'primary-700': '#FDB82E',
      'primary-800': '#CC9423',
      'primary-900': '#4C3F24',
      'secondary-50': '#7B7B7B',
      'secondary-100': '#4A4A4A',
      'secondary-200': '#3D3D3D',
      'secondary-300': '#303030',
      'secondary-400': '#242424',
      'secondary-500': '#171717',
      'light-gray': '#F2F2F2',
      'middle-gray': '#A7A7A7',
      'high-dark': '#5D6974',
      'dark-gray': '#4F4F4F',
      anthracite: '#242424',
      confirmed: '#34A853',
      error: '#E62121',
      newtral: '#F6F7F8',
      'text-primary': '#121C24',
      'text-secondary': '#28333E',
      'text-tertiary': '#5D6974',
      'text-diap-primary': '#F6F7F8',
      'text-diap-secondary': '#E5E8EB',
      'overheader': '#5D6974',
      'border-primary': '#E5E8EB',
      'background-primary': '#FFFFFF',
      'background-secondary': '#F6F7F8'

    },
    extend: {
      lineHeight: {
        '20': '4rem',
      },
      height: {
        'screen-3/4': '75vh',
      },
      spacing: {
        '128': '36rem',
        '144': '39rem',
        '192': '48rem',
        '240': '66rem',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        heading: ['apercu-bold-pro', '-apple-system', 'system-ui', 'sans-serif'],
        body: ['apercu-regular-pro', '-apple-system', 'system-ui', 'sans-serif'],
        display: ['apercu-regular-pro', '-apple-system', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
