import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children, title, content }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

			<Header />

      <main className="100vh">{children}</main>

			<Footer />
    </>
  );
}

export default Layout;
