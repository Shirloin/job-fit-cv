import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { useSkillStore } from "@/store/skill-store"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { ChevronsUpDown } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function SkillForm() {
    const [open, setOpen] = useState(false)
    const skillData = [
        "HTML",
        "CSS",
        "Javascript",
        "Android",
        "Java",
        "Kotlin",
        "Flutter",
        "Next JS",
        "React JS",
        "Tailwind",
        "Express JS",
        "PHP",
        "Laravel",
        "Communication",
        "Leadership",
        "Time Management",
        "Inovative",
        "Critical"
    ]
    const { skills, insertSkill, removeSkill } = useSkillStore()
    const handleInsertSkill = (name: string) => {
        const skillExists = skills.some(skill => skill.name === name)
        if (!skillExists) {
            insertSkill(name)
        }
        else {
            toast.error("Skill already included")
        }
    }
    return (
        <>
            <div className="max-w-lg w-full font-normal mt-4">
                {
                    skills.map((skill, index) => (
                        <div key={index} className="w-full flex justify-between items-center mb-4">
                            <h1 className="text-xl font-medium"># {skill.name}</h1>
                            <Button onClick={() => removeSkill(skill.id)} variant="outline">Remove</Button>
                        </div>
                    ))
                }
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                        >
                            Add More Skill
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search skill..." />
                            <CommandList className="max-h-60 ">
                                <CommandEmpty>No skill found.</CommandEmpty>
                                <CommandGroup>
                                    {
                                        skillData.map((skill, index) => (
                                            <CommandItem
                                                key={index}
                                                value={skill}
                                                onSelect={() => {
                                                    handleInsertSkill(skill)
                                                    setOpen(false)
                                                }}
                                            >
                                                {skill}
                                            </CommandItem>
                                        ))
                                    }
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

            </div>
        </>
    )
}