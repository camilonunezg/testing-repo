import { reactive, toRef } from 'vue';

import type { LimitOptions } from '@/core/domain/types';

export const useTableActions = (limit: LimitOptions = 10, orderBy: Record<string, any> = {}) => {
  const tableFilterCriteria = reactive({
    page: 1,
    limit: limit,
    orderBy,
    search: undefined as string | undefined,
    type: undefined as string | string[] | undefined,
  });

  const changePage = (newPage: number) => {
    tableFilterCriteria.page = newPage;
  };

  const changeLimit = (newLimit: LimitOptions) => (tableFilterCriteria.limit = newLimit);

  const changeSearch = (newSearchText: string) => {
    if (newSearchText) tableFilterCriteria.search = newSearchText;
    else tableFilterCriteria.search = undefined;
  };

  const changeType = (newType: string | string[]) => {
    if (newType.length) tableFilterCriteria.type = newType;
    else tableFilterCriteria.type = undefined;
  };

  return {
    tableFilterCriteria,
    currentPage: toRef(tableFilterCriteria, 'page'),
    changePage,
    changeLimit,
    changeSearch,
    changeType,
  };
};
