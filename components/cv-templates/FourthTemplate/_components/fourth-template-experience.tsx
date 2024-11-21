import { useExperienceStore } from "@/store/experience-store";
import { TExperience } from "@/types/cv";

export default function FourthTemplateExperience({
  savedExperiences = null,
}: {
  savedExperiences?: TExperience[] | null;
}) {
  const { experiences: storeExperiences } = useExperienceStore();
  const experiences = savedExperiences ?? storeExperiences;

  if (experiences.length < 1) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-start">
        <div className="font-bold leading-none mb-2 w-full mt-2 uppercase">
          <h1>Experience</h1>
        </div>
        <hr className="w-full border-primary mt-2 -mb-1" />
        {experiences.map((experience, index) => {
          return <ExperienceItem key={index} experience={experience} />;
        })}
      </div>
    </>
  );
}

export interface ExperienceItemProps {
  positionTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  summary: string;
  type: string;
}
export function ExperienceItem({
  experience,
}: {
  experience: ExperienceItemProps;
}) {
  return (
    <>
      <div className="w-full my-1">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-start text-l leading-none">
            {experience.companyName}
          </h1>
        </div>
        <div className="flex gap-[3px]">
          <h1 className="text-m text-wrap mt-1 leading-tight">
            {experience.type !== "" ? experience.type : ""}
          </h1>
          {experience.positionTitle !== "" ||
          experience.startDate !== "" ||
          experience.endDate !== "" ? (
            <h1 className="text-m text-wrap mt-1 leading-tight">
              {experience.positionTitle} ({experience.startDate} -{" "}
              {experience.endDate})
            </h1>
          ) : null}
        </div>

        <h1
          className="text-m text-wrap mt-1 leading-tight"
          dangerouslySetInnerHTML={{
            __html: experience.summary.replace(/\n/g, "<br />"),
          }}
        />
      </div>
    </>
  );
}
