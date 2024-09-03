import axios from "axios";

export class PositionService{
    static getAllPosition(){
        return axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/position`);
    }
}