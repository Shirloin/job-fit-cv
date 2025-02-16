import { useEducationStore } from '@/store/education-store';
import { TEducation } from '@/types/cv';

export default function ThirdTemplateEducation() {
  const { educations } = useEducationStore();
  if (educations.length < 1) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-start mr-1 my-1">
        <div className="font-bold leading-none mb-2">
          <h1>Education</h1>
        </div>
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
      <div className="flex flex-col my-1">
        <h1 className="font-bold text-start text-m leading-none">
          {education.schoolName}
        </h1>
        <h1 className="text-m font-medium">
          {education.startDate} - {education.endDate}
        </h1>
        <h1 className="text-m text-gray-800">
          {education.degree} {education.fieldOfStudy}
        </h1>
      </div>
    </>
  );
}
