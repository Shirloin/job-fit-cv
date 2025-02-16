import { Card } from '@/components/ui/card';
import ThirdTemplateProfile from './_components/third-template-profile';
import ThirdTemplateExperience from './_components/third-template-experience';
import ThirdTemplateProject from './_components/third-template-project';
import ThirdTemplateContact from './_components/third-template-contact';
import ThirdTemplateEducation from './_components/third-template-education';
import ThirdTemplateSkill from './_components/third-template-skill';
import { TCV } from '@/types/cv';

export default function ThirdTemplate() {
  return (
    <>
      <div className="w-full h-full flex justify-between font-sans text-start">
        <div className="w-[325px] flex flex-col">
          <ThirdTemplateProfile />
          <hr className="w-full border-primary mt-4 mb-1" />
          <ThirdTemplateExperience />
          <ThirdTemplateProject  />
        </div>
        <hr className="border-r border-primary h-full " />
        <div className="w-[135px] pl-2 flex flex-col items-start">
          <ThirdTemplateContact  />
          <ThirdTemplateEducation />
          <ThirdTemplateSkill />
        </div>
      </div>
    </>
  );
}
