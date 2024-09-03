'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalForm from "./PersonalForm";
import ExperienceForm from "./ExperienceForm";
import ProjectForm from "./ProjectForm";
import EducationForm from "./EducationForm";
import SkillForm from "./SkillForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import TemplateForm from "./TemplateForm";
export default function TabForm() {
  return (
    <>
      <div className="font-medium max-w-lg w-full">
        <Tabs defaultValue="Personal">
          <TabsList className="min-w-full justify-between px-2 py-6 rounded-lg  ">
            <TabsTrigger value="Template">
              Template
            </TabsTrigger>
            <TabsTrigger value="Personal">
              Personal
            </TabsTrigger>
            <TabsTrigger value="Experience">
              Experience
            </TabsTrigger>
            <TabsTrigger value="Project">
              Project
            </TabsTrigger>
            <TabsTrigger value="Education">
              Education
            </TabsTrigger>
            <TabsTrigger value="Skill">
              Skills
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Template" >
            <TemplateForm />
          </TabsContent>
          <TabsContent value="Personal">
            <PersonalForm />
          </TabsContent>
          <TabsContent value="Experience">
            <ExperienceForm />
          </TabsContent>
          <TabsContent value="Project">
            <ProjectForm />
          </TabsContent>
          <TabsContent value="Education">
            <EducationForm />
          </TabsContent>
          <TabsContent value="Skill">
            <SkillForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
