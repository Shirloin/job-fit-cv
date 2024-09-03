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
      <div className="text-l mr-10 mt-1">
        <p className="uppercase text-[12px] tracking-[0.15rem] font-semibold mb-4">
          Contact
        </p>
        <div className="flex flex-col gap-1 text-m">
          {phone && (
            <div className="flex">
              <h1 className="w-11">Phone</h1>
              <h1>{phone}</h1>
            </div>
          )}
          {email && (
            <div className="flex items-center">
              <h1 className="min-w-11">Email</h1>
              <h1>{email}</h1>
            </div>
          )}
          {github && (
            <div className="flex">
              <h1 className="w-11">Github</h1>
              <h1>{github}</h1>
            </div>
          )}
          {linkedin && (
            <div className="flex">
              <h1 className="w-11">Linkedin</h1>
              <h1>{linkedin}</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
