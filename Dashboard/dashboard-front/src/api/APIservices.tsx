import axios, { AxiosResponse } from 'axios';
import { useApi } from './APIHook';
import { User } from '~/interfaces/user';
import { Company } from '~/interfaces/companies';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL

const apiService = axios.create({
    baseURL: API_BASE_URL,
});
const mockAPI = setTimeout(() => {
    return true
}, 200);
export const apiServices = {
    companies: {
        getAll: async (): Promise<Company[]> => {
            const response = (await apiService.get(`/companies`)).data;
            console.log({ getAll: response });
            return response.map((c: any) => {
                c["companyId"] = c['id'];
                delete c['id']
                return c
            })
        },
        getCompanyByName: async (companyName: string) => {
            const response = (await apiService.get(`/companies/${companyName}`)).data;
            console.log(response);
            return response

        },
        postNewCompany: async (companyName: string) => {
            const response = (await apiService.post(`/companies`, { companyName })).data;
            console.log(response);
            return response
        },
        editCompany: async ({ companyName, companyId }: Company) => {
            console.log(companyId, companyName);

            const response = (await apiService.patch(`/companies/${companyId}`, { companyName })).data;
            console.log(response);
            return response
        },
        deleteCompany: async (companyId: string) => {
            const response = await apiService.delete(`/companies/${companyId}`);
            console.log(response);
            return response
        }
    },
    meetings: {
        getAll: async (): Promise<Meeting[]> => {
            const response = (await apiService.get(`/meetings`)).data;
            console.log(response);
            return response.map((m: any) => {
                m["companyId"] = m['id'];
                delete m['id']
                return m
            })
        },
        addNewMeeting: async ({
            companyName,
            //companyId,
            location,
            meetingDate,
            summary
        }: {
            companyName: string,
            //companyId: string,
            location: string,
            meetingDate: Date,
            summary: string
        }) => {
            const response = (await apiService.post(`/meetings`, {
                companyName,
                //companyId,
                location,
                meetingDate,
                summary
            })).data;
            console.log(response);
            return response
        }
    },
    users: {
        login: async ({ userName, password }: { userName: string, password: string }): Promise<User> => {
            const response: AxiosResponse | void = (await apiService.post(`/users/login`, {
                userName, password
            }).catch((e) => {
                alert(e?.response?.data?.message)
            }));
            //console.log({ response });
            return response?.data
        }
    },
    fetchSomeData: async (endPoint?: string | null) => {
        try {
            const response = await apiService.get(`/${endPoint}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
