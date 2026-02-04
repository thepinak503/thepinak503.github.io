import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <p>&copy; {currentYear} Pinak Dhabu</p>
      <div className="social" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <a
          href="https://github.com/thepinak503"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5A12 12 0 0 0 0 12.7c0 5.4 3.4 10 8 11.6.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.6-1.4-1.5-1.7-1.5-1.7-1.2-.8.1-.8.1-.8 1.3.1 2 .9 2 .9 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.6-.3-5.4-1.3-5.4-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.4 6 .4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.6-1.6 8-6.2 8-11.6A12 12 0 0 0 12 .5z"/>
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/pinakdhabu2005"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
    </footer>
  )
}

export default Footer
