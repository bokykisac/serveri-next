"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

const Unauthorized = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(countdownInterval);
      signOut({ redirect: false }).then(() => {
        window.location.href = "/login";
      });
    }

    return () => clearInterval(countdownInterval);
  }, [countdown]);

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
            className="cursor-pointer text-primary hover:opacity-75"
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                window.location.href = "/login";
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
