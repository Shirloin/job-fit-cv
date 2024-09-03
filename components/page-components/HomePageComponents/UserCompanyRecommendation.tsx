"use client";
import CompanyCard from "@/components/cards/CompanyCard";
import { TCompany } from "@/types/company";
import { useState } from "react";

export default function UserCompanyRecommendation() {
  const [companies, setCompanies] = useState<TCompany[]>([]);
  return (
    <>
      <div className="">
        <h1 className="text-3xl font-medium">Company Recomendation</h1>
        <div className="mx-auto flex flex-wrap mt-6 ">
          {companies.map((company, index) => (
            <CompanyCard key={index} company={company} />
          ))}
        </div>
      </div>
    </>
  );
}
