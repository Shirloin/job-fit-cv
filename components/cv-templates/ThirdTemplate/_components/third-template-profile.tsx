import { useProfileStore } from '@/store/profile-store';
import { TProfile } from '@/types/cv';

export default function ThirdTemplateProfile() {
  const { profile: user } = useProfileStore();
  const fullName =  user.firstName + ' ' + user.lastName;
  const position =user.position;
  const summary =  user.summary;

  return (
    <div className="flex flex-col items-start mr-1">
      <h1 className="uppercase font-bold text-start text-m leading-none my-1">
        {position}
      </h1>
      <div className="font-bold text-xl leading-none mb-1">
        <h1>{fullName}</h1>
      </div>
      <h1 className="self-center text-m leading-tight text-wrap my-1">
        {summary}
      </h1>
    </div>
  );
}
