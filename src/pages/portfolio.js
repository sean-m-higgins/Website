import React from 'react'
import Layout from '../components/layout'
import Section from '../components/psection'
import '../styles/portfolio.css'

const Portfolio = () => {
  return (
    <div>
      <Layout>
        <div>
          <div className="portfolioTitle">Portfolio</div>
          <div className="portfolioSub">Encompassing my previous experiences.</div>
        </div>
        <div className="work">
          <h1 className="title">Work Experience</h1>
          <Section title='Software Systems Laboratory, Loyola University Chicago' middle="Research Assistant | December 2018-Present" body="Presented in weekly team meetings discussing our project, a scholarly note-taking service utilizing Google APIs. Researched ML/DL and Multi-label Classification on text analysis to create auto-labels from a small dataset. Partnered with a mentor to work 1-on-1 via paired programming to develop Machine Learning (ML) algorithms." link="/portfolio"/>
          <Section title="TransUnion" middle="Salesforce Project Management Intern | May-December 2018" body="Lead the Sales Automation team in preparing and executing the company-wide transition to Salesforce Lightning. Developed the skills of a Salesforce Admin learning over 45 Trailhead badges and specific TU standard procedures. Contributed in team decisions on creating, updating, or fixing automation in Salesforce for 2500+ global users. Designed a process of prioritization for the team’s cases, reducing and resolving the backlog of user requests." link="/portfolio"/>
          <Section title="Rambler Investment Fund, Quinlan School of Business" middle="Junior Analyst | January-May 2018" body="Selected to be a  junior analyst in a student managed multi-strategy global macro fund with an AUM of  ~$1,000,000. Pitched ABBV to investors after a semester of research and analysis concluding with a complete equity report." link="/portfolio"/>
          <Section title="Institute for Environmental Sustainability, Loyola University Chicago" middle="Consulting Intern | January-May 2019" body="Reported on the current waste management systems of Chicago and Berlin with comparative PESTEL analyses. Developed expertise on waste management practices, and provided an alternate solution to the current crisis." link="/portfolio"/>
          <Section title="Undergraduate Admissions Office" middle="Student Ambassador | September 2016-May 2018" body="Guided 90 minute tours of both campuses 5 times a week to inform prospective students about the university. Mentored 5-10 seniors via weekly emails, open houses, and special events to help make their college transition easier." link="/portfolio"/>
        </div>
        <div className="edu">
          <h1 className="title">Education</h1>
          <Section title="Loyola University Chicago" middle="B.S. Computer Science | August 2016-December 2019, M.S. Software Engineering | January 2020-December 2020" body="CUM GPA = 3.55/4.0 | Organizations: Leadership Community, Emerging Leaders Program, Club Tennis, Golden Key International Honors Society, Moot Court, Rambler Investment Fund, Student Ambassador, Future Wolfpack, Delta Sigma Phi, Don't Panic, Software Systems Laboratory" link="/portfolio"/>
          <Section title="De Smet Jesuit High School" middle="High School Diploma | August 2012-May 2016" body="Awards: President's Medal, Pedro Arrupe Service Award" link="/portfolio"/>
        </div>
        <div className="project">
          <h1 className="title">Projects</h1>
          <Section title="ZettelGiestG" middle="Software Systems Laboratory | Spring 2019" body="ZettelGeist is a plaintext note-taking system, inspired by the ZettelKasten Method, which emphasizes one idea per note card. SSL is working to integrate Zettelgeist with the Google Suite of tools to support collaborative research and scholarship." link="/portfolio"/>
          <Section title="Eagle Scout Project" middle="Boy Scouts of America | Fall 2016" body="Spent 500+ hours leading others in building an ADA approved portable wheelchair ramp for Ride on St. Louis." link="/eagle"/>
        </div>
      </Layout>
    </div>
  )
}

export default Portfolio