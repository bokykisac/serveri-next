"use client";

import AvatarCard from "@/components/colleagues/AvatarCard";
import axios from "@/lib/axios";
import { Colleauge } from "@/types";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Skeleton from "@/components/ui/Skeleton";

const fetchColleagues = async (page: number) => {
  const { data } = await axios.get(
    `/zaposleni/getAllPageable?page=${page}&size=3`,
  );
  return data;
};

interface ColleaguesPageProps {
  initialColleagues: any;
}

const ColleaguesPage = ({ initialColleagues }: ColleaguesPageProps) => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["colleagues"],
    async ({ pageParam = 4 }) => {
      const response = await fetchColleagues(pageParam);
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 2;
      },
      initialData: {
        pages: [initialColleagues],
        pageParams: [4],
      },
      enabled: false,
    },
  );

  const lastColleagueRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastColleagueRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  return (
    <div className="px-2">
      {data?.pages.map((page, i) => (
        <div key={i} className="grid grid-cols-3 gap-3 py-1.5">
          {page.content.map((colleague: Colleauge, index: number) => {
            if (index === page.content.length - 1) {
              return (
                <AvatarCard
                  key={colleague.id}
                  colleague={colleague}
                  cardRef={ref}
                />
              );
            }
            return <AvatarCard key={colleague.id} colleague={colleague} />;
          })}
        </div>
      ))}
      {isFetchingNextPage && (
        <div className="grid grid-cols-3 gap-3 py-1.5">
          <Skeleton className="h-64 w-full bg-stone-300" />
          <Skeleton className="h-64 w-full bg-stone-300" />
          <Skeleton className="h-64 w-full bg-stone-300" />
        </div>
      )}
    </div>
  );
};

export default ColleaguesPage;