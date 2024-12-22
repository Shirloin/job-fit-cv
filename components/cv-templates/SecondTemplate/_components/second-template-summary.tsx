import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useProfileStore } from "@/store/profile-store";
import { TProfile } from "@/types/cv";

export default function SecondTemplateSummary({
  profile = null,
}: {
  profile?: TProfile | null;
}) {
  const { profile: user } = useProfileStore();

  const summary = profile ? profile.summary : user.summary;

  return (
    <>
      <div className="text-l w-[90%]">
        <p className="uppercase text-[12px] font-bold">Summary</p>
        <div className="border-t border-1 border-black w-full m-auto mt-2 mb-1"></div>
        <div className="flex flex-col gap-1">
          <p className="text-m leading-tight">{summary}</p>
        </div>
      </div>
    </>
  );
}
