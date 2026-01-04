"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useReducedMotion } from "./useReducedMotion";

interface WordCyclerProps {
  words: string[];
  finalWord: string;
  /** Delay before starting the animation (ms) */
  startDelay?: number;
  /** Duration each word is displayed (ms) */
  wordDuration?: number;
  /** Final word className for styling */
  finalClassName?: string;
  /** Trigger animation when true */
  isActive?: boolean;
}

export function WordCycler({
  words = [],
  finalWord,
  startDelay = 0,
  wordDuration = 400,
  finalClassName = "",
  isActive = true,
}: WordCyclerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Ensure words is always an array
  const safeWords = Array.isArray(words) ? words : [];
  const allWords = [...safeWords, finalWord];
  const totalWords = allWords.length;

  // Calculate the longest word to set fixed width (prevents layout shift)
  const longestWord = useMemo(() => {
    return allWords.reduce((longest, word) =>
      word.length > longest.length ? word : longest
    , "");
  }, [allWords]);

  const startAnimation = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    setCurrentIndex(0);
  }, [hasStarted]);

  // Handle start delay
  useEffect(() => {
    if (!isActive || hasStarted) return;

    if (prefersReducedMotion) {
      setIsComplete(true);
      setCurrentIndex(totalWords - 1);
      return;
    }

    const timer = setTimeout(startAnimation, startDelay);
    return () => clearTimeout(timer);
  }, [isActive, startDelay, startAnimation, hasStarted, prefersReducedMotion, totalWords]);

  // Cycle through words
  useEffect(() => {
    if (!hasStarted || isComplete || currentIndex < 0) return;

    if (currentIndex >= totalWords - 1) {
      setIsComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, wordDuration);

    return () => clearTimeout(timer);
  }, [currentIndex, hasStarted, isComplete, wordDuration, totalWords]);

  // Reduced motion: show final word immediately
  if (prefersReducedMotion) {
    return <span className={finalClassName}>{finalWord}</span>;
  }

  // Before animation starts - show placeholder with fixed width
  if (currentIndex < 0) {
    return (
      <span
        className="inline-block"
        style={{ minWidth: `${longestWord.length}ch` }}
        aria-hidden="true"
      >
        &nbsp;
      </span>
    );
  }

  const currentWord = allWords[currentIndex] ?? finalWord;
  const isFinal = currentIndex === totalWords - 1;

  // Safety check - if no current word, show final word
  if (!currentWord) {
    return <span className={finalClassName}>{finalWord}</span>;
  }

  return (
    <span
      className="inline-block relative"
      style={{
        minWidth: `${longestWord.length}ch`,
        verticalAlign: "baseline",
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={currentIndex}
          className={`inline-block ${isFinal ? finalClassName : ""}`}
          initial={{
            opacity: 0,
            y: "0.5em",
            filter: "blur(4px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            y: "-0.5em",
            filter: "blur(4px)",
            position: "absolute",
            left: 0,
            top: 0,
          }}
          transition={{
            duration: isFinal ? 0.6 : 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: "inline-block",
          }}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{finalWord}</span>
    </span>
  );
}
