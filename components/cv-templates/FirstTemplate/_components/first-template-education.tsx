import { useEducationStore } from '@/store/education-store';
import { TEducation } from '@/types/cv';

export default function FirstTemplateEducation() {
  const { educations } = useEducationStore();

  return (
    <>
      <div className="flex flex-col items-start my-1">
        <h1 className="uppercase font-bold leading-none tracking-widest mb-2 text-black">
          Education
        </h1>
        {educations.map((education, index) => (
          <EducationItem key={index} education={education} />
        ))}
      </div>
    </>
  );
}

interface EducationItemProps {
  id: number;
  schoolName: string;
  startDate: string;
  endDate: string;
  degree: string;
  fieldOfStudy: string;
}

function EducationItem({ education }: { education: EducationItemProps }) {
  return (
    <>
      <div className="my-1">
        <h1 className="font-semibold text-start text-l leading-normal">
          {education.schoolName}
        </h1>
        <h1 className="text-m text-gray-800 leading-normal">
          {education.degree} {education.fieldOfStudy}
        </h1>
        <h1 className="text-m leading-normal">
          {education.startDate} - {education.endDate}
        </h1>
      </div>
    </>
  );
}
