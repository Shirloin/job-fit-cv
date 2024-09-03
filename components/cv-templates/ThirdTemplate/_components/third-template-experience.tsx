import { useExperienceStore } from "@/store/experience-store";
import { TExperience } from "@/types/cv";

export default function ThridTemplateExperience({
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
      <div className="flex flex-col items-start mr-1">
        <div className="font-bold leading-none mb-2">
          <h1>Experience</h1>
        </div>
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
      <div className="flex flex-col my-1">
        <div className="text-m">
          {experience.companyName !== "" ||
          experience.startDate !== "" ||
          experience.endDate !== "" ? (
            <h1>
              {experience.companyName} | {experience.startDate} -{" "}
              {experience.endDate}
            </h1>
          ) : null}
        </div>
        <h1 className="font-semibold text-start text-l leading-none">
          {experience.positionTitle}
          <span className="ml-1 font-normal text-m">
            {experience.type !== "" ? experience.type : ""}
          </span>
        </h1>
        <h1
          className="text-m text-wrap my-1"
          dangerouslySetInnerHTML={{
            __html: experience.summary.replace(/\n/g, "<br />"),
          }}
        />
        {/* <h1 className="text-m text-wrap my-1">
          {experience.summary}
        </h1> */}
      </div>
    </>
  );
}
