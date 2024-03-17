import axios from 'axios';
import { useApi } from './APIHook';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL

const apiService = axios.create({
    baseURL: API_BASE_URL,
});
const mockAPI = setTimeout(() => {
    return true
}, 200);
export const apiServices = {
    companies: {
        getAll: async () => {
            return await mockAPI;
            // const response = (await apiService.get(`/companies`)).data;
            // console.log(response);
            // return response
        },
        getCompanyByName: async (companyName: string) => {
            return await mockAPI;
            const response = (await apiService.get(`/companies/${companyName}`)).data;
            console.log(response);
            return response

        },
        postNewCompany: async (newCompanyName: string) => {
            return await mockAPI;
            // const response = (await apiService.post(`/companies`, { newCompanyName })).data;
            // console.log(response);
            // return response
        },
        editCompany: async ({ newCompanyName, companyId }: { newCompanyName: string, companyId: string }) => {
            return await mockAPI;
            // const response = (await apiService.put(`/companies`, { newCompanyName, companyId })).data;
            // console.log(response);
            // return response
        },
        deleteCompany: async (id: string) => {
            return await mockAPI;
            // const response = await apiService.delete(`/companies/${id}`);
            // console.log(response);
            // return response
        }
    },
    meetings: {
        getAll: async () => {
            return await mockAPI;
            // const response = (await apiService.get(`/meetings`)).data;
            // console.log(response);
            // return response
        },
        addNewMeeting: async ({
            companyName,
            companyId,
            location,
            date,
            summary
        }: {
            companyName: string,
            companyId: string,
            location: string,
            date: Date,
            summary: string
        }) => {
            return await mockAPI;
            // const response = (await apiService.post(`/meetings`,{
            //     companyName,
            //     companyId,
            //     location,
            //     date,
            //     summary
            // })).data;
            // console.log(response);
            // return response

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
