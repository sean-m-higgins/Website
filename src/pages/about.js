import React from 'react'
import Layout from '../components/layout'
import Section from '../components/asection'
import '../styles/about.css'

const About = () => {
  return (
    <Layout>
      <div>
        <div className="aboutTitle">About Me</div>
        <div className="aboutSub">Just a few areas of interest.</div>
      </div>
      <Section title='Software Engineer' body='After beginning my college career as a Mathematics major, I switched to Computer Science and never looked back! Programming comes natural to me and I find deep satisfaction with the code I create. I have experience in all major areas of computing including front-end, back-end, systems, and machine learning, and my proficient languages including example projects are listed below.' link="/about"/>
      <Section title='Researcher' body='Research is a fundamental area of education, and I have completed my own research in various interdisciplinary subjects. From projects in Finance (equity report and pitch), Law (moot court arguments), Environmental Science (report on waste management systems of Chicago and Berlin), Statistics (opioid epidemic), and most densely Computer Science (machine learning text analysis), I have honed my skills of gathering information and deriving complex analysis from my findings.' link="/about"/>
      <Section title='Photographer' body='Though most of my photos are #shotOnIphone, I enjoy taking and editing photos to publish on my Instagram (linked below). Photography allows me to reminisce and reflect on personal experiences and then transform the image with new meaning. A leisure and a hobby. (The pictures featured on this website were taken by me).' link="/about"/>
      <Section title='Carpenter' body="Since I was a kid, I can remember spending time in my garage with my Dad either fixing or creating something. An activity that I've gained invaluable lessons from has also been a source of great joy. Each summer before my college school year I have created a piece of furniture from scratch to use while at school. Please explore my page filled with my various woodworking projects." link="/carpentry"/>
      <Section title='Eagle Scout' body='The Eagle Scout award is my highest and most cherished achievement that I obtained before the age of 18. My Eagle Project is discussed and linked below. Active in Troop 671 for six years, participating in a wide variety of activities and learning life lessons that propelled me to where I am today.' link="/eagle"/>
    </Layout>
  )
}

export default About