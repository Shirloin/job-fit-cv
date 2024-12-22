import { useProjectStore } from "@/store/project-store";
import { TProject } from "@/types/cv";

export default function FourthTemplateProject({
  savedProjects = null,
}: {
  savedProjects?: TProject[] | null;
}) {
  const { projects: storeProjects } = useProjectStore();
  const projects = storeProjects ?? savedProjects;
  if (projects.length < 1) {
    return null;
  }
  return (
    <>
      <div className="flex flex-col items-start">
        <div className="font-bold leading-none w-full my-2 uppercase">
          <h1>Projects</h1>
        </div>
        <hr className="w-full border-primary my-1" />
        {projects.map((project, index) => (
          <div key={index} className="flex flex-col my-1">
            <h1 className="font-semibold text-start text-l leading-none">
              {project.projectName}
            </h1>
            <h1 className="text-m text-wrap my-1">
              {project.projectDescription}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
}
