import { Card } from "@/components/ui/card";
import FourthTemplateProfile from "./_components/fourth-template-profile";
import FourthTemplateExperience from "./_components/fourth-template-experience";
import FourthTemplateProject from "./_components/fourth-template-project";
import FourthTemplateContact from "./_components/fourth-template-contact";
import FourthTemplateEducation from "./_components/fourth-template-education";
import FourthTemplateSkill from "./_components/fourth-template-skill";
import { TCV } from "@/types/cv";

export default function FourthTemplate({ cv = null }: { cv?: TCV | null }) {
  return (
    <>
      <div className="w-full h-full flex justify-between font-sans text-start p-4">
        <div className="w-full flex flex-col">
          <FourthTemplateProfile profile={cv?.profile} />
          <FourthTemplateExperience savedExperiences={cv?.experiences} />
          <FourthTemplateEducation savedEducations={cv?.educations} />
          <FourthTemplateProject savedProjects={cv?.projects} />
          <FourthTemplateSkill savedSkills={cv?.skills} />
          {/* 
          <FourthTemplateProject savedProjects={cv?.projects} /> */}
        </div>
        {/* <hr className="border-r border-primary h-full " />
        <div className="w-[135px] pl-2 flex flex-col items-start">
          <FourthTemplateContact profile={cv?.profile} />
          
          <FourthTemplateSkill />
        </div> */}
      </div>
    </>
  );
}
