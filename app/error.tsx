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
          Ooooops, something went wrong.
        </h1>
        <p>
          Click{" "}
          <span className="text-primary" onClick={() => reset()}>
            here{" "}
          </span>
          to try again;
        </p>
        <p>{error.message}</p>
      </div>
    </div>
  );
}
