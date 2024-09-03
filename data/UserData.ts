import { TPosition } from "@/types/position";
import { TSemester } from "@/types/semester";
import { TStudentSubjectScore } from "@/types/student-subject-score";
import { TSubject } from "@/types/subject";
import { TTech } from "@/types/tech";
import { TUser } from "@/types/user";

// Mock student data
// const studentsData: TUser[] = [
//   {
//     id: "250201572",
//     username: "2502017572",
//     nim: "2502017572",
//     name: "Riccardo",
//     email: "riccardo@binus.ac.id",
//     gpa: 3.43,
//     campus: "Kemanggisan",
//     image:
//       "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
//     skills: [],
//     student_subject_scores: [],
//   },
// ];

// Mock tech subjects
const subjectData: TSubject[] = [
  { id: "1", name: "Web Development", type: "Tech" },
  { id: "2", name: "Data Science", type: "Tech" },
  { id: "3", name: "Mobile App Development", type: "Tech" },
  { id: "4", name: "Cybersecurity", type: "Tech" },
  { id: "5", name: "Artificial Intelligence", type: "Tech" },
  { id: "6", name: "Cloud Computing", type: "Tech" },
];

// Mock positions
const positions: TPosition[] = [
  { id: "1", name: "Software Engineer" },
  { id: "2", name: "Data Analyst" },
  { id: "3", name: "Cybersecurity Analyst" },
];

// Mock semesters
const semestersData: TSemester[] = [
  {
    id: "1",
    name: "2023",
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-12-31"),
    semester_subjects: [
      subjectData[0],
      subjectData[1],
      subjectData[2],
      subjectData[3],
      subjectData[4],
      subjectData[5],
    ],
    student_subject_scores: []
  },
  {
    id: "2",
    name: "2024",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    semester_subjects: [
      subjectData[0],
      subjectData[1],
      subjectData[2],
      subjectData[3],
      subjectData[4],
      subjectData[5],
    ],
    student_subject_scores: []
  },
  {
    id: "3",
    name: "2025",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-12-31"),
    semester_subjects: [
      subjectData[0],
      subjectData[1],
      subjectData[2],
      subjectData[3],
      subjectData[4],
      subjectData[5],
    ],
    student_subject_scores: []
  },
  {
    id: "4",
    name: "2026",
    startDate: new Date("2026-01-01"),
    endDate: new Date("2026-12-31"),
    semester_subjects: [
      subjectData[0],
      subjectData[1],
      subjectData[2],
      subjectData[3],
      subjectData[4],
      subjectData[5],
    ],
    student_subject_scores: []
  },
  {
    id: "5",
    name: "2027",
    startDate: new Date("2027-01-01"),
    endDate: new Date("2027-12-31"),
    semester_subjects: [
      subjectData[0],
      subjectData[1],
      subjectData[2],
      subjectData[3],
      subjectData[4],
      subjectData[5],
    ],
    student_subject_scores: []
  },
];


// Export mock data
export { semestersData };
