import { JsonObject } from "@prisma/client/runtime/library";
import axios from "axios";

export class UserService {
  static logIn(username: String, password: String) {
    return axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth/signin`, {
      params: {
        username,
        password,
      },
    });
  }

  static getAllStudent() {
    return axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/user`);
  }

  static saveUserCV(id: string, cv: JsonObject) {
    return axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/user/cv`, {
      id,
      cv,
    });
  }

  static getCV(nim: string) {
    return axios.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/user/${nim}/cv`);
  }

  static changePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    return axios.put(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/user`, {
      id,
      currentPassword,
      newPassword,
      confirmPassword,
    });
  }

  static getCompanies(nim: string) {
    return axios.get(
      `${process.env.NEXT_PUBLIC_BASE_PATH}/api/user/${nim}/company`
    );
  }

  static createAccount(
    username: string,
    name: string,
    role: string,
    campus?: string,
    email?: string,
    program?: string,
  ) {
    return axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/user`, {
      username,
      name,
      role,
      email,
      program,
      campus
    });
  }

  static insertAccountUsingFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/user/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
