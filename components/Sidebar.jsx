import Image from "next/image"
import useQuiosco from "@/hooks/useQuiosco"
import Categoria from "./Categoria"

export default function Sidebar() {

    const { categorias } = useQuiosco()
    return (
        <>
            <Image
                width={150}
                height={50}
                src="/assets/img/logo.svg"
                alt="imagen logotipo"
                className="p-3"
                priority={true}
            />

            <nav className="mt-10">
                {categorias?.map( categoria => (
                    <Categoria
                        key={categoria.id}
                        categoria={categoria}
                    />
                ))}
            </nav>
        </>
    )
}
