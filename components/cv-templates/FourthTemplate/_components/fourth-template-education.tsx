import { useEducationStore } from "@/store/education-store";
import { TEducation } from "@/types/cv";

export default function FourthTemplateEducation({
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
      <div className="flex flex-col items-start mr-1 my-1">
        <div className="font-bold leading-none mb-2 bg-emerald-100 w-full py-1 px-2 mt-2">
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
      <div className="w-full my-1">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-start text-l leading-none">
            {education.schoolName}
          </h1>
        </div>
        <h1 className="text-m text-wrap mt-1 leading-tight">
          {education.degree} {education.fieldOfStudy}
        </h1>
        <h1 className="text-m text-wrap mt-0.5 leading-tight">
          {education.startDate} - {education.endDate}
        </h1>
        {/* <div className="flex gap-[3px]">
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
        /> */}
      </div>
    </>
  );
}
