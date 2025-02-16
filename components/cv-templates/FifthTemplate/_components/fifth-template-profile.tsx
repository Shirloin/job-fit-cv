import { useProfileStore } from '@/store/profile-store';
import { TProfile } from '@/types/cv';

export default function FifthTemplateProfile() {
  const { profile: user } = useProfileStore();
  const fullName = user.firstName + ' ' + user.lastName;
  const position =  user.position;
  const phone = user.phone;
  const email =  user.email;
  const github =  user.github;
  const linkedin = user.linkedin;

  return (
    <>
      <div className="text-center">
        <h1 className="text-base uppercase font-serif">{fullName}</h1>
        <h2 className="text-xs">{position}</h2>
      </div>
      <div className="mt-1 flex justify-around items-center text-[8px] text-slate-500">
        <div className="flex items-center gap-1">
          <span>Phone:</span>
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Email:</span>
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Github:</span>
          <span>{github}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Linkedin:</span>
          <span>{linkedin}</span>
        </div>
      </div>
    </>
  );
}
