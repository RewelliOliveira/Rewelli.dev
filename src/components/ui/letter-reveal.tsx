"use client"

import * as React from "react"
import { useEffect } from "react"
import { motion, useAnimate, type AnimationOptions } from "motion/react"

type Props = {
  text: string
  delay?: number
  staggerDuration?: number
  ease?: AnimationOptions
  className?: string
}

const OFFSET = "120%"

const slotStyle: React.CSSProperties = {
  display: "inline-block",
  overflow: "hidden",
  verticalAlign: "top",
  paddingBottom: "0.15em",
  marginBottom: "-0.15em",
}

const shuffleArray = (arr: number[]): number[] => {
  const a = [...arr]
  a.sort(() => Math.random() - 0.5)
  return a
}

export function LetterReveal({
  text,
  delay = 0,
  staggerDuration = 0.03,
  ease = { type: "spring", duration: 0.8 },
  className,
}: Props) {
  const [scope, animate] = useAnimate<HTMLSpanElement>()

  useEffect(() => {
    const letters = Array.from(scope.current.querySelectorAll<HTMLElement>("[data-letter]"))
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      letters.forEach((letter) => (letter.style.transform = "none"))
      return
    }
    shuffleArray(letters.map((_, i) => i)).forEach((idx, i) => {
      animate(letters[idx], { y: 0 }, { ...ease, delay: delay + i * staggerDuration })
    })
    // Monta uma única vez, ao carregar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const words = text.split(" ")

  return (
    <span ref={scope} className={className} style={{ display: "block" }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, w) => (
          <React.Fragment key={w}>
            {w > 0 && " "}
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {word.split("").map((letter, j) => (
                <span key={j} style={slotStyle}>
                  <motion.span data-letter style={{ display: "inline-block", y: OFFSET }}>
                    {letter}
                  </motion.span>
                </span>
              ))}
            </span>
          </React.Fragment>
        ))}
      </span>
    </span>
  )
}
