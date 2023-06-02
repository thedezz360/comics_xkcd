import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@nextui-org/react";

function Layout({ children, title, content }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>

        <Header />

        <main>{children}</main>

        <Footer />

      </Container>
    </>
  );
}

export default Layout;
