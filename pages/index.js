import React from "react";
import { Container } from "@nextui-org/react";
import "../styles/Home.module.css";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import Header from "components/Header";
import Footer from "components/Footer";
import Layout from "components/Layout";

import fs from "node:fs/promises";

function index({ latestComics }) {
  return (
    <Layout
      title="xkcd - comics for developers"
      content="Comics for developers"
    >
      <Container>
        <h2 className="text-5xl font-bold text-center mb-10 ">Latest Comics</h2>

        <section className="grid grid-cols-1 gap-4 max-w-6xl m-auto sm:grid-cols-2 xl:grid-cols-3 ">
          {latestComics.map((comic) => {
            return (
              <Link
                key={comic.id}
                href={`/comic/${comic.id}`}
                className="mb-4 pb-4"
              >
                <h3 className="font-semibold text-lg text-center mb-2">
                  {comic.title}
                </h3>

                <Image
                  src={comic.img}
                  alt={comic.alt}
                  width={comic.width}
                  height={comic.height}
                  className="m-auto"
                />
              </Link>
            );
          })}
        </section>

       
      </Container>
    </Layout>
  );
}

export default index;

//function para obtener los comics
export async function getStaticProps() {
  //devuelve array con los nombres de los archivos que estan en la carpeta comics
  const files = await fs.readdir("./comics");
  console.log(files);

  //ultimos 10 comics
  const latestComicsFiles = files.slice(-10);

  //devuelve promesas
  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, "utf8");

    return JSON.parse(content);
  });

  console.log(promisesReadFiles);
  //ejecutamos las promesas
  const latestComics = await Promise.all(promisesReadFiles);
  //promesas resueltas
  console.log(latestComics);

  return {
    props: {
      latestComics,
    },
  };
}
