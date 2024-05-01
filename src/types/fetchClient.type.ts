export type FetchClientType = {
    get(url: string): Promise<Response>
    post(url: string, body: object): Promise<Response>
    postFormData(url: string, body: FormData): Promise<Response>
    patch(url: string, body: object): Promise<Response>
    delete(url: string, body: object): Promise<Response>
    put(url: string, body: object): Promise<Response>
}
