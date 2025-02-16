import { useEducationStore } from "@/store/education-store";
import { TEducation } from "@/types/cv";

export default function SecondTemplateEducation() {
  const { educations } = useEducationStore();

  return (
    <div className="text-l w-[90%]">
      <p className="uppercase text-[12px] font-bold">Education</p>
      <div className="border-t border-1 border-black w-full m-auto mt-2 mb-1"></div>
      <div className="flex flex-col gap-1">
        {educations.map((education, index) => (
          <EducationItem key={index} education={education} />
        ))}
      </div>
    </div>
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
      <div className="">
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
