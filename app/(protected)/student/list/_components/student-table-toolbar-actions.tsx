/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { DownloadIcon, PlusIcon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import { TCompany } from "@/types/company"
import { exportTableToCSV } from "@/lib/export"
import { TUser } from "@/types/user"
import { ReactElement, ReactNode, useCallback, useEffect, useState } from "react"
import JSZip from "jszip"
import jsPDF from "jspdf"
import FirstTemplate from "@/components/cv-templates/FirstTemplate/page";
import SecondTemplate from "@/components/cv-templates/SecondTemplate/page";
import ThirdTemplate from "@/components/cv-templates/ThirdTemplate/page";
import FourthTemplate from "@/components/cv-templates/FourthTemplate/page";
import FifthTemplate from "@/components/cv-templates/FifthTemplate/page";
import html2canvas from "html2canvas"
import { useFetchStudentCV } from "@/hooks/use-fetch-data"
import { createRoot } from "react-dom/client";
import { useLoading } from "@/providers/LoadingProvider"
import { CVDownloader } from "./cv-downloader"

interface StudentTableToolbarActionsProps {
    table: Table<TUser>
}

const templates = [
    FirstTemplate,
    SecondTemplate,
    ThirdTemplate,
    FourthTemplate,
    FifthTemplate
];

function renderToHiddenContainer(template: ReactElement) {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(
        <div className="w-full h-full p-4">
            <div className="w-[460px] h-[660px] overflow-hidden">
                {template}
            </div>
        </div>
    );

    return container;
}

export function StudentTableToolbarActions({
    table,
}: StudentTableToolbarActionsProps) {

    const selectedRows = table.getSelectedRowModel().rows;
    const students = selectedRows.map(row => row.original);


    return (
        <div className="flex items-center gap-2">
            {/* <Button variant="outline" size="sm">
                <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                New Student
            </Button> */}
            <CVDownloader students={students} />
            {/* <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadAllCV}
            >
                <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
                Download All CV
            </Button> */}
            {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
        </div>
    )
}
export function useStudentCVs(studentIds: string[]) {
    const [cvs, setCvs] = useState<Map<string, any>>(new Map());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (studentIds.length === 0) {
            setLoading(false);
            return;
        }

        const fetchCvs = async () => {
            setLoading(true);
            const newCvs = new Map();
            for (const id of studentIds) {
                const { data: cv } = await useFetchStudentCV(id);
                if (cv) {
                    newCvs.set(id, cv);
                }
            }
            setCvs(newCvs);
            setLoading(false);
        };

        fetchCvs();
    }, [studentIds]);

    return { cvs, loading };
}