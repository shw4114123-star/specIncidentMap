import { useState } from "react"

export default function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const execute = async (parameters: object) => await fetch(url, parameters)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(error => setError(error))
        .finally(() => { setLoading(false) })
    return {
        execute,
        data,
        error,
        loading,
    }
}
