import { useState, useEffect, createContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const QuioscoContext = createContext()

const QuioscoProvider = ({children})=> {

    const [ categorias, setCategorias ] = useState([])
    const [ categoriaActual, setCategoriaActual ] = useState({icono: "cafe", id: 1, nombre: "Café"})
    const [ producto, setProducto ] = useState({})
    const [ modal, setModal ] = useState(false)
    const [ pedido, setPedido ] = useState([])
    const [ nombre, setNombre ] = useState('')
    const [ total, setTotal ] = useState(0)

    const router = useRouter()
    
    useEffect(()=>{
        obtenerCategorias()
    }, [])

    useEffect(()=>{
        const nuevoTotal = pedido.reduce((total, producto)=> (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const obtenerCategorias = async ()=>{
        const { data } = await axios ('/api/categorias')
        setCategorias(data)
    }


    const handleClickCategoria = id =>{
        const categoria = categorias?.filter( categoriaState => categoriaState.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto =>{
        setProducto(producto)
    }

    const handleChangeModal = ()=>{
        setModal(!modal)
    }

    const handleEditarCantidades = producto =>{
        setProducto(producto)
        setModal(!modal)
    }

    const handleEliminarProducto = id =>{
        const carritoActualizado = pedido.filter( pedidoState =>{
            if(pedidoState.id !== id) return pedidoState
        })
        setPedido(carritoActualizado)
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) =>{

        //Buscar si ya fue agregado el carrito
        if(pedido.some( productoState => productoState.id === producto.id)){
            //Actualizar Pedido
            const pedidoActualizado = pedido.map( productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)

            toast.success('Guardado Correctamente')
        }
        else{ //Agregar nuevo producto
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }

        setModal(false)
    }

    const colocarOrden = async e =>{
        e.preventDefault()
        try{
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})

            //Resetear App
            setPedido([])
            setNombre('')
            
            toast.success('Pedido Realizado Exitosamente')
            setTimeout(()=>{
                router.push('/')
            }, 1500)

        } catch(error) {
            console.log(error)
        }
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                pedido,
                handleAgregarPedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
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
