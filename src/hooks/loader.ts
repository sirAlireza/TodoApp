import {useEffect, useState} from "react";

/**
 * Custom hook to handle loading and error state while calling an async function or sending network requests.
 * @param queryFunction
 * @param initialData
 * @param deps
 */
export default function useLoader<DataT>(queryFunction: () => (Promise<DataT> | DataT), initialData: any = null, deps = []) {
    const [error, setError] = useState<Error | null>(null)
    const [data, setData] = useState<DataT>(initialData)
    const [status, setStatus] = useState<"idle" | "fetching" | "success" | "error">("idle")
    useEffect(() => {
        try {
            (async () => {
                setStatus("fetching")
                const result = await queryFunction()
                setData(result)
                setStatus("success")
            })()
        } catch (e) {
            setError(e as Error)
            setStatus("success")
        }
    }, deps)
    return {
        isLoading: status === "fetching" || status === "idle",
        error,
        data,
        status,
        setData
    }
}