import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useProfileStore } from "@/store/profile-store";
import { TProfile } from "@/types/cv";

export default function SecondTemplateBio({
  profile = null,
}: {
  profile?: TProfile | null;
}) {
  const { profile: user } = useProfileStore();

  const summary = profile ? profile.summary : user.summary;

  return (
    <>
      <div className="text-l mr-10 mt-1 w-full">
        <p className="uppercase text-[12px] tracking-[0.15rem] font-semibold mb-4">
          Profile
        </p>
        <div className="flex flex-col gap-1">
          <p className="text-m leading-tight">{summary}</p>
        </div>
      </div>
    </>
  );
}
