import type { RegionDto } from './RegionDto'

export interface MunicipalityDto {
    id: string
    name: string
    region_id: number
    regions?: RegionDto
}
