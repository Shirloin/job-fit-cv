'use client';

import { TCV } from '@/types/cv';
import FirstTemplateEducation from './_components/first-template-education';
import FirstTemplateExperience from './_components/first-template-experience';
import FirstTemplateProfile from './_components/first-template-profile';
import FirstTemplateProject from './_components/first-template-project';
import FirstTemplateSkill from './_components/first-template-skill';

export default function FirstTemplate({ cv = null }: { cv?: TCV | null }) {
  const skills = cv?.skills;
  console.log(skills);
  return (
    <>
      <div className="w-full h-full flex flex-col font-sans">
        <FirstTemplateProfile profile={cv?.profile} />
        <hr className="w-full border-primary my-2" />
        <div className="flex justify-between gap-4">
          <div className="w-[305px] flex flex-col">
            <FirstTemplateExperience savedExperiences={cv?.experiences} />
            <FirstTemplateProject savedProjects={cv?.projects} />
          </div>
          <div className="w-[155px] pl-2 flex flex-col items-start">
            <FirstTemplateSkill savedSkills={skills} />
            <FirstTemplateEducation savedEducations={cv?.educations} />
          </div>
        </div>
      </div>
    </>
  );
}
