import React from 'react'
import Layout from '../components/layout'
import Img from "gatsby-image"
import { graphql } from 'gatsby'
import '../styles/eagle.css'


const Eagle = props =>  (
    <Layout>
      	<div>
      		<div>
				<div className="eagleTitle">Eagle Scout Project</div>
				<div className="eagleSub">Portable wheelchair ramp built for Ride on St. Louis</div>
			</div>
      		<div className="aboutDiv">
      			<h1 className="titles">About</h1>
				<div className="storyDiv">
					<h2 className="titles">The Story</h2>
					<div className="aboutInnerDiv">Starting in the Spring of 2014, my Eagle Scout project turned into one of the greatest learning experiences in my life. When I first reached out to Ride on Saint Louis, my impression was that I would be building a cabinet to store horse food, something they were in need of, but when we met in person for the first time, they had a different idea, a wheelchair ramp. My task was to build a portable wheelchair ramp to give the handicapped children they serve the ability to mount a therapeutic horse both outdoors and indoors, in the case of inclement weather. So it was my duty to design a ramp that: fits all American Disability Act's (ADA) guidelines, is safe and long lasting, is able to be moved by a tow hitch, is able to be set up by the least strong volunteers, and is wide enough for both the volunteer and participant.</div>
					<div className="aboutInnerDiv">My process to complete the project included 4 main steps: research and design, acquire materials, build, and deliver. I started by drawing up some sketches of sample ramps that met all the requirements, and then I shared these with engineer family members and other professionals that could offer insight. After nearly 6 redesigns, I decided on a winner. As a part of the design, I compiled a list of each and every piece needed to build the ramp, and then the next step began as I browsed the internet to find my materials. This step also was a lengthy one since I bought the materials at varying locations around St. Louis, some that took weeks to get.</div>
					<div className="aboutInnerDiv">Amid the frustration that came from the redesigns and multiple other roadblocks, the building of the ramp began. I used steel angles for the frame of the ramp, plywood and aluminum sheeting for the deck, 2x4's and fence pipe for the railings, steel rods and tires, screws and bolts, the list goes on. As an Eagle Scout project, I was supposed to get the help of my fellow boy scouts, but when the work consisted of cutting steel angles with a sawzall or welding the angles together, I had to look elsewhere for assistance. Gratefully, I got the help of both my parents, neighbors who are professional welders, extended family members, and even some family friends. Throughout this whole process, my mind was always considering the safety of the ramp; handicapped children would be using this so it of course had to be as safe as possible. This included measuring everything out to the eighth of an inch, working cautiously not to leave any points of possible injury, and double checking the ADA guidelines. When the meat of the work was over, I was able to recruit some scouts to help paint, sand, clean, and finish the ramp. </div>
					<div className="aboutInnerDiv">With the help of my neighbors, we loaded all three parts onto trailers and drove them to Ride on St. Louis in August of 2015. More than a year later. This is one of the greatest learning experiences of my life that I was fortunate enough to do as a 16 year old. Not only was I able to use some trigonometry I learned at school in a practical manner, but this taught me true lessons of what I am able to achieve. I learned how hard and frustrating a complex project can get and how to react when everything goes wrong, over and over. I am extremely proud of myself for staying dedicated to a 15 month project, especially considering the end result. But it means nothing if it weren't for the kids at Ride on St. Louis. They were the lasting motivation that made this possible. At the end of this all, I could not have been more confident of how deserving I was to be an Eagle Scout. </div>
				</div>
			</div>
			<div className="recipientDiv">
      			<h1 className="titles">Recipient 
      				<Img fixed={props.data.rostl.childImageSharp.fixed} className="recipientImage"/>
      			</h1>
				<div className="aboutRec">
					<h2 className="titles">About Us</h2>
					<h3>Sharing Love, Strength, and Joy Since 1998</h3>
					<div className="innerRec">“At Ride On St. Louis we promote health and enrich lives through love, joy, and holistic healing. We are a comprehensive therapy, conditioning, and learning non-profit organization serving adults and children with disabilities, veterans, and youth in and around the St. Louis area. Ride On St. Louis focuses on healing programs that utilize the movement of the horse, as well as horse-human interaction, to provide substantial and sustaining quality of life improvements.</div>
					<div className="innerRec">Ride On St. Louis has the joy and opportunity to witness miracles first hand. Some clients speak their first words on our therapy horses, take their first steps, and make substantial improvements in their first weeks at Ride On St. Louis that surpass years of other activities and/or therapies received.</div> 
					<div className="innerRec">Ride On St. Louis became the first equine-assisted activities and therapies program to operate in the South County area of St. Louis, Missouri. The initial staff consisted of the Founder and Program Director, Marita Wassman, an occupational therapy assistant and several helpers who ran the facility on a volunteer basis for four years. With community support, hard work, and a vision, Ride On St. Louis has become a renown equine-assisted activities and therapies center offering elite services through a knowledge and devoted staff, trained volunteers, and happy, healthy equine partners. “</div>
				</div>
				<div className="aboutRec">
					<h2 className="titles">Our Mission and Values</h2>
					<h3>Serving You, Your Loved Ones & the Community</h3>
					<div className="innerRec">“Promote health and enrich lives through love, joy, & holistic healing.</div>
					<div className="innerRec">Ride On St. Louis was founded in 198 to serve all the greater glory, honor, and love of God. We value the use of prayer and recognize our dependence on God. The center promotes volunteer-ism, the willing spirit of service, the offering of good works and the day of caring and the giving of love with an openness of heart to receive and know God’s Peace and Joy in return. Ride On St. Louis operates in accordance with the highest standards in all relationships with customers, suppliers, environment and the community. We foster a climate that encourages innovation and diligence amongst staff and rewards accordingly. “</div>
				</div>
				<div className="aboutRec">
					<h2 className="titles">Our Services</h2>
					<h3>Changing Lives One "RIDE" at a Time</h3>
					<div className="innerRec">“We work tirelessly to provide quality long-term improvements for each person that comes through our barn doors. Our services are designed to reach each person individually to achieve the greatest results. Our approach to equine-assisted activities and therapies through customized procedures seeks to improve abilities, bolster the activities of daily living and improve functional challenges. “</div>
				</div>
			</div>
			<div className="titleDiv">
      			<h1 className="titles">Gallery</h1>
      			<h3>Pictures from the first to the very last day, featuring many of my supporters along the way.</h3>
	      		<div className='imgGrid'>
			 		<Img fluid={props.data.eagle1.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle2.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle3.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle4.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle5.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle6.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle7.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle8.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle9.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle10.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle11.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle12.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle13.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle14.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle15.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle16.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle17.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle18.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle19.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle20.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle21.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle22.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle23.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle24.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle25.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle26.childImageSharp.fluid} className="newImage"/>
			 		<Img fluid={props.data.eagle27.childImageSharp.fluid} className="newImage"/>
			 	</div>
		 	</div>
 	  	</div>
    </Layout>
)

export const imageQuery = graphql`
  	query {
    	eagle1: file(relativePath: { eq: "eagle1.jpeg" }) {
      		...fluidImage
    	}
    	eagle2: file(relativePath: { eq: "eagle2.jpeg" }) {
      		...fluidImage
    	}
    	eagle3: file(relativePath: { eq: "eagle3.jpeg" }) {
      		...fluidImage
    	}
    	eagle4: file(relativePath: { eq: "eagle4.jpeg" }) {
      		...fluidImage
    	}
    	eagle5: file(relativePath: { eq: "eagle5.jpeg" }) {
      		...fluidImage
    	}
    	eagle6: file(relativePath: { eq: "eagle6.jpeg" }) {
      		...fluidImage
    	}
    	eagle7: file(relativePath: { eq: "eagle7.jpeg" }) {
      		...fluidImage
    	}
    	eagle8: file(relativePath: { eq: "eagle8.jpeg" }) {
      		...fluidImage
    	}
    	eagle9: file(relativePath: { eq: "eagle9.jpeg" }) {
      		...fluidImage
    	}
    	eagle10: file(relativePath: { eq: "eagle10.jpeg" }) {
      		...fluidImage
    	}
    	eagle11: file(relativePath: { eq: "eagle11.jpeg" }) {
      		...fluidImage
    	}
    	eagle12: file(relativePath: { eq: "eagle12.jpeg" }) {
      		...fluidImage
    	}
    	eagle13: file(relativePath: { eq: "eagle13.jpeg" }) {
      		...fluidImage
    	}
    	eagle14: file(relativePath: { eq: "eagle14.jpeg" }) {
      		...fluidImage
    	}
    	eagle15: file(relativePath: { eq: "eagle15.jpeg" }) {
      		...fluidImage
    	}
    	eagle16: file(relativePath: { eq: "eagle16.jpeg" }) {
      		...fluidImage
    	}
    	eagle17: file(relativePath: { eq: "eagle17.jpeg" }) {
      		...fluidImage
    	}
    	eagle18: file(relativePath: { eq: "eagle18.jpeg" }) {
      		...fluidImage
    	}
    	eagle19: file(relativePath: { eq: "eagle19.jpeg" }) {
      		...fluidImage
    	}
    	eagle20: file(relativePath: { eq: "eagle20.jpeg" }) {
      		...fluidImage
    	}
    	eagle21: file(relativePath: { eq: "eagle21.jpeg" }) {
      		...fluidImage
    	}
    	eagle22: file(relativePath: { eq: "eagle22.jpeg" }) {
      		...fluidImage
    	}
    	eagle23: file(relativePath: { eq: "eagle23.jpeg" }) {
      		...fluidImage
    	}
    	eagle24: file(relativePath: { eq: "eagle24.jpeg" }) {
      		...fluidImage
    	}
    	eagle25: file(relativePath: { eq: "eagle25.jpeg" }) {
      		...fluidImage
    	}
    	eagle26: file(relativePath: { eq: "eagle26.jpeg" }) {
      		...fluidImage
    	}
    	eagle27: file(relativePath: { eq: "eagle27.jpeg" }) {
      		...fluidImage
    	}
    	rostl: file(relativePath: { eq: "rostl.jpeg" }) {
      		childImageSharp {
      			fixed(width: 200) {
        			...GatsbyImageSharpFixed
      			}
    		}
    	}
  	}
`;

export const fluidImage = graphql`
  	fragment fluidImage on File {
    	childImageSharp {
      		fluid(maxWidth: 1000) {
        		...GatsbyImageSharpFluid
      		}
    	}
  	}
`;

export default Eagle