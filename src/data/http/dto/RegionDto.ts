import type { MunicipalityDto } from './MunicipalityDto'
export interface RegionDto {
    id: string
    name: string
    country_id: number
    municipalities: MunicipalityDto[]
}
