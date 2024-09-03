import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useProfileStore } from "@/store/profile-store";
import { TProfile } from "@/types/cv";

export default function SecondTemplateProfile({
  profile = null,
}: {
  profile?: TProfile | null;
}) {
  const { profile: user } = useProfileStore();

  const fullName = profile
    ? profile.firstName + " " + profile.lastName
    : user.firstName + " " + user.lastName;
  const position = profile ? profile.position : user.position;
  const image = profile ? profile.image : user.image

  return (
    <>
      <div>
        <div className="flex justify-between items-center ">
          <div className="max-w-60 text-wrap">
            <h1 className="uppercase font-bold text-xl tracking-[0.3em]">
              {fullName}
            </h1>
            <h1 className="text-l font-extralight leading-relaxed ">
              {position}
            </h1>
          </div>
          <Avatar className="w-20 h-20 mr-10">
            <AvatarImage className="w-full h-full object-cover" src={image} />
          </Avatar>
        </div>
        <hr className="w-full border-primary my-4" />
      </div>
    </>
  );
}
