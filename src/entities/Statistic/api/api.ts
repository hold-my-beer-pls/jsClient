import { baseApi } from '@/shared/api';
import { HardestStatistic } from '@/entities/Statistic/model/interfaces.ts';

export const statisticApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getHardest: build.query<HardestStatistic[], void>({
      query: () => ({
        url: '/statistics/hardest',
      }),
    }),
  }),
});

export const { useGetHardestQuery } = statisticApi;
