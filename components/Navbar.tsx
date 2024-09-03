/* eslint-disable @next/next/no-img-element */

'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { logOut } from "@/actions/AuthAction";

export default function Navbar() {


    const router = useRouter()


    const handleLogout = async () => {
        await logOut()
        router.replace('/auth/login')
    }

    return (
        <>
            <div className="relative z-10 w-full flex justify-between items-center px-16 py-4" >
                <Link href={'/'}>
                    <img className="w-24" src="/assets/logo.png" alt="" />
                </Link>
                <div className="hidden sm:flex gap-8 text-xl font-medium">
                    <Link href={'/'}>
                        Home
                    </Link>
                </div>
                <Button className="hidden sm:flex" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </>
    );
}
