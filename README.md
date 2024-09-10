# mern-ecommerce
 #cd Client 

/*Install tailwind**/

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

/**Add this to the tailwind.config.js**/
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
/***Add above in index.css to run tailwind file**/
@tailwind base;
@tailwind components;
@tailwind utilities;
/**SERVER SIDE INSTILIZATION**/
cd Server
npm i express
npm i nodemon
/***For react router dom **/
npm install react-router-dom 
/****GOOGLE AUTHENTICATION***/
https://console.cloud.google.com/apis/dashboard?pli=1 ----GOOGLE API
npm i passport-google-oauth20
/**TO RUN CONCURRENTLY **/
npm install concurrently --save-dev



