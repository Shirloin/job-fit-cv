"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { TCompany } from "@/types/company";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { TProgram } from "@/types/program";
import { CompanyService } from "@/services/CompanyService";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { TUser } from "@/types/user";
import StudentRepository from "@/repositories/StudentRepository";
import { StudentService } from "@/services/StudentService";

interface UpdateStudentProps extends React.ComponentPropsWithRef<typeof Sheet> {
    student: TUser;
    programs: TProgram[];
}
export default function UpdateStudentSheet({
    student,
    programs,
    ...props
}: UpdateStudentProps) {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState(student.username)
    const [name, setName] = useState(student.name);
    const [program, setProgram] = useState(student.program?.name);
    const [email, setEmail] = useState(student.email)
    const [campus, setCampus] = useState(student.campus)

    const queryClient = useQueryClient();
    const handleSubmit = async () => {
        if (!name || !email || !program || !username || !campus) {
            toast.error("All fields must be filled");
            return;
        }
        try {
            const response = await StudentService.updateStudent(student.id, username, name, email, campus, program)
            toast.success("Update Successful");
            queryClient.invalidateQueries({ queryKey: ["students"] });
        } catch (error: any) {
            toast.error(error.response.data.msg)
        }
    };

    return (
        <>
            <Sheet {...props}>
                <SheetContent className="max-w-md">
                    <SheetHeader>
                        <SheetTitle>Edit</SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <div className=" w-full flex flex-col gap-2 mt-4">
                        <Label>Username</Label>
                        <Input
                            value={username}
                            placeholder="Username"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setUsername(e.target.value);
                            }}
                        />
                        <Label>Name</Label>
                        <Input
                            value={name}
                            placeholder="Name"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setName(e.target.value);
                            }}
                        />
                        <Label>Email</Label>
                        <Input
                            value={email}
                            placeholder="Email"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <Label>Campus</Label>
                        <Input
                            value={campus}
                            placeholder="Campus"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setCampus(e.target.value);
                            }}
                        />
                        <Label>Program</Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between my-2"
                                >
                                    {program !== "" ? program : "Major"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className=" p-0" align="start">
                                <Command>
                                    <CommandInput placeholder="Search major..." />
                                    <CommandList className="max-h-60 ">
                                        <CommandEmpty>No position found.</CommandEmpty>
                                        <CommandGroup>
                                            {programs.map((program, index) => (
                                                <CommandItem
                                                    key={program.id}
                                                    value={program.name}
                                                    onSelect={() => {
                                                        setProgram(program.name ? program.name : "");
                                                        setOpen(false);
                                                    }}
                                                >
                                                    {program.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <SheetClose asChild>
                            <Button
                                onClick={handleSubmit}
                                variant={"outline"}
                                className="w-full"
                            >
                                Save
                            </Button>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
