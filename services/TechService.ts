import axios from "axios";

export class TechService{
    static getTechs(){
        return axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/tech/getAllTechs`);
    }
}