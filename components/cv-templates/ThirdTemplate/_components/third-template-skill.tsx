import { useSkillStore } from '@/store/skill-store';
import { TSkill } from '@/types/cv';

export default function ThirdTemplateSkill({
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
      <div className="flex flex-col items-start mr-1 my-1">
        <div className="font-bold leading-none mb-2">
          <h1>Skills</h1>
        </div>
        {skills.map((skill, index) => (
          <h1
            key={index}
            className="font-normal text-start text-l leading-none my-1"
          >
            # {skill.name}
          </h1>
        ))}
      </div>
    </>
  );
}
