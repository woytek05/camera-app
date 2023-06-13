/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./static/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
    theme: {
        extend: {},
    },
    plugins: [require("autoprefixer"), require("flowbite/plugin")],
};
