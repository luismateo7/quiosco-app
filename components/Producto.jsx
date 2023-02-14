import Image from "next/image"
import { formatearDinero } from "@/helpers"
import useQuiosco from "@/hooks/useQuiosco"

export default function Producto({producto}) {

  const { imagen, nombre, precio } = producto
  const { handleSetProducto, handleChangeModal } = useQuiosco()

  return (
    <div className="border p3">
      <Image
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen del Plato ${nombre}`}
        width={400}
        height={500}
      />

      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full p-3 mt-5 uppercase font-bold rounded-lg"
          onClick={()=>{
            handleChangeModal()
            handleSetProducto(producto)
          }}
          >Agregar</button>
      </div>
    </div>
  )
}
