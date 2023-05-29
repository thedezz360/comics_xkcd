import React from "react";
import Head from "next/head";
import Header from "components/Header";
import Image from "next/image";
import {readFile, stat, readdir} from "fs/promises"
import Link from "next/link";
import {basename} from "path"
import Layout from "components/Layout";


function Comic({ img, width, height, alt, title, hasNext, hasPrevious, prevId, nextId }) {
	
	
  return (
    <Layout title={`xkcd - comics for developers`} content={`Comics for developers`}>

      

      
				<section className="max-w-lg m-auto flex flex-col "> 

        	<h1 className="font-bold text-2xl my-7 text-center">{title}</h1>
        	
					<div className="max-w-sm m-auto mb-2">
						<Image 
							className="self-center" 
							alt={alt} 
							width={width}
							height={height} 
							src={img} 
						/>
					</div>

					<p className="font-semibold">{alt}</p>

					{/* paginacion */}
					<div className="flex justify-between mt-4 font-bold ">
					{
						hasPrevious && 
						<Link
							className="text-gray-600" 
							href={`/comic/${prevId}`}
						>
							⬅ Previous
						</Link>
					}
					{
						hasNext && 
						<Link 
							className="text-gray-600"
							href={`/comic/${nextId}`}
						>
							Next ➡
						</Link>
					}
					</div>
					{/* fin paginacion */}

				</section>
      
    </Layout>
  );
}

export default Comic;

export async function getStaticPaths(){
	const files = await readdir("./comics")

	const paths = files.map(file => {
		const id = basename(file, ".json")
		return {params: {id}}
	})

	//forma dinamica
	return {
		paths,
		fallback:false
	}

	//forma estatica
	// return {
	// 	paths:[
	// 		{ params : {id:"2771"}}
	// 	],
	// 	fallback:true 
	// }
}

export async function getStaticProps({ params }) {
  const {id} = params;
	console.log(id)
	const content = await readFile(`./comics/${id}.json`, "utf8")
	const comic = await JSON.parse(content);

	//parseamos id a number
	const idNumber = +id

	const prevId = idNumber - 1
	const nextId = idNumber + 1

	//comprobamos si existen los archivos
	const [prevResult, nextResult] = await Promise.allSettled([
		
	 stat(`./comics/${prevId}.json`),
	 stat(`./comics/${nextId}.json`)

	])

	//verificamos si tenemos los archivos
	const hasPrevious = prevResult.status === "fulfilled"
	const hasNext = nextResult.status === "fulfilled"

	console.log({hasNext})
	console.log({hasPrevious})


	console.log(comic);

	return {
		props:{
			...comic,
			hasPrevious,
			hasNext,
			nextId,
			prevId
		}
	}
}
