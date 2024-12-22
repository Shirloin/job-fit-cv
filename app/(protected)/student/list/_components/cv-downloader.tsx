/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useCallback } from 'react';
import JSZip from 'jszip';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { createRoot } from 'react-dom/client';
import FirstTemplate from "@/components/cv-templates/FirstTemplate/page";
import SecondTemplate from "@/components/cv-templates/SecondTemplate/page";
import ThirdTemplate from "@/components/cv-templates/ThirdTemplate/page";
import FourthTemplate from "@/components/cv-templates/FourthTemplate/page";
import FifthTemplate from "@/components/cv-templates/FifthTemplate/page";
import { useFetchStudentCV } from "@/hooks/use-fetch-data";
import { TUser } from '@/types/user';
import { DownloadIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { UserService } from '@/services/UserService';
import { TCV } from '@/types/cv';
import { useLoading } from '@/providers/LoadingProvider';

const templates = [
    FirstTemplate,
    SecondTemplate,
    ThirdTemplate,
    FourthTemplate,
    FifthTemplate
];

function renderToHiddenContainer(template: React.ReactElement) {
    const container = document.createElement("div");
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

export function CVDownloader({ students }: { students: TUser[] }) {
    const { setIsLoading } = useLoading();

    const handleDownloadAllCV = useCallback(async () => {
        setIsLoading(true);

        try {
            const mainZip = new JSZip();

            for (const student of students) {
                const response = await UserService.getCV(student.username);
                const cv = response.data.cv as TCV;
                console.log(cv)

                if (cv) {
                    const TemplateComponent = templates[cv.index];
                    const target = renderToHiddenContainer(<TemplateComponent cv={cv} />);

                    await new Promise(resolve => setTimeout(resolve, 500));

                    const pdf = new jsPDF('portrait', 'pt', 'a4');
                    const pdfWidth = pdf.internal.pageSize.getWidth();

                    await new Promise<void>((resolve, reject) => {
                        pdf.html(target, {
                            callback: () => {
                                const pdfBlob = pdf.output("blob");
                                const folderName = "CVs";
                                const fileName = `${student.username}.pdf`;
                                mainZip.file(`${folderName}/${fileName}`, pdfBlob);
                                document.body.removeChild(target);
                                resolve();
                            },
                            width: pdfWidth,
                            windowWidth: 500
                        }).catch(reject);
                    });
                }
            }

            const content = await mainZip.generateAsync({ type: "blob" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(content);
            link.download = "student_cv.zip";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Error generating CVs:", error);
        } finally {
            setIsLoading(false);
        }
    }, [students]);

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadAllCV}
            >
                <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
                Download All CV
            </Button>
        </div>
    );
}
