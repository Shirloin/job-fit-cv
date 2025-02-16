import { useSkillStore } from '@/store/skill-store';
import { TSkill } from '@/types/cv';
import { useEffect, useState } from 'react';

export default function FirstTemplateSkill() {
  const { skills } = useSkillStore();

  if (skills.length < 1) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-start my-1">
        <h1 className="uppercase font-bold leading-none tracking-widest mb-2 text-black">
          Skills
        </h1>
        {skills.map((skill, index) => (
          <h1
            key={index}
            className="font-normal text-start text-l leading-normal"
          >
            # {skill.name}
          </h1>
        ))}
      </div>
    </>
  );
}
