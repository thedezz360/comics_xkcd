/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
	images:{
		domains:["imgs.xkcd.com"]
	},
	i18n:{
		locales:["en", "es"],
		defaultLocale:"en",
		
	}
}

/**
 *  i18n nos creara subpaths 
 * /es/comic/123 -> es
 * /comic/123 -> en

 */

module.exports = nextConfig
