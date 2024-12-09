"use client";
import FirstTemplate from "@/components/cv-templates/FirstTemplate/page";
import ThirdTemplate from "@/components/cv-templates/ThirdTemplate/page";
import { ContentLayout } from "@/components/panel/content-layout";
import PlaceholderContent from "@/components/placeholder-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import ChangePassword from "./_components/change-password";
import Score from "./_components/score";
import SavedCV from "./_components/saved-cv";
import { useCurrentSession } from "@/hooks/use-current-session";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function AccountPage() {

  const user = useCurrentUser()

  return (
    <>
      <ContentLayout title="Account">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Account</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="rounded-lg border mt-6">
          <CardContent className="p-6">
            <div className="flex justify-center items-start min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
              <div className="max-w-3xl w-full flex sm:flex-row flex-col justify-between items-start gap-10 ">
                {/* <div className="flex items-start">
                  <Avatar className="w-14 h-14 md:w-24 md:h-24 mr-4">
                    <AvatarImage
                      className="w-full h-full object-cover"
                      src={user?.image}
                    ></AvatarImage>
                  </Avatar>
                  <div className="">
                    <h1 className="text-sm md:text-2xl font-bold">
                      {user && user.name}
                    </h1>
                    <h1 className="text-m sm:text-xs font-semibold">
                      {user && user.nim}
                    </h1>
                    <h1 className="text-m sm:text-xs font-semibold">
                      {user && user.email}
                    </h1>
                    <h1 className="text-m sm:text-xs font-semibold">
                      {user && <>GPA: {user.gpa}</>}
                    </h1>
                  </div>
                </div> */}
                  <Accordion type="single" collapsible className="w-full">
                {user && user.role.toLowerCase().includes("student") && (
                    <AccordionItem value="saved-cv">
                      <AccordionTrigger>Saved CV</AccordionTrigger>
                      <AccordionContent>
                        <SavedCV />
                      </AccordionContent>
                    </AccordionItem>
                )}
                    <AccordionItem value="change-password">
                      <AccordionTrigger>Change Password</AccordionTrigger>
                      <AccordionContent>
                        <ChangePassword />
                      </AccordionContent>
                    </AccordionItem>
                    {/* <AccordionItem value="item-2">
                      <AccordionTrigger>Grade</AccordionTrigger>
                      <AccordionContent>
                        <Score />
                      </AccordionContent>
                    </AccordionItem> */}
                  </Accordion>
              </div>
            </div>
          </CardContent>
        </Card>
      </ContentLayout>
    </>
  );
}
