import { useProfileStore } from "@/store/profile-store";

export default function SecondTemplateContact() {
  const { profile: user } = useProfileStore();

  const phone =  user.phone;
  const email =  user.email;
  const github =  user.github;
  const linkedin =  user.linkedin;

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
