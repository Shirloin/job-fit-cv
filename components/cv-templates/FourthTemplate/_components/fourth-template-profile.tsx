import { useProfileStore } from "@/store/profile-store";
import { TProfile } from "@/types/cv";

export default function FourthTemplateProfile({
  profile = null,
}: {
  profile?: TProfile | null;
}) {
  const { profile: user } = useProfileStore();
  const fullName = profile
    ? profile.firstName + " " + profile.lastName
    : user.firstName + " " + user.lastName;
  const position = profile ? profile.position : user.position;
  const summary = profile ? profile.summary : user.summary;
  const phone = profile ? profile.phone : user.phone;
  const email = profile ? profile.email : user.email;
  const github = profile ? profile.github : user.github;
  const linkedin = profile ? profile.linkedin : user.linkedin;

  return (
    <div className="flex flex-col items-start mr-1 w-full">
      <div className="flex justify-between w-full">
        <div className="flex justify-between items-center ">
          <div className="w-full text-wrap">
            <h1 className="font-bold text-xl uppercase">{fullName}</h1>
            <h1 className="text-l mt-1">{position}</h1>
          </div>
        </div>
        <div className="flex flex-col gap-1 my-1">
          {phone && (
            <div className="flex">
              <h1 className="text-m text-wrap w-10">Phone</h1>
              <h1 className="text-m text-wrap ">{phone}</h1>
            </div>
          )}
          {email && (
            <div className="flex">
              <h1 className="text-m text-wrap w-10">Email</h1>
              <h1 className="text-m text-wrap ">{email}</h1>
            </div>
          )}
          {github && (
            <div>
              <div className="flex">
                <h1 className="text-m text-wrap w-10">Github</h1>
                <h1 className="text-m text-wrap ">{github}</h1>
              </div>
            </div>
          )}
          {linkedin && (
            <div>
              <div className="flex">
                <h1 className="text-m text-wrap w-10">LinkedIn</h1>
                <h1 className="text-m text-wrap ">{linkedin}</h1>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className="w-full border-primary mt-4 mb-1" />
      <h1 className="self-center text-m leading-tight text-wrap my-1">
        {summary}
      </h1>
    </div>
  );
}
