import React, { useEffect, useState } from "react";

export const RotatingText = ({
  texts = [],
  duration = 2000,
  animation = "fade", // "fade" | "slide" | "flip" | "scale"
  className = "",
  pauseOnHover = false,
}) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (pauseOnHover && paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, duration);
    return () => clearInterval(interval);
  }, [duration, texts.length, paused, pauseOnHover]);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      {texts.map((t, i) => (
        <span
          key={i}
          className={`absolute left-0 top-0 transition-all duration-700 ${
            i === index
              ? "opacity-100 translate-y-0"
              : animation === "slide"
              ? "opacity-0 translate-y-4"
              : "opacity-0"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );
};
