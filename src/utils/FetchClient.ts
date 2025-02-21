import { Toast } from "react-native-toast-notifications";

const API_URL = process.env.EXPO_PUBLIC_API_URL
const API_VERSION = process.env.EXPO_PUBLIC_API_VERSION

const FetchClient = {
    setLoggedIn: (loggenIn: boolean) => {},

    async fetchWrapper(fetchFunction: Function) {
        try {
            const response = await fetchFunction();
    
            const data = await response.json().catch(() => null);
    
            if (!response.ok && data.error) {
                console.log("Fetch error:", data)
                if (!data.param) {
                    if (data.statusCode === 404) return

                    if (data.statusCode === 401) {
                        this.setLoggedIn(false)
                        return
                    }

                    Toast?.show(data.result, {type: 'danger'})
                }
                return data
            }
    
            return data;
    
        } catch (error) {
            console.log("Fetch error:", error)
            Toast?.show("Nieznany błąd", {type: 'danger'})
            return {
                error: 1,
                result: error instanceof Error ? error.message : "Unknown error",
                statusCode: 500,
            };
        }
    },

    async get(endpoint: string) {
        return await this.fetchWrapper(() =>
            fetch(`${API_URL}/${API_VERSION}` + endpoint, {
                method: 'GET',
                credentials: 'include'
            })
        )
    },

    async post(endpoint: string, body: object) {
        return await this.fetchWrapper(() =>
            fetch(`${API_URL}/${API_VERSION}` + endpoint, {
                method: 'POST',
                body: JSON.stringify(body),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        )
    },

    async postFormData(endpoint: string, body: FormData) {
        return await this.fetchWrapper(() =>
            fetch(`${API_URL}/${API_VERSION}` + endpoint, {
                method: 'POST',
                body: body,
                credentials: 'include'
            })
        )
    },

    async patch(endpoint: string, body: object) {
        return await this.fetchWrapper(() =>
            fetch(`${API_URL}/${API_VERSION}` + endpoint, {
                method: 'PATCH',
                body: JSON.stringify(body),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        )
    },

    async delete(endpoint: string, body: object) {
        return await this.fetchWrapper(() =>
            fetch(`${API_URL}/${API_VERSION}` + endpoint, {
                method: 'DELETE',
                ...(body && {body: JSON.stringify(body)}),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        )
    },

    async put(endpoint: string, body: object) {
        return await this.fetchWrapper(() =>
            fetch(`${API_URL}/${API_VERSION}` + endpoint, {
                method: 'PUT',
                body: JSON.stringify(body),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        )
    }
}

export default FetchClient
