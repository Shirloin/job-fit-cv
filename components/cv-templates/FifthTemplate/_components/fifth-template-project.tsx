import { useProjectStore } from '@/store/project-store';
import { TProject } from '@/types/cv';

export default function FifthTemplateProject({
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
      <div className="mt-4">
        <h2 className="text-center font-serif text-xs">Projects</h2>
        <hr className="w-full border-primary mt-4 mb-1" />
        {projects.map((project, index) => (
          <div key={index} className="mt-2">
            <h2 className="text-[8px] font-bold">{project.projectName}</h2>
            <h2 className="text-[8px]">{project.projectDescription}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
