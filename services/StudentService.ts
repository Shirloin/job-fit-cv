import axios from "axios";

export class StudentService {

    static updateStudent(id: string, username: string, name: string, email: string, program: string) {
        return axios.put(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/student`, {
            id, username, name, email, program
        });
    }
    static deleteStudent(id: string) {
        return axios.delete(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/student`, {
            data: {
                id: id
            }
        });
    }
}