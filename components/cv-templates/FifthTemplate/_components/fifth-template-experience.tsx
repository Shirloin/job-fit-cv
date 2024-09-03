import { useExperienceStore } from '@/store/experience-store';
import { TExperience } from '@/types/cv';

export default function FifthTemplateExperience({
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
      <div className="mt-2">
        <h2 className="text-center font-serif text-xs">Experiences</h2>
        <hr className="w-full border-primary mt-4 mb-1" />
        {experiences.map((experience, index) => (
          <ExperienceItem experience={experience} key={index} />
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
    <div className="mt-2">
      <div className="flex items-center justify-between">
        <h2 className="text-[8px] font-bold">{experience.companyName}</h2>
        <h2 className="text-[8px] font-normal text-slate-600">
          {experience.startDate} - {experience.endDate}
        </h2>
      </div>
      <h3 className="text-[8px] font-semibold">
        {experience.positionTitle} - {experience.type}
      </h3>
      <p className="text-[8px]">{experience.summary}</p>
    </div>
  );
}
