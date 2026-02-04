import React, { useEffect, useState } from 'react'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import cpp from 'highlight.js/lib/languages/cpp'
import java from 'highlight.js/lib/languages/java'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('java', java)

const techCards = [
  {
    icon: '🐧',
    title: 'Linux Commands',
    language: 'bash',
    code: `# Find all files modified in the last 24 hours
find . -mtime -1`
  },
  {
    icon: '⚙️',
    title: 'C++ Logic',
    language: 'cpp',
    code: `// Simple factorial function
int factorial(int n) {
    return (n == 1 || n == 0) ? 1 : n * factorial(n - 1);
}`
  },
  {
    icon: '📚',
    title: 'Java Libraries',
    language: 'java',
    code: `// Using Apache Commons Lang
import org.apache.commons.lang3.StringUtils;

StringUtils.isNotBlank("Hello, World!"); // true`
  },
  {
    icon: '😂',
    title: 'Just for Laughs',
    content: 'Why do programmers prefer dark mode? Because light attracts bugs!'
  }
]

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="code-block-wrapper">
      <button
        className={`copy-btn ${copied ? 'copied' : ''}`}
        onClick={handleCopy}
        aria-label={copied ? 'Copied!' : 'Copy code'}
        title={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Copied!</span>
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy</span>
          </>
        )}
      </button>
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}

function TechZone() {
  useEffect(() => {
    hljs.highlightAll()
  }, [])

  return (
    <section id="tech-zone" aria-labelledby="tech-zone-heading">
      <h2 id="tech-zone-heading">🚀 Tech Zone</h2>
      <div className="tech-grid">
        {techCards.map((card, index) => (
          <div className="tech-card" key={index}>
            <h3>{card.icon} {card.title}</h3>
            {card.code ? (
              <CodeBlock code={card.code} language={card.language} />
            ) : (
              <p>{card.content}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default TechZone
