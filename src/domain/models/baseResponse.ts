export interface BaseResponse<MODEL> {
    message: string | null
    status: number
    error: Boolean
    data: MODEL | null
}
