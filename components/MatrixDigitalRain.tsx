"use client";

import clsx from "clsx";
import { type ReactNode, useEffect, useRef } from "react";

const LETTERS =
  "ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ".split(
    ""
  );

interface MatrixDigitalRainProps {
  children?: ReactNode;
  fontSize?: number;
  blur?: boolean;
}

const MatrixDigitalRain = ({
  children,
  fontSize = 12,
  blur,
}: MatrixDigitalRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / fontSize);
    const drops: Array<number> = new Array(columns).fill(1);

    const makeItRain = () => {
      ctx.fillStyle = "rgba(235, 235, 235, .1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const text = LETTERS[Math.floor(Math.random() * LETTERS.length)];
        ctx.fillStyle = "#d60b52";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    };

    const interval = setInterval(makeItRain, 33);

    return () => clearInterval(interval);
  }, []);

  const canvasClasses = clsx("absolute top-0 left-0 z-0", blur && "blur-xs");

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-0 left-0 z-50">{children}</div>
      <canvas className={canvasClasses} ref={canvasRef} />
    </div>
  );
};

export default MatrixDigitalRain;
