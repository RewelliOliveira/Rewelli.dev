"use client"

import * as React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useAnimate, type AnimationOptions } from "motion/react"
import { usePageVisible, usePrefersReducedMotion } from "@/lib/hooks"

type Props = {
  label: string
  swapLabel: string
  suffix?: React.ReactNode
  interval?: number
  reverse?: boolean
  staggerDuration?: number
  ease?: AnimationOptions
  className?: string
  style?: React.CSSProperties
}

const srOnlyStyle: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
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

const letterIndexes = (text: string) =>
  text.split("").flatMap((char, i) => (char === " " ? [] : [i]))

function Letters({
  text,
  prefix,
  restingY,
  suffix,
  style,
  ref,
}: {
  text: string
  prefix: string
  suffix?: React.ReactNode
  restingY: string | number
  style?: React.CSSProperties
  ref?: React.Ref<HTMLSpanElement>
}) {
  const words = text.split(" ").reduce<{ word: string; start: number }[]>(
    (acc, word) => {
      const prev = acc[acc.length - 1]
      acc.push({ word, start: prev ? prev.start + prev.word.length + 1 : 0 })
      return acc
    },
    []
  )

  return (
    <span ref={ref} aria-hidden style={{ display: "block", ...style }}>
      {words.map(({ word, start }, w) => (
        <React.Fragment key={start}>
          {w > 0 && " "}
          <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((letter, j) => (
              <span
                key={j}
                style={slotStyle}
              >
                <motion.span
                  className={`${prefix}-${start + j}`}
                  style={{ display: "inline-block", y: restingY }}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
            {suffix && w === words.length - 1 && (
              <span style={slotStyle}>
                <motion.span
                  className={`${prefix}-suffix`}
                  style={{ display: "inline-block", y: restingY }}
                >
                  {suffix}
                </motion.span>
              </span>
            )}
          </span>
        </React.Fragment>
      ))}
    </span>
  )
}

export function RandomLetterSwap({
  label,
  swapLabel,
  suffix,
  interval = 3000,
  reverse = false,
  staggerDuration = 0.03,
  ease,
  className,
  style,
}: Props) {
  const [scope, animate] = useAnimate()
  const [swapped, setSwapped] = useState(false)
  const [heights, setHeights] = useState<{
    primary: number
    secondary: number
  } | null>(null)
  const primaryRef = useRef<HTMLSpanElement>(null)
  const secondaryRef = useRef<HTMLSpanElement>(null)

  const transition: AnimationOptions = useMemo(
    () => ease ?? { type: "spring", duration: 0.8 },
    [ease]
  )

  const out = reverse ? OFFSET : `-${OFFSET}`
  const incoming = reverse ? `-${OFFSET}` : OFFSET

  useEffect(() => {
    const primary = primaryRef.current
    const secondary = secondaryRef.current
    if (!primary || !secondary) return

    const measure = () =>
      setHeights({
        primary: primary.offsetHeight,
        secondary: secondary.offsetHeight,
      })

    const observer = new ResizeObserver(measure)
    observer.observe(primary)
    observer.observe(secondary)
    return () => observer.disconnect()
  }, [])

  const reduceMotion = usePrefersReducedMotion()
  const pageVisible = usePageVisible()
  const canSwap = !reduceMotion && pageVisible
  const showSwap = swapped && !reduceMotion

  useEffect(() => {
    if (!canSwap) return
    const id = setInterval(() => setSwapped((s) => !s), interval)
    return () => clearInterval(id)
  }, [interval, canSwap])

  const firstRun = useRef(true)
  const hasSuffix = suffix != null

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }

    const run = (
      idxs: number[],
      selector: (idx: number) => string,
      y: string | number
    ) => {
      shuffleArray(idxs).forEach((idx, i) => {
        animate(selector(idx), { y }, { ...transition, delay: i * staggerDuration })
      })
    }

    const runSuffix = (selector: string, count: number, y: string | number) => {
      if (!hasSuffix) return
      animate(selector, { y }, { ...transition, delay: count * staggerDuration })
    }

    const labelIdxs = letterIndexes(label)
    const swapIdxs = letterIndexes(swapLabel)
    run(labelIdxs, (i) => `.letter-${i}`, showSwap ? out : 0)
    run(swapIdxs, (i) => `.letter-secondary-${i}`, showSwap ? 0 : incoming)
    runSuffix(".letter-suffix", labelIdxs.length, showSwap ? out : 0)
    runSuffix(".letter-secondary-suffix", swapIdxs.length, showSwap ? 0 : incoming)
  }, [showSwap, label, swapLabel, hasSuffix, out, incoming, staggerDuration, transition, animate])

  return (
    <motion.span
      ref={scope}
      className={className}
      style={{ display: "block", position: "relative", ...style }}
      initial={false}
      animate={
        heights
          ? { height: showSwap ? heights.secondary : heights.primary }
          : undefined
      }
      transition={{ type: "spring", duration: 0.6, bounce: 0 }}
    >
      <span style={srOnlyStyle}>{label}</span>
      <Letters
        ref={primaryRef}
        text={label}
        prefix="letter"
        restingY={0}
        suffix={suffix}
      />
      <Letters
        ref={secondaryRef}
        text={swapLabel}
        prefix="letter-secondary"
        restingY={incoming}
        suffix={suffix}
        style={{ position: "absolute", top: 0, left: 0, right: 0 }}
      />
    </motion.span>
  )
}
