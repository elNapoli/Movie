import type { BaseResponse } from '~~/src/domain/models/BaseResponse'
import type EventService from '../services/EventService'

class BaseRepository {
    service: EventService
    constructor(service: EventService) {
        this.service = service
    }
    async handleResponse<DTO, MODEL>(
        promise: Promise<any>,
        dataToTransform: (data: DTO) => MODEL
    ): Promise<BaseResponse<MODEL>> {
        try {
            const data = await promise
            return {
                message: data.error?.message
                    ? data.error?.message
                    : 'Todo fue un éxito',
                status: data.status,
                error: data.error ? true : false,
                data: data.data ? dataToTransform(data.data) : null,
            }
        } catch (error) {
            console.log(error)
            return {
                message: 'Ocurrió un error al procesar la solicitud',
                status: 500,
                error: true,
                data: null,
            }
        }
    }
}

export default BaseRepository
