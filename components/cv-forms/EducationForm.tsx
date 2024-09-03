import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEducationStore } from "@/store/education-store";

export default function EducationForm() {
  const { educations, insertEducation, removeEducation, updateEducationData } =
    useEducationStore();

  return (
    <>
      <div className="max-w-lg w-full font-normal mt-4">
        {educations.map((education, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl">Education #{index + 1}</h1>
              <Button
                onClick={() => removeEducation(education.id)}
                variant="outline"
              >
                Remove
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="w-full">
                <Label htmlFor={`schoolName${index}`}>School Name</Label>
                <Input
                  className="mt-1"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateEducationData(index, "schoolName", e.target.value)
                  }
                  placeholder="School Name"
                  id={`schoolName${index}`}
                  value={education.schoolName}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="max-w-72 w-full flex flex-col gap-2">
                <Label className="mb-1" htmlFor={`startDate${index}`}>
                  Start Date
                </Label>
                <Input
                  value={education.startDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateEducationData(index, "startDate", e.target.value)
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
                  value={education.endDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateEducationData(index, "endDate", e.target.value)
                  }
                  id={`endDate${index}`}
                  placeholder="End Date"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="max-w-72 w-full flex flex-col gap-2">
                <Label className="mb-1" htmlFor={`degree${index}`}>
                  Degree
                </Label>
                <Input
                  value={education.degree}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateEducationData(index, "degree", e.target.value)
                  }
                  id={`degree${index}`}
                  placeholder="Degree"
                />
              </div>
              <div className="max-w-72 w-full flex flex-col gap-2">
                <Label className="mb-1" htmlFor={`fieldOfStudy${index}`}>
                  Field Of Study
                </Label>
                <Input
                  value={education.fieldOfStudy}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateEducationData(index, "fieldOfStudy", e.target.value)
                  }
                  id={`fieldOfStudy${index}`}
                  placeholder="Field of Study"
                />
              </div>
            </div>
          </div>
        ))}
        <Button
          onClick={insertEducation}
          className="w-full mt-6"
          variant="outline"
        >
          Add More education
        </Button>
      </div>
    </>
  );
}
