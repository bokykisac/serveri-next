"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Unauthorized = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(countdownInterval);
      signOut({ redirect: false }).then(() => {
        router.push("/login");
      });
    }

    return () => clearInterval(countdownInterval);
  }, [countdown, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">
          Your session has expired. You will be redirected to login in{" "}
          {countdown} seconds.
        </h1>
        <p>
          Click{" "}
          <span
            className="text-primary"
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push("/login");
              });
            }}
          >
            here{" "}
          </span>
          to redirect immediately.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
