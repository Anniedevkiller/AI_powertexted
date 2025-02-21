import Link from "next/link"
import Sidebar from "./sidebar/page"
import Chat from "./chat/page"

export default function Chatbox() {
    return(
       <main>
        <div>
        <Sidebar />
        </div>
       <div>
       <Chat />
       </div>
       </main>
    )
}