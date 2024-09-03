'use client'
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { TCompany } from "@/types/company";

export default function CompanyCard({ company }: { company: TCompany }) {
    return (
        <>
        <Link href={"/"}>
            {/* <Card className="relative w-80 h-60 mr-6 mb-4 hover:border hover:border-primary overflow-hidden"> */}
            <Card className="relative w-80 h-60 mr-6 mb-4 hover:transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute top-6 -right-20 rotate-[45deg] w-60 p-1 bg-red-500  text-white text-xs text-center font-bold">
                    Recommended
                </div>
                <CardHeader>
                    <img className="h-24 w-24 rounded-md object-contain self-center" src={company.image} alt="" />
                    <CardTitle>{company.name}</CardTitle>
                    <CardDescription className="text-ellipsis text-wrap line-clamp-3 truncate">
                        {company.industry}
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
        </>
    )
}