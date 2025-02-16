import FifthTemplateProfile from './_components/fifth-template-profile';
import FifthTemplateSummary from './_components/fifth-template-summary';
import FifthTemplateSkill from './_components/fifth-template-skill';
import FifthTemplateExperience from './_components/fifth-template-experience';
import FifthTemplateEducation from './_components/fifth-template-education';
import FifthTemplateProject from './_components/fifth-template-project';

export default function FifthTemplate() {
  return (
    <>
      <div className="w-full h-full flex font-sans">
        <div className="w-full flex flex-col">
          <FifthTemplateProfile />
          <FifthTemplateSummary />
          <FifthTemplateSkill />
          <FifthTemplateExperience />
          <FifthTemplateEducation />
          <FifthTemplateProject  />
        </div>
      </div>
    </>
  );
}
