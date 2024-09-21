import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useProfileStore } from "@/store/profile-store";
import { TProfile } from "@/types/cv";

export default function FirstTemplateProfile({
  profile = null,
}: {
  profile?: TProfile | null;
}) {
  const {profile:user} = useProfileStore();

  const fullName = profile
    ? profile.firstName + " " + profile.lastName
    : user.firstName + " " + user.lastName;
  const position = profile ? profile.position : user.position;
  const phone = profile ? profile.phone : user.phone;
  const email = profile ? profile.email : user.email;
  const github = profile ? profile.github : user.github;
  const linkedin = profile ? profile.linkedin : user.linkedin;
  const image = profile ? profile.image : user.image;
  const summary = profile ? profile.summary : user.summary;

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="uppercase font-bold text-green-500 text-2xl tracking-wider">
              {fullName}
            </h1>
            <h1 className="text-l font-extralight leading-relaxed ">
              {position}
            </h1>
          </div>
          <div className="text-l">
            {phone && (
              <div className="flex">
                <h1 className="w-12">Phone</h1>
                <h1>: {phone}</h1>
              </div>
            )}
            {email && (
              <div className="flex">
                <h1 className="w-12">Email</h1>
                <h1>: {email}</h1>
              </div>
            )}
            {github && (
              <div className="flex">
                <h1 className="w-12">Github</h1>
                <h1>: {github}</h1>
              </div>
            )}
            {linkedin && (
              <div className="flex">
                <h1 className="w-12">LinkedIn</h1>
                <h1>: {linkedin}</h1>
              </div>
            )}
          </div>
        </div>
        <hr className="w-full border-primary my-4" />
        <div className="w-full flex justify-between items-center my-1">
          <Avatar className="w-20 h-20 mr-10">
            <AvatarImage className="w-full h-full object-cover" src={image} />
          </Avatar>
          <h1 className="self-center text-m leading-tight text-wrap my-1">
            {summary}
          </h1>
        </div>
      </div>
    </>
  );
}