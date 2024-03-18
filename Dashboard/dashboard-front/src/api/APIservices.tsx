import axios, { AxiosResponse } from 'axios';
import { User } from '~/interfaces/user';
import { Company } from '~/interfaces/companies';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL

const apiService = axios.create({
    baseURL: API_BASE_URL,
});

export const apiServices = {
    companies: {
        getAll: async (): Promise<Company[]> => {
            const response = (await apiService.get(`/companies`)).data;
            return response.map((c: any) => {
                c["companyId"] = c['id'];
                delete c['id']
                return c
            })
        },
        getCompanyByName: async (companyName: string) =>
            (await apiService.get(`/companies/${companyName}`)).data,
        postNewCompany: async (companyName: string) =>
            (await apiService.post(`/companies`, { companyName })).data,
        editCompany: async ({ companyName, companyId }: Company) =>
            (await apiService.patch(`/companies/${companyId}`, { companyName })).data,
        deleteCompany: async (companyId: string) =>
            await apiService.delete(`/companies/${companyId}`)
    },
    meetings: {
        getAll: async (): Promise<Meeting[]> => {
            const response = (await apiService.get(`/meetings`)).data;
            return response.map((m: any) => {
                m["companyId"] = m['id'];
                delete m['id']
                return m
            })
        },
        addNewMeeting: async ({
            companyName,
            location,
            meetingDate,
            summary
        }: {
            companyName: string,
            location: string,
            meetingDate: Date,
            summary: string
        }) => {
            return (await apiService.post(`/meetings`, {
                companyName,
                location,
                meetingDate,
                summary
            })).data;
        }
    },
    users: {
        login: async ({ userName, password }: { userName: string, password: string }): Promise<User> => {
            const response: AxiosResponse | void = (await apiService.post(`/users/login`, {
                userName, password
            }).catch((e) => {
                alert(e?.response?.data?.message)
            }));
            return response?.data
        }
    },
}
