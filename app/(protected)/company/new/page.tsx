"use client";
import { ContentLayout } from "@/components/panel/content-layout";
import PlaceholderContent from "@/components/placeholder-content";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useFetchAllPositions,
  useFetchAllPrograms,
} from "@/hooks/use-fetch-data";
import { cn } from "@/lib/utils";
import { useLoading } from "@/providers/LoadingProvider";
import { CompanyService } from "@/services/CompanyService";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export default function CreateCompanyPage() {
  const {
    data: programs = [],
    isLoading: isLoadingPositions,
    isError: isErrorPositions,
  } = useFetchAllPrograms();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [program, setProgram] = useState<string>("");
  const { setIsLoading } = useLoading();

  const handleSubmit = async () => {
    try {
      const response = await CompanyService.insertCompany(
        name,
        position,
        program
      );
      toast.success("Company inserted");
    } catch (error) {
      return;
    }
  };

  const handleExcelSubmit = async () => {
    setIsLoading(true);
    if (!file) {
      toast.error("Please choose a file");
      return;
    }
    try {
      const response = await CompanyService.insertCompanyUsingFile(file);
      setIsLoading(false);
      toast.success(response.data.msg);
    } catch (error) {
      setIsLoading(false);
    } finally {
      toast.success("Account Inserted");
      setFile(null);
    }
  };

  return (
    <>
      <ContentLayout title="New Company">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New Company</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="rounded-lg border-none mt-6 ">
          <CardContent className="p-6">
            <div className="flex justify-start items-start">
              <div className="w-full flex flex-col relative">
                <div className="w-full flex flex-col gap-2">
                  <Label>Name</Label>
                  <Input
                    className="w-full"
                    placeholder="Company Name"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setName(e.target.value);
                    }}
                  />
                  <Label>Position</Label>
                  <Input
                    className="w-full"
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
                  <Button
                    onClick={handleSubmit}
                    className="self-end w-fit px-6 my-2 bg-green-500 hover:bg-green-500"
                    variant={"default"}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-lg border-none mt-6">
          <CardContent className="p-6">
            <div className="w-full flex flex-col gap-2">
              <h1 className="mb-6 font-bold text-xl">Insert Using CSV</h1>
              <Input
                type="file"
                accept=".xlsx"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              <Button
                onClick={handleExcelSubmit}
                className="self-start w-fit px-6 my-2 bg-green-500 hover:bg-green-500"
                variant={"default"}
              >
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </ContentLayout>
    </>
  );
}
