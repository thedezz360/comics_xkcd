import React from 'react'
import Head from 'next/head'
import Layout from 'components/Layout'
import { Container } from '@nextui-org/react'
import { searchService } from 'services/search'

import Image from 'next/image'
import { useI18n } from 'context/i18n'

function Index({search, results}) {
	console.log(search)

	const {t} = useI18n();

	return (

		<Layout 
			title={`xkcd - Results for ${search}`} 
			content={`Search results for ${search}`}
		>

			
			<h1>{t("SEARCH_RESULT_TITLE", results.length, search)} </h1>

			<ul className='bg-gray-100'>
			{results.map(hit =>{
				return(
					<li 
						key={hit.id}
						className='flex items-center h-[50px] hover:bg-gray-200'
					>
						<Image
							alt={hit.alt}
							src={hit.img}
							width={50}
							height={50}
						/>
						<span>
							{hit.title}
						</span>

						
					</li>
				 )
			})}
			</ul>
			
			
		</Layout>
	)
}

export default Index

export async function getServerSideProps(context){
	const {query} = context;
	
	//si no tenemos un search en la query , ponemos cadena vacia
	let {search = ""} = query;

	console.log(search)

	//buscamos en algolia
	const {results} = await searchService({query: search})

	console.log(results)

	return {
		props:{
			search,
			results
		}
	}
}