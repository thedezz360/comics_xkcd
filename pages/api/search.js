// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



import { searchService } from "services/search"

// Connect and authenticate with your Algolia app
//aplication ID -> HV0BDBDZ5V
//search only API Key -> 4ce960133e26958400c89e71dd23f543



export default async function handler(req, res) {

	const {query:{search}} = req

	console.log(search);
	const {results} = await searchService( {query : search})

  return res.status(200).json({ results })
}
