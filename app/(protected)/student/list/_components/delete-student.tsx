import { Button } from "@/components/ui/button";
import { CompanyService } from "@/services/CompanyService";
import { StudentService } from "@/services/StudentService";
import { TCompany } from "@/types/company";
import { TUser } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface DeleteStudentProps {
    student: TUser;
}
export default function DeleteStudent({ student }: DeleteStudentProps) {

    const queryClient = useQueryClient()

    const handleDelete = async () => {
        try {
            const response = await StudentService.deleteStudent(student.id)
            toast.success("Student Deleted")
            queryClient.invalidateQueries({ queryKey: ["students"] })
        } catch (error) {
            toast.error("Fail to delete student")
        }
    }

    return (
        <>
            <button className="w-full text-start" onClick={handleDelete}>Delete</button>
        </>
    );
}
