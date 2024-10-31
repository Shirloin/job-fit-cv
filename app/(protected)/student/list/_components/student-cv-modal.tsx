"use client";
import FirstTemplate from "@/components/cv-templates/FirstTemplate/page";
import ThirdTemplate from "@/components/cv-templates/ThirdTemplate/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFetchStudentCV } from "@/hooks/use-fetch-data";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

interface StudentCVModalProps {
  id: string;
}

export default function StudentCVModal({ id }: StudentCVModalProps) {
  const { data: cv, isLoading, isError } = useFetchStudentCV(id);
  const templates = [
    <FirstTemplate key={1} cv={cv} />,
    <ThirdTemplate key={3} cv={cv} />,
  ];
  const target = useRef(null);
  const handleDownloadPDF = async () => {

    if (target.current) {
      const pdf = new jsPDF('portrait', 'px', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();

      await pdf.html(target.current, {
        callback: (doc) => {
          doc.save('cv.pdf');
        },
        width: pdfWidth,

        windowWidth: 500
      });
    }
  };


  const handleDownloadImage = async () => {
    if (target.current) {
      const canvas = await html2canvas(target.current, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = imgData;
      link.download = "cv.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">View CV</Button>
        </DialogTrigger>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 mt-4">
              <p>Download CV</p>
              <Button variant="outline" onClick={handleDownloadPDF}>
                Download PDF
              </Button>
              <Button variant="outline" onClick={handleDownloadImage}>
                Download Image
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="mx-auto w-fit h-fit border border-primary rounded-xl">
            <div ref={target} className="w-full h-full p-4">
              <div className="w-[460px] h-[660px] overflow-hidden">
                {cv && templates[cv?.index]}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
