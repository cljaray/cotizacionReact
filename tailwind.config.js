 // tailwind.config.js
 module.exports = {
     purge: ['./src/**/*.js', './public/index.html'],
     darkMode: false, // or 'media' or 'class'
     theme: {
       extend: {},
     },
     variants: {
       extend: {
         ringWidth:['hover','active']
       },
     },
     plugins: [
         
     ],
   }