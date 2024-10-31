"use client";

import { TCV } from "@/types/cv";
import SecondTemplateEducation from "./_components/second-template-education";
import SecondTemplateExperience from "./_components/second-template-experience";
import SecondTemplateProfile from "./_components/second-template-profile";
import SecondTemplateProject from "./_components/second-template-project";
import SecondTemplateSkill from "./_components/second-template-skill";
import SecondTemplateContact from "./_components/second-template-contact";
import SecondTemplateBio from "./_components/second-template-bio";

export default function SecondTemplate({ cv = null }: { cv?: TCV | null }) {
  return (
    <>
      <div className="w-full h-full flex flex-col font-sans">
        <SecondTemplateProfile profile={cv?.profile} />
        <div className="flex gap-1 min-h-full">
          <div className="left w-[40%]">
            <SecondTemplateContact profile={cv?.profile} />
            <hr className="w-2/5 border-primary my-5" />
            <SecondTemplateEducation savedEducations={cv?.educations} />
            <hr className="w-2/5 border-primary my-5" />
            <SecondTemplateSkill savedSkills={cv?.skills} />
          </div>
          <div className="border-r border-black h-[90%] mt-2"></div>
          <div className="right w-full pl-6">
            <SecondTemplateBio profile={cv?.profile} />
            <hr className="w-full border-primary my-5" />
            <SecondTemplateExperience savedExperiences={cv?.experiences} />
            <hr className="w-full border-primary my-5" />
            <SecondTemplateProject savedProjects={cv?.projects} />
          </div>
        </div>

        {/* <hr className="w-full border-primary my-2" /> */}
        {/* <div className="flex justify-between gap-4">
          <div className="w-[305px] flex flex-col">
            <SecondTemplateExperience savedExperiences={cv?.experiences} />
            
          </div>
          <div className="w-[155px] pl-2 flex flex-col items-start bg-red-500">
            <SecondTemplateSkill savedSkills={cv?.skills} />
            
          </div>
        </div> */}
      </div>
    </>
  );
}
