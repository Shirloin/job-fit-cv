"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import FirstTemplate from "@/components/cv-templates/FirstTemplate/page";
import SecondTemplate from "@/components/cv-templates/SecondTemplate/page";
import ThirdTemplate from "@/components/cv-templates/ThirdTemplate/page";
import FourthTemplate from "@/components/cv-templates/FourthTemplate/page";
import FifthTemplate from "@/components/cv-templates/FifthTemplate/page";
import { useFetchStudentCV } from "@/hooks/use-fetch-data";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { TUser } from "@/types/user";
import { TCV } from "@/types/cv";

interface StudentCVSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  student: TUser;
}

export default function StudentCVSheet({
  student,
  ...props
}: StudentCVSheetProps) {
  const { data: cv, isLoading, isError } = useFetchStudentCV(student.nim!);

  const templates = [
    <FirstTemplate key={1} cv={cv} />,
    <SecondTemplate key={2} cv={cv} />,
    <ThirdTemplate key={3} cv={cv} />,
    <FourthTemplate key={4} cv={cv} />,
    <FifthTemplate key={5} cv={cv} />,
  ];
  const target = useRef(null);
  const handleDownloadPDF = async () => {
    if (target.current) {
      const canvas = await html2canvas(target.current, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const imgWidth = 595.28;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${student.nim}.pdf`);
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
      <Sheet {...props}>
        <SheetContent className="min-w-[400px] w-fit  h-full  overflow-auto">
          <SheetHeader>
            {cv ? (
              <SheetTitle>{student.name} CV&apos;s</SheetTitle>
            ) : (
              <SheetTitle>{student.name}</SheetTitle>
            )}
            <SheetDescription></SheetDescription>
          </SheetHeader>
          {cv && (
            <>
              <div className=" w-fit h-fit border border-primary rounded-xl">
                <div ref={target} className="w-full h-full p-4">
                  <div className="w-[460px] h-[660px] overflow-hidden">
                    {cv && templates[cv?.index]}
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center space-x-2 mt-4">
                <Button variant="outline" onClick={handleDownloadPDF}>
                  Download PDF
                </Button>
                <Button variant="outline" onClick={handleDownloadImage}>
                  Download Image
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
