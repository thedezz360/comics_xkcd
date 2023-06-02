import { Text, Container } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

function Header() {
  const [results, setResults] = useState([]);
  const searchRef = useRef();
	const q = searchRef.current?.value;
	const [show, setShow] = useState(true);
	const {locale, locales} = useRouter()

  const handleChange = () => {
    console.log(q);
    fetch(`/api/search?search=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResults(searchResults.results);
        console.log(searchResults);
      });
  };

	const handleOnBlur = ()=>{
		setShow(false);
	}

	const handleOnFocus = ()=>{
		setShow(true)
	}

	const restOfLocales = locales.filter(l => l !== locale)

	



  return (
    <header className="flex justify-between my-4 items-center">
      <Link href={"/"} className="hover:opacity-50">
        <span className="font-bold">next</span>
        <span className="font-light">xkcd</span>
      </Link>

      <nav>
        <ul className="flex flex-row gap-4 ">
          <li className="m-0 text-sm font-bold">
            <Link href="/">Home</Link>
          </li>

					<li className="m-0 text-sm font-bold">
            <Link href="/" locale={restOfLocales[0]}>{`${restOfLocales[0]}`}</Link>
          </li>

          <li className="m-0 text-sm font-bold">
            <input
              className="rounded-3xl border border-gray-400 text-xs"
              ref={searchRef}
              type="search"
              onChange={handleChange}
							onBlur={handleOnBlur} onFocus={handleOnFocus}
            />
            {console.log(results)}
            {console.log(results.length)}
            <div className="relative">
              {Boolean(results.length ) && (
                <div className="absolute top-0 left-0">
                  <ul  className="w-full border border-gray-50 rounded-lg shadow-xl bg-white p-2 ">
                    {console.log(results)}

                    <li className="border-b" key={"todos los resultados"}>
                      <Link
                        className="block px-2 py-1 font-semibold text-sm hover:bg-slate-200"
                        href={`/search/?search=${q}`}
                      >
                        Ver todos los resultados ({results.length})
                      </Link>
                    </li>

                    {results.map((result) => {
                      return (
                        <li className="border-b" key={result.id}>
                          <Link
                            className="block px-2 py-1 font-semibold text-sm hover:bg-slate-200"
                            href={`/comic/${result.id}`}
                          >
                            {result.title}
                          </Link>
                        </li>
                      );
                    })}



                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
