import { API_URL } from '../config'

const FetchClient = {
    async get(endpoint: string) {
        return await fetch(API_URL + endpoint, {
            method: 'GET',
            credentials: 'include'
        })
    },

    async post(endpoint: string, body: object) {
        return await fetch(API_URL + endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    async postFormData(endpoint: string, body: FormData) {
        return await fetch(API_URL + endpoint, {
            method: 'POST',
            body: body,
            credentials: 'include'
        })
    },

    async patch(endpoint: string, body: object) {
        return await fetch(API_URL + endpoint, {
            method: 'PATCH',
            body: JSON.stringify(body),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    async delete(endpoint: string, body: object) {
        return await fetch(API_URL + endpoint, {
            method: 'DELETE',
            body: JSON.stringify(body),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    async put(endpoint: string, body: object) {
        return await fetch(API_URL + endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
}

export default FetchClient
