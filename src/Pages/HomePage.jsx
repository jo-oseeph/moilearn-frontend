import React from 'react' 
import Hero from '../components/Hero' 
// import LatestUploads from '../components/LatestUploads'
import HowItWorks from '../components/HowItWorks'
// import FeaturesSection from '../components/FeaturesSection'
import StatsSection from '../components/StatsSection' 
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'



export const HomePage = () => {
  return (
    <div>                                                                                                                               
        <Hero/>
        <StatsSection/>
        <HowItWorks/> 
        {/* <LatestUploads/> */}
        {/* <FeaturesSection/>  */}
        <CTASection/>
        <Footer/>

    </div>
  )
}
