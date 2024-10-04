import { useQuery } from "@tanstack/react-query"
import { axiosPrivate } from "../../api/Axios"


const useFetchData = (url) => {
    return useQuery({
        queryKey: [url],
        queryFn: async () => {
            try {
                const { data } = await axiosPrivate.get(url)
                console.log(data)
                return data
            } catch (error) {
                throw error;
            }
        }
    })
}

export default useFetchData