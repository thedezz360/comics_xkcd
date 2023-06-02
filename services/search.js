import algoliasearch from "algoliasearch"


const APP_ID = process.env.APP_ID
const API_KEY = process.env.API_KEY

const client = algoliasearch(APP_ID, API_KEY)
const index = client.initIndex("prod_comics")



export const searchService = async ({query}) =>{
	
	
	const {hits} = await index.search(query,{
		hitsPerPage: 10,
		attributesToRetrieve: ["id", "title", "img", "alt"]
	})
 
	return {results : hits}
}