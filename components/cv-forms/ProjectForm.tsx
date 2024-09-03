import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLoading } from "@/providers/LoadingProvider";
import { GeneratorService, prompts } from "@/services/GeneratorService";
import { IProject, useProjectStore } from "@/store/project-store";

export default function ProjectForm() {
  const { projects, insertProject, removeProject, updateProjectData} = useProjectStore();
  const { isLoading, setIsLoading } = useLoading();

  const handleGenerateProjectDescription = async(
    index: number,
    project: IProject
  ) => {
    setIsLoading(true);
    const prompt = prompts.projectSummary(
      project.projectName,
      project.projectDescription
    );
    const newDescription = await GeneratorService.generateText(prompt);
    updateProjectData(index, "projectDescription", newDescription);
    setIsLoading(false);
  };

  return (
    <>
      <div className="max-w-lg w-full font-normal mt-4">
        {projects.map((project, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl">Project #{index + 1}</h1>
              <Button
                onClick={() => removeProject(project.id)}
                variant="outline"
              >
                Remove
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="w-full">
                <Label htmlFor={`projectName${index}`}>Project Name</Label>
                <Input
                  className="mt-1"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateProjectData(index, "projectName", e.target.value)
                  }
                  placeholder="Project Name"
                  id={`projectName${index}`}
                  value={project.projectName}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex gap-2 items-center">
                <Label htmlFor={`projectDescription${index}`}>
                  Description
                </Label>
                <Button
                  onClick={() =>
                    handleGenerateProjectDescription(index, project)
                  }
                  className="text-gray-400 hover:text-green-500"
                  variant={"ghost"}
                >
                  Generate
                </Button>
              </div>
              <Textarea
                className="mt-1"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  updateProjectData(
                    index,
                    "projectDescription",
                    e.target.value
                  )
                }
                placeholder="Project Description"
                id={`projectDescription${index}`}
                value={project.projectDescription}
              />
            </div>
          </div>
        ))}
        <Button
          onClick={insertProject}
          className="w-full mt-6"
          variant="outline"
        >
          Add More Project
        </Button>
      </div>
    </>
  );
}
