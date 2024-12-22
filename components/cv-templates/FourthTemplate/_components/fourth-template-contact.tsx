import { useProfileStore } from "@/store/profile-store";
import { TProfile } from "@/types/cv";

export default function FourthTemplateContact({
  profile = null,
}: {
  profile?: TProfile | null;
}) {
  const { profile: user } = useProfileStore();
  const phone = profile ? profile.phone : user.phone;
  const email = profile ? profile.email : user.email;
  const github = profile ? profile.github : user.github;
  const linkedin = profile ? profile.linkedin : user.linkedin;

  return (
    <>
      <div className="flex flex-col items-start mr-1">
        <div className="font-bold leading-none mb-2">
          <h1>Contact</h1>
        </div>
        <div className="flex flex-col gap-1 my-1">
          {phone && (
            <div>
              <h1 className="font-semibold text-start text-l leading-none">
                Phone
              </h1>
              <h1 className="text-m text-wrap ">{phone}</h1>
            </div>
          )}
          {email && (
            <div>
              <h1 className="font-semibold text-start text-l leading-none">
                Email
              </h1>
              <h1 className="text-m text-wrap ">{email}</h1>
            </div>
          )}
          {github && (
            <div>
              <h1 className="font-semibold text-start text-l leading-none">
                Github
              </h1>
              <h1 className="text-m text-wrap">{github}</h1>
            </div>
          )}
          {linkedin && (
            <div>
              <h1 className="font-semibold text-start text-l leading-none">
                LinkedIn
              </h1>
              <h1 className="text-m text-wrap ">{linkedin}</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
