import { useProfileStore } from "@/store/profile-store";
import { TProfile } from "@/types/cv";

export default function ThirdTemplateProfile({
  profile = null,
}: {
  profile?: TProfile | null;
}) {
  const {profile:user} = useProfileStore();
  const fullName = profile
    ? profile.firstName + " " + profile.lastName
    : user.firstName + " " + user.lastName;
  const position = profile ? profile.position : user.position;
  const summary = profile ? profile.summary : user.summary;

  return (
    <div className="flex flex-col items-start mr-1">
      <h1 className="uppercase font-bold text-start text-m leading-none ">
        {position}
      </h1>
      <div className="font-bold leading-none my-1">
        <h1>Hello I&apos;m</h1>
        <h1>{fullName}</h1>
      </div>
      <h1 className="self-center text-m leading-tight text-wrap my-1">
        {summary}
      </h1>
    </div>
  );
}