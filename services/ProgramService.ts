import axios from "axios";

export class ProgramService{
    static getAllPrograms(){
        return axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/program`);
    }
}