import { useState, useEffect, createContext } from "react"
import axios from "axios"
import { useRouter } from "next/router"

const QuioscoContext = createContext()

const QuioscoProvider = ({children})=> {

    const [ categorias, setCategorias ] = useState([])
    const [ categoriaActual, setCategoriaActual ] = useState({icono: "cafe", id: 1, nombre: "Café"})

    const router = useRouter()
    
    useEffect(()=>{
        obtenerCategorias()
    }, [])

    const obtenerCategorias = async ()=>{
        const { data } = await axios ('/api/categorias')
        setCategorias(data)
    }


    const handleClickCategoria = id =>{
        const categoria = categorias?.filter( categoriaState => categoriaState.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export{
    QuioscoProvider
}

export default QuioscoContext
