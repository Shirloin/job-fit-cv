import axios from "axios";

export class StudenScoreService{
    static getStudentScore(id: string){
        return axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/user/${id}/score/`)
    }
}