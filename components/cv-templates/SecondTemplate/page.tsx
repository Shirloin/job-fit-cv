"use client";

import { TCV } from "@/types/cv";
import SecondTemplateEducation from "./_components/second-template-education";
import SecondTemplateExperience from "./_components/second-template-experience";
import SecondTemplateProfile from "./_components/second-template-profile";
import SecondTemplateProject from "./_components/second-template-project";
import SecondTemplateContact from "./_components/second-template-contact";
import SecondTemplateSummary from "./_components/second-template-summary";

export default function SecondTemplate({ cv = null }: { cv?: TCV | null }) {
  return (
    <>
      <div className="w-full h-full flex flex-col font-sans">
        <SecondTemplateProfile profile={cv?.profile} />
        <SecondTemplateContact profile={cv?.profile} />
        <div className="border-t border-gray-200 w-[90%] mb-1 mt-3 m-auto"></div>
        <div className="flex gap-1 min-h-full justify-center">
          <div className="flex flex-col items-center">
            <SecondTemplateSummary profile={cv?.profile} />
            <div className="border-t border-gray-200 w-[90%] mb-2 mt-3 m-auto"></div>
            <SecondTemplateExperience savedExperiences={cv?.experiences} />
            <div className="border-t border-gray-200 w-[90%] mb-2 mt-3 m-auto"></div>
            <SecondTemplateEducation savedEducations={cv?.educations} />
            <div className="border-t border-gray-200 w-[90%] mb-2 mt-3 m-auto"></div>
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
