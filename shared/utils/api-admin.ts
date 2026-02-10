import axios from "axios";

export const $apiAdmin = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SITE_API_ORIGIN}/api/admin`
});