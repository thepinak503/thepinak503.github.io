import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetween?: number;
}

export function useTypewriter(options: UseTypewriterOptions) {
  const { words, typeSpeed = 100, deleteSpeed = 50, delayBetween = 2000 } = options;
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];

    if (isWaiting) {
      setIsWaiting(false);
      setIsDeleting(true);
      return;
    }

    if (isDeleting) {
      setText(currentWord.substring(0, text.length - 1));
      if (text.length === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      setText(currentWord.substring(0, text.length + 1));
      if (text === currentWord) {
        setIsWaiting(true);
      }
    }
  }, [text, wordIndex, isDeleting, isWaiting, words]);

  useEffect(() => {
    const timeout = setTimeout(
      tick,
      isWaiting ? delayBetween : isDeleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(timeout);
  }, [tick, isWaiting, isDeleting, delayBetween, deleteSpeed, typeSpeed]);

  return { text, isDeleting };
}
