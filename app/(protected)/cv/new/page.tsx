'use client';
import FirstTemplate from '@/components/cv-templates/FirstTemplate/page';
import ThirdTemplate from '@/components/cv-templates/ThirdTemplate/page';
import TabForm from '@/components/cv-forms/TabForm';
import { ContentLayout } from '@/components/panel/content-layout';
import PlaceholderContent from '@/components/placeholder-content';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Link from 'next/link';
import { ChangeEvent, useRef, useState } from 'react';
import { usePDF } from 'react-to-pdf';
import { useTemplateStore } from '@/store/template-store';
import { useExperienceStore } from '@/store/experience-store';
import { useProjectStore } from '@/store/project-store';
import { useEducationStore } from '@/store/education-store';
import { useSkillStore } from '@/store/skill-store';
import { UserService } from '@/services/UserService';
import { useCurrentUser } from '@/hooks/use-current-user';
import { JsonArray, JsonObject } from '@prisma/client/runtime/library';
import { useProfileStore } from '@/store/profile-store';
import toast from 'react-hot-toast';
import { GeneratorService } from '@/services/GeneratorService';
import SecondTemplate from '@/components/cv-templates/SecondTemplate/page';
import FourthTemplate from '@/components/cv-templates/FourthTemplate/page';
import FifthTemplate from '@/components/cv-templates/FifthTemplate/page';
import { useLoading } from '@/providers/LoadingProvider';

export default function CreateCVPage() {
  const { index, setTemplate } = useTemplateStore();
  const user = useCurrentUser();
  const { profile } = useProfileStore();
  const { experiences } = useExperienceStore();
  const { projects } = useProjectStore();
  const { educations } = useEducationStore();
  const { skills } = useSkillStore();
  const { isLoading, setIsLoading } = useLoading()

  const target = useRef(null);
  const handleDownloadPDF = async () => {
    setIsLoading(true)
    const icons = document.querySelectorAll('.icon');
    icons.forEach((icon) => {
      icon.classList.add('translate-y-1');
    });

    if (target.current) {
      const canvas = await html2canvas(target.current, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      const imgWidth = 595.28;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('cv.pdf');
      setIsLoading(false)
    }
  };

  const handleDownloadImage = async () => {
    setIsLoading(true)
    if (target.current) {
      const canvas = await html2canvas(target.current, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'cv.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsLoading(false)
    }
  };

  const handleSave = async () => {
    setIsLoading(true)
    const cv = {
      profile: profile as unknown as JsonObject,
      experiences: experiences as unknown as JsonObject,
      projects: projects as unknown as JsonObject,
      educations: educations as unknown as JsonObject,
      skills: skills as unknown as JsonObject,
      index: index as number,
    } as JsonObject;
    try {
      const skill = skills.map((s) => s.name);
      const project = projects.map((p) => p.projectDescription);
      const experience = experiences.map((e) => e.summary);
      const updatedUser = await UserService.saveUserCV(user.id, cv);
      const userWithRecommendation =
        await GeneratorService.generateRecommendedJob(
          skill,
          project,
          experience,
          user.id
        );
      toast.success('CV has been saved');
    } catch (error) {
      return
    }
    setIsLoading(false)
  };

  const templates = [
    <FirstTemplate key={1} />,
    <SecondTemplate key={2} />,
    <ThirdTemplate key={3} />,
    <FourthTemplate key={4} />,
    <FifthTemplate key={5} />,
  ];

  return (
    <>
      <ContentLayout title="Create New CV">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create New CV</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card className="rounded-lg border-none mt-6">
          <CardContent className="p-6">
            <div className="flex  justify-center items-start min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
              <div className="w-full flex flex-col relative">
                <div className=" w-full flex sm:flex-row flex-col items-start sm:justify-between 3xl:justify-evenly gap-10 ">
                  <TabForm />
                  <div>
                    <div className="w-full flex justify-end items-center gap-4 mb-4">
                      <Button variant="outline" onClick={handleSave}>
                        Save
                      </Button>
                      <Button variant="outline" onClick={handleDownloadPDF}>
                        Download PDF
                      </Button>
                      <Button variant="outline" onClick={handleDownloadImage}>
                        Download Image
                      </Button>
                    </div>
                    <div className="w-fit h-fit border border-primary rounded-xl">
                      <div ref={target} className="w-full h-full p-4">
                        <div className="w-[460px] h-[660px] overflow-hidden">
                          {templates[index]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </ContentLayout>
    </>
  );
}
