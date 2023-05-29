import { Text, Container } from "@nextui-org/react";
import React from "react";
import Link from "next/link";

function Header() {
  return (
    <Container 
			as="header" 
			responsive 
			display="flex" 
			justify="space-between"
			alignItems="center"
			className="max-w-xl my-4"
		>

      <Link href={"/"} className="hover:opacity-50">
				<span className="font-bold">next</span>
				<span className="font-light">xkcd</span>
			</Link>
      
			<nav>
        <Container 
					as="ul"
					display="flex" 
					direction="row" 
					responsive 
					className="gap-4 "
				>

        	<li className="m-0 text-sm font-bold">
						<Link href="/">Home</Link>
					</li>

					<li className="m-0 text-sm font-bold">
          	<Link href="/search">Search</Link>
					</li>

        </Container>
      </nav>

    </Container>
  );
}

export default Header;
