import Link from "next/link"

export default function Sidebar() {
    return(
            <div className="h-screen w-64 bg-white text-white">
                <div className="p-3">
                <Link href="/Sign" >
                <img src="/arrow.svg" alt=""  />
                </Link>
                </div>
              <div className="p-4 text-2xl text-bg_blue font-bold">AI LANGUAGE</div>
              <nav>
                <ul className="text-black font-medium">
                  <li className="p-4  hover:bg-bg_blue hover:text-white">
                    <Link href="/">New</Link>
                  </li>
                  <li className="p-4  hover:bg-bg_blue hover:text-white">
                    <Link href="/about">About</Link>
                  </li>
                  <li className="p-4  hover:bg-bg_blue hover:text-white">
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
       
        // <div className="h-full w-full p-4 flex flex-col lg:flex row gap-4">
        // <main className="h[calc(100%-80px)] lg:h-full w-full flex gap-4">
        //     {children}
        // </main>

        // </div>
    )
}