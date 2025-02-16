import { useProjectStore } from '@/store/project-store';
import { TProject } from '@/types/cv';

export default function ThirdTemplateProject() {
  const { projects } = useProjectStore();

  if (projects.length < 1) {
    return null;
  }
  return (
    <>
      <div className="flex flex-col items-start mr-1">
        <div className="font-bold leading-none my-2">
          <h1>Projects</h1>
        </div>
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
