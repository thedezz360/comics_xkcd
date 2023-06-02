import { useRouter } from "next/router";
import { createContext, useCallback, useContext } from "react";
import es from "../translations/es.json"
import en from "../translations/en.json"


const I18nContext = createContext()

const languages = { es , en }

//creamos el provider
function I18nProvider({children}){
	//recuperamos el idioma en el que estamos
	const {locale} = useRouter()

	//metodo que vamos a exportar
	const t = useCallback((key,  ...args) => {

		//obtenemos la traduccion
		let translation =  languages[locale][key]
	
		//comprobamos si tenemos argumentos
		if(args.length === 0 ) return translation
		
		//reemplazamos con los argumentos
		args.forEach((value,index)=>{
			
			index += 1
			translation = translation.replace(`\${${index}}`, value)

		})

		//devolvemos la traduccion
		return translation

	},[locale])

	return (
		//t -> translate
		<I18nContext.Provider value={{t}}>
			{children}
		</I18nContext.Provider>
	)
}

function useI18n(){
	const context = useContext(I18nContext)
	if(context === undefined){
		throw new Error("useI18n must be used within a I18nProvider")
	}
	return context
}

export {I18nProvider, useI18n}