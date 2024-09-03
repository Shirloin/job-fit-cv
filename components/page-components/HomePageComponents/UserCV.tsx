'use client'
import CVCard from "@/components/cards/CvCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserCV() {

    return (
        <>
            <div className="">
                <h1 className="text-3xl font-medium ">Your CV</h1>
                <div className="mx-auto flex flex-wrap mt-6">
                    <CVCard image={"/assets/traveloka.png"} />
                    <Link href={"/create-cv"} className="my-auto p-8 bg-muted  rounded-xl">
                        <p className="w-fit self-center text-center font-medium">Add New CV</p>
                    </Link>
                </div>
            </div>
        </>
    )
}