import { MenuRepository } from '@domain/repositories/MenuRepository'
import { Http } from '@domain/repositories/Http'
import { httpSupabase } from '@data/instances/supabase/HttpSupabase'
import { menuRepositoryImpl } from '@data/repositories/menuRepositoryImpl'

const client: Http = httpSupabase

export const menuRepository: MenuRepository = menuRepositoryImpl(client)
