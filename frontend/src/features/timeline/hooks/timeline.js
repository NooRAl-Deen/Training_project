import { useInfiniteQuery } from "@tanstack/react-query";

import { getTimeLine } from "../services/timeline";
import { TIMELINE_QUERY_KEY } from "../constants/constants";

export const useTimeLine = (options) => {
  return useInfiniteQuery({
    queryKey: TIMELINE_QUERY_KEY,
    queryFn: getTimeLine,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage =
        lastPage?.current_page < lastPage?.total_pages
          ? lastPage?.current_page + 1
          : undefined;
      return nextPage;
    },
    ...options
  });
};
