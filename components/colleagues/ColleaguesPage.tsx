"use client";

import AvatarCard from "@/components/colleagues/AvatarCard";
import axios from "@/lib/axios";
import { Colleauge } from "@/types";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import Skeleton from "@/components/ui/Skeleton";
import SearchBar from "@/components/colleagues/SearchBar";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

const buildApiUrl = (
  base: string,
  params: Record<string, string | undefined>,
) => {
  const queryString = Object.entries(params)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `${base}?${queryString}`;
};

const fetchColleagues = async (
  page: number,
  firstName: string | undefined,
  lastName: string | undefined,
  organizationUnit: string | undefined,
  email: string | undefined,
) => {
  const apiUrl = buildApiUrl("/zaposleni/getAllPageable", {
    page: page.toString(),
    size: "3",
    firstName,
    lastName,
    organizationUnit,
    email,
  });

  // TODO: type
  const { data } = await axios.get(apiUrl);
  return data;
};

interface ColleaguesPageProps {
  // TODO: type
  initialColleagues: any;
}

const ColleaguesPage = ({ initialColleagues }: ColleaguesPageProps) => {
  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const debouncedFirstName = useDebouncedValue(firstName);

  const [lastName, setLastName] = useState<string | undefined>(undefined);
  const debouncedLastName = useDebouncedValue(lastName);

  const [email, setEmail] = useState<string | undefined>(undefined);
  const debouncedEmail = useDebouncedValue(email);

  const [organizationUnit, setOrganizationUnit] = useState<string | undefined>(
    undefined,
  );
  const debouncedOrganizationUnit = useDebouncedValue(organizationUnit);

  const { data, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    ["colleagues"],
    async ({ pageParam = 0 }) => {
      const response = await fetchColleagues(
        pageParam,
        debouncedFirstName,
        debouncedLastName,
        debouncedOrganizationUnit,
        debouncedEmail,
      );
      return response;
    },
    {
      getNextPageParam: (data) => {
        if (data.last) return undefined;
        if (data.size === 9) return 3;
        return data.number + 1;
      },
      initialData: {
        pages: [initialColleagues],
        pageParams: [undefined],
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

  useEffect(() => {
    if (
      debouncedFirstName !== undefined ||
      debouncedLastName !== undefined ||
      debouncedEmail !== undefined ||
      debouncedOrganizationUnit !== undefined
    ) {
      refetch();
    }
  }, [
    debouncedFirstName,
    debouncedLastName,
    debouncedEmail,
    debouncedOrganizationUnit,
  ]);

  return (
    <div className="px-2">
      <SearchBar
        setFirstName={setFirstName}
        setLastName={setLastName}
        setEmail={setEmail}
        setOrganizationUnit={setOrganizationUnit}
      />
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
