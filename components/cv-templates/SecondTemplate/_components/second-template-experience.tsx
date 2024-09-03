import { useExperienceStore } from "@/store/experience-store";
import { TExperience } from "@/types/cv";

export default function SecondTemplateExperience({
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
      <div className="flex flex-col items-start mr-1 ">
        <p className="uppercase text-[12px] tracking-[0.15rem] font-semibold mb-3">
          Experience
        </p>
        {experiences.map((experience, index) => (
          <ExperienceItem key={index} experience={experience} />
        ))}
      </div>
    </>
  );
}

interface ExperienceItemProps {
  positionTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  summary: string;
  type: string;
}

function ExperienceItem({ experience }: { experience: ExperienceItemProps }) {
  return (
    <>
      <div className="w-full my-1">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-start text-l leading-none">
            {experience.positionTitle}
          </h1>
        </div>
        <div className="flex gap-5">
          <h1 className="text-m text-wrap mt-1 leading-tight">
            {experience.type !== "" ? experience.type : ""}
          </h1>
          {experience.companyName !== "" ||
          experience.startDate !== "" ||
          experience.endDate !== "" ? (
            <h1 className="text-m text-wrap mt-1 leading-tight">
              {experience.companyName} | {experience.startDate} -{" "}
              {experience.endDate}
            </h1>
          ) : null}
        </div>

        <h1
          className="text-m text-wrap my-1 leading-tight"
          dangerouslySetInnerHTML={{
            __html: experience.summary.replace(/\n/g, "<br />"),
          }}
        />
      </div>
    </>
  );
}
