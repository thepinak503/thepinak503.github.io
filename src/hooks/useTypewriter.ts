import { useEffect, useState, useCallback } from 'react'

interface UseTypewriterOptions {
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  delayBetween?: number
}

export function useTypewriter({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetween = 2000,
}: UseTypewriterOptions) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  const tick = useCallback(() => {
    const currentWord = words[wordIndex % words.length]

    if (isWaiting) return

    if (!isDeleting) {
      setText(currentWord.slice(0, text.length + 1))
      if (text.length + 1 >= currentWord.length) {
        setIsWaiting(true)
        setTimeout(() => {
          setIsWaiting(false)
          setIsDeleting(true)
        }, delayBetween)
      }
    } else {
      setText(currentWord.slice(0, text.length - 1))
      if (text.length - 1 <= 0) {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    }
  }, [text, wordIndex, isDeleting, isWaiting, words, delayBetween])

  useEffect(() => {
    const speed = isWaiting ? delayBetween : isDeleting ? deleteSpeed : typeSpeed
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, isWaiting, isDeleting, typeSpeed, deleteSpeed, delayBetween])

  return text
}
