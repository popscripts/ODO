import { ApiResponse } from './response.type'

export type FetchClientType = {
    fetchWrapper(fetchFunction: Function): Promise<ApiResponse>
    get(url: string): Promise<ApiResponse>
    post(url: string, body?: object): Promise<ApiResponse>
    postFormData(url: string, body: FormData): Promise<ApiResponse>
    patch(url: string, body: object): Promise<ApiResponse>
    delete(url: string, body?: object): Promise<ApiResponse>
    put(url: string, body: object): Promise<ApiResponse>
}
