import React from 'react'
import Layout from '../components/layout'
import Section from '../components/ssection'
import '../styles/skills.css'
import '../styles/section.css'

const Skills = () => {
  return (
    <div>
      <Layout>
	    <div>
	      <div className="skillsTitle">Skills</div>
	      <div className="skillsSub">My top programming languages and corresponding projects of mine.</div>
	    </div>
        <div className="skillsSection">
          <Section name="Python" project={[<a href='https://github.com/sean-m-higgins/ZTextMiningPy'> Machine Learning Keyword Extractor </a>]} project2=""/>
        	<Section name="Java" project={[<a href='https://github.com/sean-m-higgins/OSParity'>OS Parity</a>]} project2={[<a href="https://github.com/sean-m-higgins/TextFileWordCounter/tree/master/Java">Word Counter</a>]}/>
        	<Section name="Swift" project={[<a href="https://github.com/sean-m-higgins/iOS-Apps">Basic apps</a>]} project2=""/>
        	<Section name="Scala" project={[<a href="https://github.com/sean-m-higgins/TextFileWordCounter/tree/master/Scala">Word Counter</a>]} project2={[<a href="https://github.com/sean-m-higgins/ZTextMiningScala">Text Pre-processing</a>]}/>
        	<Section name="HTML5, CSS3, React" project={[<a href="https://github.com/sean-m-higgins/Website">Personal Website</a>]} project2=""/>
        	<Section name="C++" project={[<a href="##" target="_blank">OS Parity</a>]} project2={[<a href="##">Cached and Bounded Buffer</a>]}/>
        </div>
      </Layout>
    </div>
  )
}

export default Skills