export type FetchClientType = {
    get(url: string): Promise<Response>
    post(url: string, body: object): Promise<Response>
    patch(url: string, body: object): Promise<Response>
}
