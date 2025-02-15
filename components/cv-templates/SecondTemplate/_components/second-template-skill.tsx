import { useSkillStore } from '@/store/skill-store';
import { TSkill } from '@/types/cv';
import { useEffect, useState } from 'react';

export default function SecondTemplateSkill({
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
      <div className="text-l w-[90%]">
        <p className="uppercase text-[12px] font-bold">Skills</p>
        <div className="border-t border-1 border-black w-full m-auto mt-2 mb-1"></div>
        <div className="flex flex-wrap gap-1">
          {skills.map((skill, index) => (
            <div key={index} className="my-1">
              <h1 className="font-semibold text-start text-l leading-none">
                {skill.name}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
