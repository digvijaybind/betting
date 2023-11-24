// tailwind.config.js

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins100: ['Poppins_100Thin'],
        poppins200: ['Poppins_200ExtraLight'],
        poppins300: ['Poppins_300Light'],
        poppins400: ['Poppins_400Regular'],
        poppins500: ['Poppins_500Medium'],
        poppins600: ['Poppins_600SemiBold'],
        poppins700: ['Poppins_700Bold'],
        poppins800: ['Poppins_800ExtraBold'],
        poppins900: ['Poppins_900Black'],
      },
    },
  },
  plugins: [],
};
