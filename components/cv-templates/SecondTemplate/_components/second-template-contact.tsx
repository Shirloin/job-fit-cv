import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useProfileStore } from "@/store/profile-store";
import { TProfile } from "@/types/cv";
import { FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function SecondTemplateContact({
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
      <div className="text-l w-full flex justify-center mt-2">
        <div className="flex gap-2 text-m">
          {phone && (
            <div className="flex gap-0.5">
              <h1 className="font-semibold">Phone:</h1>
              <h1>{phone}</h1>
            </div>
          )}
          {email && (
            <div className="flex gap-0.5">
              <h1 className="font-semibold">Email:</h1>
              <h1>{email}</h1>
            </div>
          )}
          {github && (
            <div className="flex gap-0.5">
              <h1 className="font-semibold">Github:</h1>
              <h1>{github}</h1>
            </div>
          )}
          {linkedin && (
            <div className="flex gap-0.5">
              <h1 className="font-semibold">Linkedin:</h1>
              <h1>{linkedin}</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
