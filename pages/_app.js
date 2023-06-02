import { I18nProvider } from "context/i18n.js";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps }) {
  return (
		
		<NextUIProvider>
			<I18nProvider>
				<Component {...pageProps} />
			</I18nProvider>
		</NextUIProvider>
  );
}

export default MyApp;
