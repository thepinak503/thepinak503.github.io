import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main style={{ 
      minHeight: '70vh', 
      display: 'grid', 
      placeItems: 'center', 
      textAlign: 'center', 
      padding: '3rem 5%' 
    }}>
      <div>
        <h1 style={{ 
          fontSize: 'clamp(4rem, 10vw, 6rem)', 
          margin: '0', 
          lineHeight: '1', 
          opacity: '0.3' 
        }}>
          404
        </h1>
        <h2 style={{ 
          fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
          margin: '1rem 0' 
        }}>
          Page not found
        </h2>
        <p className="subtitle" style={{ marginBottom: '2rem' }}>
          Sorry, the page you're looking for can't be found.
        </p>
        <p>
          <Link className="btn btn-primary" to="/">
            Go home
          </Link>
        </p>
      </div>
    </main>
  )
}

export default NotFound
