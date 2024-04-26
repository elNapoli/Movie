export interface BaseResponseDto<MODEL> {
    code: string
    message: string | null
    status: number
    data: MODEL
    error: ErrorDto | null
}
interface ErrorDto {
    code: string
    message: string
}
