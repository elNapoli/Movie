import type { BaseResponse } from '~~/src/domain/models/baseResponse'

const InitState = <MODEL>(): BaseResponse<MODEL> => ({
    message: '',
    error: false,
    status: 0,
    data: initData<MODEL>(),
})

const LoadingState = <MODEL>(): BaseResponse<MODEL> => ({
    message: '',
    error: false,
    status: 1000, // NOTE: el valor 1000 corresponde a un valor loading en mi proyecto
    data: initData<MODEL>(),
})

const initData = <MODEL>(): MODEL extends any[] ? MODEL : MODEL | null => {
    return [] as MODEL extends any[] ? MODEL : MODEL | null
}

export { InitState, LoadingState }
