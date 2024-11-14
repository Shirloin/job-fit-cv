import { useSkillStore } from '@/store/skill-store';
import { TSkill } from '@/types/cv';

export default function FifthTemplateSkill({
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
      <div className="mt-2">
        <h2 className="text-center font-serif text-xs">Skills</h2>
        <hr className="w-full border-primary mt-4 " />
        <div className="text-center">
          {skills.map((skill, index) => (
            <span key={index} className="text-m">
              {skill.name}&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
