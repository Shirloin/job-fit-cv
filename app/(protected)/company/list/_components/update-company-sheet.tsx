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
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { TProgram } from "@/types/program";
import { CompanyService } from "@/services/CompanyService";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface UpdateCompanyProps extends React.ComponentPropsWithRef<typeof Sheet> {
  company: TCompany;
  programs: TProgram[];
}
export default function UpdateCompanySheet({
  company,
  programs,
  ...props
}: UpdateCompanyProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(company.name);
  const [program, setProgram] = useState(company.program?.name);
  const [position, setPosition] = useState(company.position?.name);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (company) {
      setName(company.name);
      setPosition(company.position?.name);
      setProgram(company.program?.name);
    }
  }, [company]);

  const handleSubmit = async () => {
    if (!name || !position || !program) {
      toast.error("All fields must be filled");
      return;
    }
    try {
      const response = await CompanyService.updateCompany(
        company.id,
        name,
        position,
        program
      );

      toast.success("Update Successful");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      setName("")
      setProgram("")
      setPosition("")

    } catch (error) {
      console.log(error)
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
            <Label>Company Name</Label>
            <Input
              value={name}
              placeholder="Company Name"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
            />
            <Label>Position</Label>
            <Input
              value={position}
              placeholder="Required Position"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPosition(e.target.value);
              }}
            />
            <Label>Major</Label>
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
