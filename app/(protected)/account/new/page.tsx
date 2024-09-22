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
import { useFetchAllPrograms } from "@/hooks/use-fetch-data";
import { useLoading } from "@/providers/LoadingProvider";
import { UserService } from "@/services/UserService";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import readXlsxFile from "read-excel-file";

export default function CreateStudentPage() {
  const {
    data: programs = [],
    isLoading: isLoadingPositions,
    isError: isErrorPositions,
  } = useFetchAllPrograms();
  const [form, setForm] = useState({
    username: "",
    role: "",
    name: "",
    email: "",
    program: "",
    campus: "",
  });
  const [roleOpen, setRoleOpen] = useState(false);
  const [majorOpen, setMajorOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { isLoading, setIsLoading } = useLoading();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const user = await UserService.createAccount(
        form.username,
        form.name,
        form.role,
        form.campus,
        form.email,
        form.program
      );
      toast.success("Create Account Success");
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
    setForm({
      username: "",
      role: "",
      name: "",
      email: "",
      program: "",
      campus: "",
    })
  };
  const handleCsvSubmit = async () => {
    setIsLoading(true);
    if (!file) {
      toast.error("Please choose a file");
      return;
    }

    try {
      const response = await UserService.insertAccountUsingFile(file);
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
      <ContentLayout title="New Account">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New Account</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="rounded-lg border-none mt-6">
          <CardContent className="p-6">
            <div className="flex justify-start items-start">
              <div className="w-full flex flex-col relative">
                <div className="w-full flex flex-col gap-2">
                  <Label>Username</Label>
                  <Input
                    className="w-full"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                  />
                  <Label>Name</Label>
                  <Input
                    className="w-full"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                  />
                  <Label>Email</Label>
                  <Input
                    className="w-full"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                  />
                  <Label>Campus</Label>
                  <Input
                    className="w-full"
                    placeholder="Campus"
                    name="campus"
                    onChange={handleChange}
                  />
                  <Label>Major</Label>
                  <Popover open={majorOpen} onOpenChange={setMajorOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={majorOpen}
                        className="w-full justify-between my-2"
                      >
                        {form.program !== "" ? form.program : "Major"}
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
                                  setForm({
                                    ...form,
                                    ["program"]: program.name
                                      ? program.name
                                      : "",
                                  });
                                  setMajorOpen(false);
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
                  <Label>Role</Label>
                  <Popover open={roleOpen} onOpenChange={setRoleOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={majorOpen}
                        className="w-full justify-between my-2"
                      >
                        {form.role !== "" ? form.role : "Role"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className=" p-0" align="start">
                      <Command>
                        <CommandList className="max-h-60 ">
                          <CommandEmpty>No role found.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              value={"Student"}
                              onSelect={() => {
                                setForm({
                                  ...form,
                                  ["role"]: "Student",
                                });
                                setRoleOpen(false);
                              }}
                            >
                              Student
                            </CommandItem>
                            <CommandItem
                              value={"Admin"}
                              onSelect={() => {
                                setForm({
                                  ...form,
                                  ["role"]: "Admin",
                                });
                                setRoleOpen(false);
                              }}
                            >
                              Admin
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <Button
                    onClick={handleSubmit}
                    className="self-start w-fit px-6 my-2 bg-green-500 hover:bg-green-500"
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
              <h1 className="mb-6 font-bold text-xl">Insert Using .xlsx</h1>
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
                onClick={handleCsvSubmit}
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
