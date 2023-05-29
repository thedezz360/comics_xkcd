import React from 'react'
import Head from 'next/head'
import Layout from 'components/Layout'

function index({search}) {
	console.log(search)
	return (
		<Layout title={`xkcd - Results for ${search}`} content={`Search results for ${search}`}>


			<h1>Resultados para {search}</h1>
			
		</Layout>
	)
}

export default index

export async function getServerSideProps(context){
	const {query} = context;
	console.log(context)
	console.log(query)
	//si no tenemos un search en la query , ponemos cadena vacia
	let {search = ""} = query;

	

	//llamar a la api de algolia para buscar los resultados

	return {
		props:{
			search
		}
	}
}