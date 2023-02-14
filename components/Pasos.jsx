import { useRouter } from "next/router"

const pasos = [
    {paso: 1, nombre: 'Menu', url: '/'},
    {paso: 2, nombre: 'Resumen', url: '/resumen'},
    {paso: 3, nombre: 'Datos y Total', url: '/total'}
]

export default function Pasos() {

    const router = useRouter()

    const calcularProgreso = ()=>{
        if( router.pathname === '/') return 10
        else if( router.pathname === '/resumen' ) return 50
        else if( router.pathname === '/total' ) return 100
    }

    return (
        <>
            <div className="flex justify-between mb-5 mt-5">
                {pasos.map( paso => (
                    <button
                        key={paso.paso} className='text-2xl font-bold mx-4'
                        onClick={()=> {
                            router.push(paso.url)
                        }}
                    >
                        {paso.nombre}
                    </button>
                ))}
            </div>

            <div className="bg-gray-100 mb-10 m-auto w-11/12">
                <div
                    className="rounded-full bg-amber-500 text-xs leading-none h-2"
                    style={{ width: `${calcularProgreso()}%`}}
                >
                </div>
            </div>
        </>
    )
}
