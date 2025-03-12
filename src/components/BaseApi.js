import axios from "axios";

export const Apidata= axios.create({
    baseURL:'http://localhost:3000'
})