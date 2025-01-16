"use client";
import FifthTemplate from "@/components/cv-templates/FifthTemplate/page";
import FirstTemplate from "@/components/cv-templates/FirstTemplate/page";
import FourthTemplate from "@/components/cv-templates/FourthTemplate/page";
import SecondTemplate from "@/components/cv-templates/SecondTemplate/page";
import ThirdTemplate from "@/components/cv-templates/ThirdTemplate/page";
import { Button } from "@/components/ui/button";
import { useFetchUserCV } from "@/hooks/use-fetch-data";
import { useEducationStore } from "@/store/education-store";
import { useExperienceStore } from "@/store/experience-store";
import { useProfileStore } from "@/store/profile-store";
import { useProjectStore } from "@/store/project-store";
import { useSkillStore } from "@/store/skill-store";
import { useTemplateStore } from "@/store/template-store";
import {
  TEducation,
  TExperience,
  TProfile,
  TProject,
  TSkill,
} from "@/types/cv";
import { useRouter } from "next/navigation";

export default function SavedCV() {
  const {
    data: cv,
    isLoading: isLoadingCV,
    isError: isErrorCV,
  } = useFetchUserCV();
  const templates = [
    <FirstTemplate key={1} cv={cv} />,
    <SecondTemplate key={2} cv={cv} />,
    <ThirdTemplate key={3} cv={cv} />,
    <FourthTemplate key={4} cv={cv} />,
    <FifthTemplate key={5} cv={cv} />,
  ];
  const router = useRouter();
  const setTemplate = useTemplateStore((state) => state.setTemplate);
  const setProfileStore = useProfileStore((state) => state.setInitialData);
  const setExperienceStore = useExperienceStore(
    (state) => state.setInitialData
  );
  const setEducationStore = useEducationStore((state) => state.setInitialData);
  const setProjectStore = useProjectStore((state) => state.setInitialData);
  const setSkillStore = useSkillStore((state) => state.setInitialData);
  const handleEdit = () => {
    if (cv) {
      setTemplate(cv.index);
      const profile = cv.profile as TProfile;
      setProfileStore(profile);
      const experiences = cv.experiences as TExperience[];
      setExperienceStore(experiences);
      const educations = cv.educations as TEducation[];
      setEducationStore(educations);
      const projects = cv.projects as TProject[];
      setProjectStore(projects);
      const skills = cv.skills as TSkill[];
      setSkillStore(skills);
    }
    router.push("/cv/new");
  };

  return (
    <>
      <div className="group  mx-auto flex justify-center ">
        {isLoadingCV ? (
          <div>Please wait for a moment...</div>
        ) : cv ? (
          <div
            className="w-fit h-fit border border-primary rounded-xl cursor-pointer"
            onClick={handleEdit}
          >
            <div className="w-full h-full p-4">
            <div className=" w-[460px] h-[660px] overflow-hidden leading-3">
              {templates[cv.index]}
            </div>
            </div>
          </div>
        ) : (
          <div>No CV Saved</div>
        )}
      </div>
    </>
  );
}
