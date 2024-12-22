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
    <div className="text-l w-[90%]">
      <p className="uppercase text-[12px] font-bold">Experience</p>
      <div className="border-t border-1 border-black w-full m-auto mt-2 mb-1"></div>
      <div className="flex flex-col gap-1">
        {experiences.map((experience, index) => (
          <ExperienceItem key={index} experience={experience} />
        ))}
      </div>
    </div>
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
      <div className="w-full mt-1">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-start text-l leading-none">
            {experience.positionTitle}
            {experience.type !== "" ? " | " + experience.type : ""}
            {experience.companyName !== ""
              ? " | " + experience.companyName
              : ""}
            {experience.startDate !== "" || experience.endDate !== ""
              ? " | " + experience.startDate + " - " + experience.endDate
              : null}
          </h1>
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
