import { useEducationStore } from '@/store/education-store';
import { TEducation } from '@/types/cv';

export default function FifthTemplateEducation({
  savedEducations = null,
}: {
  savedEducations?: TEducation[] | null;
}) {
  const { educations: storeEducations } = useEducationStore();
  const educations = storeEducations ?? savedEducations;

  if (educations.length < 1) {
    return null;
  }

  return (
    <>
      <div className="mt-4">
        <h2 className="text-center font-serif text-xs">Educations</h2>
        <hr className="w-full border-primary mt-4 mb-1" />
        {educations.map((education, index) => (
          <div key={index} className="mt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-[8px] font-bold">{education.schoolName}</h2>
              <h4 className="text-[8px] font-normal text-slate-600">
                {education.startDate} - {education.endDate}
              </h4>
            </div>
            <div className="flex items-center">
              <h2 className="text-[8px]">
                {education.degree} - {education.fieldOfStudy}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
