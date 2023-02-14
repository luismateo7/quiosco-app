import Image from "next/image"
import useQuiosco from "@/hooks/useQuiosco"

export default function Categoria({categoria}) {

    const { nombre, icono, id } = categoria
    const { categoriaActual, handleClickCategoria } = useQuiosco()
   
    return (
        <div
            className={`${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border p-5 hover:bg-amber-400 hover:cursor-pointer h-20`}
            onClick={() => {handleClickCategoria(id)}}
        >
            <Image
                alt="Imagen Icono"
                width={70}
                height={70}
                style={{ width: '70px', height: '70px'}}
                src={`/assets/img/icono_${icono}.svg`}
            />

            <p className="text-2xl font-bold">{nombre}</p>    
        </div>
    )
}
