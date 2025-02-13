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
import { ChangeEvent, useRef, useState } from "react";
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
  const [programOpen, setProgramOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { isLoading, setIsLoading } = useLoading();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setForm({
        username: "",
        role: "",
        name: "",
        email: "",
        program: "",
        campus: "",
      })
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
    
  };
  const handleExcelSubmit = async () => {
    setIsLoading(true);
    if (!file) {
      toast.error("Please choose a file");
      return;
    }

    try {
      const response = await UserService.insertAccountUsingFile(file);
      setIsLoading(false);
      toast.success(response.data.msg);
    } catch (error: any) {
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false);
      setFile(null);
      fileInputRef.current!.value = "";
      toast.success("Account Inserted");
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
                    value={form.username}
                    onChange={handleChange}
                  />
                  <Label>Name</Label>
                  <Input
                    className="w-full"
                    placeholder="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  <Label>Email</Label>
                  <Input
                    className="w-full"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <Label>Campus</Label>
                  <Input
                    className="w-full"
                    placeholder="Campus"
                    name="campus"
                    value={form.campus}
                    onChange={handleChange}
                  />
                  <Label>Program</Label>
                  <Popover open={programOpen} onOpenChange={setProgramOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={programOpen}
                        className="w-full justify-between my-2"
                      >
                        {form.program !== "" ? form.program : "Program"}
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
                                  setProgramOpen(false);
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
                        aria-expanded={programOpen}
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
                ref={fileInputRef}
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
