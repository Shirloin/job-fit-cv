import { useSkillStore } from "@/store/skill-store";
import { TSkill } from "@/types/cv";

export default function FourthTemplateSkill({
  savedSkills = null,
}: {
  savedSkills?: TSkill[] | null;
}) {
  const { skills: storeSkills } = useSkillStore();
  const skills = storeSkills ?? savedSkills;

  if (skills.length < 1) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-1 mr-1 my-1">
        <div className="font-bold leading-none mb-2 bg-emerald-100 w-full py-1 px-2 mt-2 col-span-2">
          <h1>Skills</h1>
        </div>
        {skills.map((skill, index) => (
          <h1
            key={index}
            className="font-normal text-start text-l leading-none my-1 ml-2"
          >
            {skill.name}
          </h1>
        ))}
      </div>
    </>
  );
}
