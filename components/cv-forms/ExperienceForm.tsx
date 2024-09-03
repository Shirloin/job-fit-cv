import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLoading } from "@/providers/LoadingProvider";
import { GeneratorService, prompts } from "@/services/GeneratorService";
import {useExperienceStore } from "@/store/experience-store";
import { TExperience } from "@/types/cv";
import { Select } from "@radix-ui/react-select";

export default function ExperienceForm() {
  const { experiences, insertExperience, removeExperience, updateExperienceData } = useExperienceStore();
  const { isLoading, setIsLoading } = useLoading();

  const handleGenerateExperienceSummary = async (
    index: number,
    experience: TExperience 
  ) => {
    setIsLoading(true);
    const prompt = prompts.experienceSummary(experience.positionTitle, experience.companyName, experience.type, experience.summary);

    const newSummary = await GeneratorService.generateText(prompt);

    updateExperienceData(index, "summary", newSummary);
    setIsLoading(false);
  };

  return (
    <>
      <div className="max-w-lg w-full font-normal mt-4">
        {experiences.map((experience, index) => (
          <div key={experience.id} className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl">Experience #{index + 1}</h1>
              <Button
                onClick={() => removeExperience(experience.id)}
                variant="outline"
              >
                Remove
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="max-w-72 w-full">
                <Label htmlFor={`positionTitle${index}`}>Position Title</Label>
                <Input
                  className="mt-1"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateExperienceData(index, "positionTitle", e.target.value)
                  }
                  placeholder="Position Title"
                  id={`positionTitle${index}`}
                  value={experience.positionTitle}
                />
              </div>
              <div className="max-w-72 w-full">
                <Label htmlFor={`companyName${index}`}>Company Name</Label>
                <Input
                  className="mt-1"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateExperienceData(index, "companyName", e.target.value)
                  }
                  placeholder="Company Name"
                  id={`companyName${index}`}
                  value={experience.companyName}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="w-full flex flex-col gap-2">
                <Label>Experience Type</Label>
                <Select
                  value={experience.type}
                  onValueChange={(value) => {
                    updateExperienceData(index, "type", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Experience Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fulltime">Fulltime</SelectItem>
                    <SelectItem value="Parttime">Parttime</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Organization">Organization</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Volunteering">Volunteering</SelectItem>
                    <SelectItem value="Freelancing">Freelancing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="max-w-72 w-full flex flex-col gap-2">
                <Label className="mb-1" htmlFor={`startDate${index}`}>
                  Start Date
                </Label>
                <Input
                  value={experience.startDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateExperienceData(index, "startDate", e.target.value)
                  }
                  id={`startDate${index}`}
                  placeholder="Start Date"
                />
              </div>
              <div className="max-w-72 w-full flex flex-col gap-2">
                <Label className="mb-1" htmlFor={`endDate${index}`}>
                  End Date
                </Label>
                <Input
                  value={experience.endDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateExperienceData(index, "endDate", e.target.value)
                  }
                  id={`endDate${index}`}
                  placeholder="End Date"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex gap-2 items-center">
                <Label htmlFor={`summary${index}`}>Summary</Label>
                <Button
                  onClick={() => handleGenerateExperienceSummary(index, experience)}
                  className="text-gray-400 hover:text-green-500"
                  variant={"ghost"}
                >
                  Generate
                </Button>
              </div>
              <Textarea
                className="h-36 mt-1"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  updateExperienceData(index, "summary", e.target.value)
                }
                placeholder="Experience Summary"
                id={`summary${index}`}
                value={experience.summary}
              />
            </div>
          </div>
        ))}
        <Button
          onClick={insertExperience}
          className="w-full mt-6"
          variant="outline"
        >
          Add More Experience
        </Button>
      </div>
    </>
  );
}
