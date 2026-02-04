import React, { useState, useEffect } from 'react'

const DEFAULT_PROJECTS = [
  {
    id: 'p1',
    name: 'Project 1',
    desc: 'A brief description of the first project highlighting goals and outcomes.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    live: '#',
    code: '#'
  },
  {
    id: 'p2',
    name: 'Project 2',
    desc: 'A concise summary of the second project with a focus on impact.',
    tech: ['Python', 'Flask'],
    live: '#',
    code: '#'
  },
  {
    id: 'p3',
    name: 'Project 3',
    desc: 'A short overview of the third project and its key features.',
    tech: ['Java', 'Spring Boot'],
    live: '#',
    code: '#'
  }
]

function Projects() {
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [likes, setLikes] = useState(() => {
    try {
      const stored = localStorage.getItem('pd_likes')
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('pd_likes', JSON.stringify(likes))
    } catch {}
  }, [likes])

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = DEFAULT_PROJECTS.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tech.join(' ').toLowerCase().includes(q)
    )
    if (sortBy === 'likes') {
      list = list.sort((a, b) => (likes[b.id] || 0) - (likes[a.id] || 0))
    } else {
      list = list.sort((a, b) => a.name.localeCompare(b.name))
    }
    return list
  }, [query, sortBy, likes])

  const toggleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }))
  }

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading">Projects</h2>
      
      <div className="projects-controls">
        <input
          type="search"
          placeholder="Search projects…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search projects"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort projects"
        >
          <option value="name">Sort: Name</option>
          <option value="likes">Sort: Likes</option>
        </select>
        <span aria-live="polite">{filtered.length} shown</span>
      </div>

      <div className="project-gallery">
        {filtered.map((project) => (
          <div className="project-card" key={project.id}>
            <div className="project-card__body">
              <h3>{project.name}</h3>
              <p>{project.desc}</p>
              <p className="tech">{project.tech.join(' · ')}</p>
            </div>
            <div className="project-card__actions">
              <a
                href={project.live}
                className="btn btn-primary btn-sm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.name}`}
              >
                Live
              </a>
              <a
                href={project.code}
                className="btn btn-secondary btn-sm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View code for ${project.name}`}
              >
                Code
              </a>
              <button
                className="like-btn"
                type="button"
                onClick={() => toggleLike(project.id)}
                aria-pressed={false}
              >
                ❤ {likes[project.id] || 0}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
