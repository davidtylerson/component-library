/** @type {import('next').NextConfig} */
const withSVGR = require('next-svgr');

module.exports = withSVGR({
    reactStrictMode: true,
    swcMinify: true,
});