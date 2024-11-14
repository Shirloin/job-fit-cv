import { useExperienceStore } from '@/store/experience-store';
import { TExperience } from '@/types/cv';

export default function FirstTemplateExperience({
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
        <h1 className="uppercase font-bold leading-none tracking-widest mb-2 text-black">
          Experience
        </h1>
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
            <span className="ml-1 font-normal text-m">
              {experience.type !== '' ? experience.type : ''}
            </span>
          </h1>
          <div className="text-m">
            {experience.companyName !== '' ||
            experience.startDate !== '' ||
            experience.endDate !== '' ? (
              <h1>
                {experience.companyName} | {experience.startDate} -{' '}
                {experience.endDate}
              </h1>
            ) : null}
          </div>
        </div>
        <h1
          className="text-m text-wrap my-1 leading-tight"
          dangerouslySetInnerHTML={{
            __html: experience.summary.replace(/\n/g, '<br />'),
          }}
        />
      </div>
    </>
  );
}
