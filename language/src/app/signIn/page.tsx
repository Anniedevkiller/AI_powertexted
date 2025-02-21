import Link from "next/link"
import { Button } from "@/components/ui/button"


export default function Sign(){
    return(
        <div className="flex flex-col items-center justify-center h-screen">
  <div className="flex">
    <img src="/Logo.svg" alt="logo" />
  </div>
  <div className="pt-10">
    <Link href="/chatbox">
      <Button className="text-black bg-white border-2 border-bg_blue flex items-center">
        Sign In With Google
        <img src="/google.svg" width="20px" height="20px" alt="" className="ml-2" /> {/* Added margin-left */}
      </Button>
    </Link>
  </div>
</div>
    )
}