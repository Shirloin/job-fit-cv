'use client'
import PlaceholderContent from "@/components/placeholder-content";
import { ContentLayout } from "@/components/panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { useCurrentRole } from "@/hooks/use-current-role";

export default function DashboardPage() {
  const role = useCurrentRole()

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>
      <video className="flex rounded-md" width={"1200"} height={"800"} controls >
        {
          role!.toString().toLowerCase().includes("admin") ? (
            <source src="/assets/tutorial/Admin-Tutorial.mp4" type="video/mp4"/>
            
          ):
          (
            <source src="/assets/tutorial/Student-Tutorial.mp4" type="video/mp4"/>
          )
        }
           </video>
      </PlaceholderContent>
    </ContentLayout>
  );
}