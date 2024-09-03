import axios from "axios";

export class CompanyService {
    static getCompanies() {
        return axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/company`);
    }

    static getCompanyById(id: String) {
        return axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/company`, {
            params: { id }
        });
    }

    static insertCompany(name: string, position: string, program: string) {
        return axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/company`, {
            name: name, positionName: position, programName: program
        })
    }

    static updateCompany(id: string, name: string, position: string, program: string) {
        return axios.put(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/company/${id}`, {
            name: name, positionName: position, programName: program
        })
    }

    static deleteCompany(id: string) {
        return axios.delete(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/company/${id}`)
    }

    static insertCompanyUsingFile(file: File) {
        const formData = new FormData();
        formData.append("file", file);

        return axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/company/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
}