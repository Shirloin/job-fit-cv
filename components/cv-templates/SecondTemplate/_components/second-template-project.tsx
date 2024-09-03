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
    <>
      <div className="flex flex-col items-start mr-1">
        <p className="uppercase text-[12px] tracking-[0.15rem] font-semibold mb-3">
          Projects
        </p>
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
    </>
  );
}
