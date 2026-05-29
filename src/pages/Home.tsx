import { lazy } from 'react'

const Hero = lazy(() => import('../components/Hero'))
const Skills = lazy(() => import('../components/Skills'))
const Experience = lazy(() => import('../components/Experience'))

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Experience />
    </>
  )
}
