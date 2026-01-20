import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

export default function SlideUpWordWrapText({
  items = [],
  interval = 2000,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  // Timer functions
  const startTimer = () => {
    if (timerRef.current || items.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, interval);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    if (!items.length) return;
    startTimer();

    const handleVisibility = () =>
      document.hidden ? stopTimer() : startTimer();

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [interval, items.length]);

  useEffect(() => setIndex(0), [items]);

  if (!items.length) return null;

  const activeText = items[index] || "";

  // Split text into words
  const words = useMemo(() => activeText.split(" "), [activeText]);

  // Container animation
  const containerVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.45,
        ease: "easeInOut",
        staggerChildren: 0.05,
      },
    },
    exit: {
      y: "-100%",
      opacity: 0.2,
      transition: {
        duration: 0.45,
        delay: 0.25,
        ease: "easeInOut",
        // staggerChildren: 0.03,
        // staggerDirection: -1,
      },
    },
  };

  // Character animation inside each word
  const charVariants = {
    initial: { opacity: 0, y: 10, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, y: -15, scale: 0.9, transition: { duration: 0.25 } },
  };

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
        lineHeight: "1.3em",
        maxWidth: "100%",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            display: "inline-block",
            whiteSpace: "normal", // allow wrapping
            wordBreak: "break-word",
          }}
        >
          {words.map((word, wIndex) => (
            <span
              key={wIndex}
              style={{ display: "inline-block", marginRight: "0.25em" }}
            >
              {word.split("").map((char, cIndex) => (
                <motion.span
                  key={cIndex}
                  variants={charVariants}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
