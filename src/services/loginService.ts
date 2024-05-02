import axios from "axios";
import { UserSubmitForm } from "../pages/Login";
import { API } from "../utils/api";

export const loginStandard = async (data: UserSubmitForm) => {
    return axios.post(API.login, data);
}