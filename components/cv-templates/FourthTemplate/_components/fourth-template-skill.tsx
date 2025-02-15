import { useSkillStore } from '@/store/skill-store';
import { TSkill } from '@/types/cv';
import { useEffect, useState } from 'react';

export default function FourthTemplateSkill({
  savedSkills,
}: {
  savedSkills?: TSkill[] | null;
}) {
  const { skills: storeSkills } = useSkillStore();
  const [skills, setSkills] = useState(storeSkills ?? savedSkills);

  useEffect(() => {
    if (storeSkills.length > 0) {
      setSkills(storeSkills);
    } else if (savedSkills && savedSkills.length > 0) {
      setSkills(savedSkills);
    }
  }, [savedSkills, storeSkills]);

  if (skills.length < 1) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-1 my-1">
        <div className="font-bold leading-none mb-1 mt-2 w-full col-span-2">
          <h1>Skills</h1>
          <hr className="w-full border-primary mt-3" />
        </div>
        {skills.map((skill, index) => (
          <h1
            key={index}
            className="font-normal text-start text-l leading-none my-1 "
          >
            {skill.name}
          </h1>
        ))}
      </div>
    </>
  );
}
