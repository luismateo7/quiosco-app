import Head from "next/head"

import Sidebar from "@/components/Sidebar"


export default function Layout({children, pagina}) {
 
    return (
        <>
            <Head>
                <title>Café - {pagina}</title>
                <meta name="description" content="Quiosco Cafetería" />
            </Head>
            <div className="md:flex">
                <aside className="md:w-1/3 xl:w-1/4 2xl:1/5 h-full">
                    <Sidebar />
                </aside>

                <main className="md:w-2/3 xl:w-3/4 2xl:4/5 h-screen overflow-y-scroll">
                    <div className="p-10">{children}</div>
                </main>
            </div>

        </>
    )
}
