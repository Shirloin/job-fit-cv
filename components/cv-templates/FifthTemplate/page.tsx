import { TCV } from '@/types/cv';
import FifthTemplateProfile from './_components/fifth-template-profile';
import FifthTemplateSummary from './_components/fifth-template-summary';
import FifthTemplateSkill from './_components/fifth-template-skill';
import FifthTemplateExperience from './_components/fifth-template-experience';
import FifthTemplateEducation from './_components/fifth-template-education';
import FifthTemplateProject from './_components/fifth-template-project';

export default function FifthTemplate({ cv = null }: { cv?: TCV | null }) {
  return (
    <>
      <div className="w-full h-full flex font-sans">
        <div className="w-full flex flex-col">
          <FifthTemplateProfile profile={cv?.profile} />
          <FifthTemplateSummary profile={cv?.profile} />
          <FifthTemplateSkill savedSkills={cv?.skills} />
          <FifthTemplateExperience savedExperiences={cv?.experiences} />
          <FifthTemplateEducation savedEducations={cv?.educations} />
          <FifthTemplateProject savedProjects={cv?.projects} />
        </div>
      </div>
    </>
  );
}
