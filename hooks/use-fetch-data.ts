import { CompanyService } from "@/services/CompanyService";
import { PositionService } from "@/services/PositionService";
import { ProgramService } from "@/services/ProgramService";
import { UserService } from "@/services/UserService";
import { TCompany } from "@/types/company";
import { TPosition } from "@/types/position";
import { TProgram } from "@/types/program";
import { TUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "./use-current-user";
import { TCV } from "@/types/cv";
import { StudenScoreService } from "@/services/StudentScoreService";
import { TStudentSubjectScore } from "@/types/student-subject-score";

export const useFetchAllStudents = () => {
  const fetchData = async () => {
    try {
      const response = await UserService.getAllStudent();
      return response.data as TUser[];
    } catch (error) {
      throw new Error("Failed to fetch students");
    }
  };
  return useQuery({
    queryKey: ["students"],
    queryFn: fetchData,
  });
};

export const useFetchAllCompanies = () => {
  const user = useCurrentUser()
  if (!user || !user.id) {
    throw new Error("User not found or user ID is missing");
  }
  const fetchRecommendedCompany = async () => {
    try {

      const response = await UserService.getCompanies(user.id)
      return response.data as TCompany[]
    } catch (error) {
      console.error("Error fetching recommended company:", error);
      throw new Error("Failed to fetch recommended company");
    }
  }
  return useQuery({
    queryKey: ["companies"],
    queryFn: fetchRecommendedCompany
  })
};

export const useFetchAllPrograms = () => {
  const fetchPrograms = async () => {
    try {
      const response = await ProgramService.getAllPrograms();
      return response.data as TProgram[];
    } catch (error) {
      console.error("Error fetching programs:", error);
      throw new Error("Failed to fetch programs");
    }
  };

  return useQuery({
    queryKey: ["programs"],
    queryFn: fetchPrograms,
  });
};

export const useFetchAllPositions = () => {
  const fetchPositions = async () => {
    try {
      const response = await PositionService.getAllPosition();
      return response.data as string[];
    } catch (error) {
      console.error("Error fetching programs:", error);
      throw new Error("Failed to fetch programs");
    }
  };
  return useQuery({
    queryKey: ["positions"],
    queryFn: fetchPositions,
  });
};

export const useFetchUserCV = () => {
  const user = useCurrentUser()
  const fetchUserCV = async () => {
    try {
      const response = await UserService.getCV(user.nim)
      if (response.data) {
        const cv = response.data.cv as TCV
        if (cv) {
          return cv
        }
      }
      return null
    } catch (error) {
      console.error("Error fetching user cv:", error);
      throw new Error("Failed to fetch user cv");
    }
  }
  return useQuery({
    queryKey: ["cv"],
    queryFn: fetchUserCV,
  });
}
export const useFetchStudentCV = (id: string) => {
  const fetchUserCV = async () => {
    try {
      const response = await UserService.getCV(id)
      if (response.data) {
        const cv = response.data.cv as TCV
        if (cv) {
          return cv
        }
      }
      return null
    } catch (error) {
      console.error("Error fetching user cv:", error);
      throw new Error("Failed to fetch user cv");
    }
  }
  return useQuery({
    queryKey: ["cv"],
    queryFn: fetchUserCV,
  });
}



export const useFetchStudentScore = () => {
  const user = useCurrentUser()
  const fetchStudentScore = async () => {
    try {
      const response = await StudenScoreService.getStudentScore(user.id)
      return response.data as TStudentSubjectScore[]
    } catch (error) {
      console.error("Error fetching student score:", error);
      throw new Error("Failed to fetch student score");
    }
  }
  return useQuery({
    queryKey: ["scores"],
    queryFn: fetchStudentScore
  })
}
