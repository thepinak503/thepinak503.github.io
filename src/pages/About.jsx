import React from 'react'

const skills = [
  'HTML', 'CSS', 'JavaScript', 'Python', 'C++', 'Java', 'Linux', 'Git'
]

const timeline = [
  {
    time: '2023–Present',
    event: 'Building modern web apps and OS tooling as a student developer.'
  },
  {
    time: '2021–2023',
    event: 'Deep dive into C++, Python, and Java fundamentals and projects.'
  },
  {
    time: '2019–2021',
    event: 'Linux adoption and self-hosted experiments.'
  }
]

const education = [
  { title: 'B.E. Computer Engineering', status: 'In progress' },
  { title: 'Certifications', details: 'Linux Essentials, Git & GitHub, Web Performance' }
]

function About() {
  return (
    <>
      <section id="about" aria-labelledby="about-heading">
        <h2 id="about-heading">About Me</h2>
        <div className="about-grid">
          <p>
            I am a Windows and Linux enthusiast, an aspiring computer engineer, and a proficient 
            coder in C++, Python, and Java. I enjoy building for the web and exploring new technologies.
          </p>
          <ul className="skills" aria-label="Skills">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="timeline" aria-labelledby="timeline-heading">
        <h2 id="timeline-heading">Journey</h2>
        <ol className="timeline">
          {timeline.map((item, index) => (
            <li key={index}>
              <div className="time">{item.time}</div>
              <div className="event">{item.event}</div>
            </li>
          ))}
        </ol>
      </section>

      <section id="education" aria-labelledby="education-heading">
        <h2 id="education-heading">Education & Certifications</h2>
        <ul className="edu-list">
          {education.map((edu, index) => (
            <li key={index}>
              <strong>{edu.title}</strong> — {edu.details || edu.status}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default About
