import React from "react";
import useAxiosIntercepter from "../helpers/jwtInterceptor";
import { BASE_URL } from "../config";

interface IuseCrud<T> {
    dataCRUD: T[];
    fetchData: () => Promise<void>;
    error: Error|null;
    isLoading: boolean
}

const useCrud = <T>(initialData: T[], apiURL: string): IuseCrud<T> => {
    
    const jwtAxios = useAxiosIntercepter()

    const [dataCRUD, setDataCRUD] = React.useState<T[]>(initialData)
    const [error, setError] = React.useState<Error | null>(null)
    const [isLoading, setIsLoading] = React.useState(false)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {})
            const data = response.data

            setDataCRUD(data)
            setError(null)
            setIsLoading(false)

            return data
        }
        catch (error: any) {
            if (error.response && error.response.status===400){
                setError(new Error("400"))
            }
            setIsLoading(false)
            throw error
        }
    }

    return {fetchData, dataCRUD, error, isLoading}
}

export default useCrud