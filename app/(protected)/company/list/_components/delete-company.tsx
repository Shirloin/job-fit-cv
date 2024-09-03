import { Button } from "@/components/ui/button";
import { CompanyService } from "@/services/CompanyService";
import { TCompany } from "@/types/company";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface DeleteCompanyProps {
  company: TCompany;
}
export default function DeleteCompany({ company }: DeleteCompanyProps) {

  const queryClient = useQueryClient()

  const handleDelete = async () => {
    try {
      const response = await CompanyService.deleteCompany(company.id)
      toast.success("Company Deleted")
      queryClient.invalidateQueries({ queryKey: ["companies"] })
    } catch (error) {
      toast.error("Fail to delete company")
    }
  }

  return (
    <>
      <button className="w-full text-start" onClick={handleDelete}>Delete</button>
    </>
  );
}
