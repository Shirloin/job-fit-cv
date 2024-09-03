import { useSkillStore } from "@/store/skill-store";
import { TSkill } from "@/types/cv";

export default function SecondTemplateSkill({
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
      <div className="flex flex-col items-start my-1">
        <p className="uppercase text-[12px] tracking-[0.15rem] font-semibold mb-2">
          SKILLS
        </p>
        {skills.map((skill, index) => (
          <h1
            key={index}
            className="font-normal text-start text-l leading-normal"
          >
            {skill.name}
          </h1>
        ))}
      </div>
    </>
  );
}
