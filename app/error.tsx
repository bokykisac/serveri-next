"use client";

import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  if (error.message === "Request failed with status code 401") {
    return router.replace("/unauthorized");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">
          Ooops, something went wrong.
        </h1>
        <p className="m-2">
          Click{" "}
          <span
            className="cursor-pointer text-primary hover:opacity-75"
            onClick={() => reset()}
          >
            here{" "}
          </span>
          to try again.
        </p>
        <div className="rounded-md border border-slate-300 bg-slate-200 p-3 shadow-inner">
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    </div>
  );
}
