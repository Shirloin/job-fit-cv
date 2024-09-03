'use client'
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function CVCard({image}: {image: string}) {
    
    return (
        <>
            <Link href={"/"} className="w-44 h-60 mr-6 mb-4 md:mb-0 ">
                <img className="w-full h-full object-cover rounded-md" src={image} alt="" />
            </Link>
        </>
    )
}