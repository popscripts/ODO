export type ApiResponse = {
    result: string | object
    error: number
    statusCode: number
    param?: string
    access_token?: string
}

export type Error = {
    error: boolean
    errorText: string
}
