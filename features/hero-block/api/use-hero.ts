import { HeroResponse } from '@/shared/types';
import { $apiAdmin } from '@/shared/utils';
import { useQuery } from '@tanstack/react-query';

export const useHero = () => {
    return useQuery({ 
        queryKey: ['hero-block'],
        queryFn: async () => {
            const { data } = await $apiAdmin.get<HeroResponse>('/hero');

            return data.image;
        } 
    })
}