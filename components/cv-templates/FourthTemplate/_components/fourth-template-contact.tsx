import { useProfileStore } from "@/store/profile-store";
import { TProfile } from "@/types/cv";

export default function FourthTemplateContact() {
  const { profile: user } = useProfileStore();

  const fullName = user.firstName + ' ' + user.lastName;
  const position =  user.position;
  const phone = user.phone;
  const summary = user.summary;
  const email =  user.email;
  const github =  user.github;
  const linkedin = user.linkedin;


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
