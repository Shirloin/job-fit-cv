import { useProfileStore } from '@/store/profile-store';
import { TProfile } from '@/types/cv';

export default function FifthTemplateSummary({
  profile = null,
}: {
  profile?: TProfile | null;
}) {
  const { profile: user } = useProfileStore();

  const summary = profile ? profile.summary : user.summary;

  return (
    <>
      <div className="mt-2">
        <h2 className="text-center font-serif text-xs">Summary</h2>
        <hr className="w-full border-primary mt-4 mb-1" />
        <p className="text-[8px]">{summary}</p>
      </div>
    </>
  );
}
