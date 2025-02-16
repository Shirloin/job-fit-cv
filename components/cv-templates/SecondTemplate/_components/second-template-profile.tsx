import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useProfileStore } from "@/store/profile-store";
import { TProfile } from "@/types/cv";

export default function SecondTemplateProfile() {
  const { profile: user } = useProfileStore();

  const fullName = user.firstName + " " + user.lastName;
  const position =  user.position;

  return (
    <>
      <div>
        <div className="flex justify-between items-center ">
          <div className="w-full text-wrap text-center">
            <h1 className="font-bold text-xl">{fullName}</h1>
            <h1 className="text-l mt-1">{position}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
