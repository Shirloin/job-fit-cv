import { useProjectStore } from "@/store/project-store";
import { TProject } from "@/types/cv";

export default function SecondTemplateProject({
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
    <div className="text-l w-[90%]">
      <p className="uppercase text-[12px] font-bold">Project</p>
      <div className="border-t border-1 border-black w-full m-auto mt-2 mb-1"></div>
      <div className="flex flex-col gap-1">
        {projects.map((project, index) => (
          <div key={index} className="my-1">
            <h1 className="font-semibold text-start text-l leading-none">
              {project.projectName}
            </h1>
            <h1
              className="text-m leading-tight text-wrap my-1"
              dangerouslySetInnerHTML={{
                __html: project.projectDescription.replace(/\n/g, "<br />"),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
