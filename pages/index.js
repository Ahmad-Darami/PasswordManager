import Hero from "@/components/LandingPage/Landing"
import { styled } from 'styled-components'
import Navbar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
export default function Home() {
  return (
    <>
        <Navbar/>
        <Hero />
        <Footer />
    </>
  )
}
