import React from 'react'
import Layout from '../components/layout'
import Img from "gatsby-image"
import { graphql } from 'gatsby'
import '../styles/carpentry.css'


const Carpentry = props =>  (
    <Layout>
      	<div>
          <div>
            <div className="carpentryTitle">Woodworking Projects</div>
            <div className="carpentrySub">One piece of furniture for each year of university.</div>
          </div>
      		<div className="aboutDiv">
      			<h1 id="titles">About</h1>
					<div>
						<h2>Starting before my freshman year at Loyola, I decided to put my woodworking skills to work during my summer break. Of course my freshman dorm was only big enough to fit one small side table, but as the years progressed, so did the size of my bedrooms. I wanted to make a bit of tradition out of it, so I continued to make one piece of furniture each summer and now I have an apartment full of my own hand-crafted decor. </h2>
					</div>
			</div>
			<div className="titleDiv">
      			<h1 id="titles">Coffee Table</h1>
					<div>
						<h2>With a glass centered top, this dual-level coffee table will be the centerpiece of my living room for my senior year.</h2>
					</div>
			</div>
      		<div className='imgGrid'>
		 		<Img fluid={props.data.coffeeOne.childImageSharp.fluid} className="newImage"/>
		 		<Img fluid={props.data.coffeeTwo.childImageSharp.fluid} className="newImage"/>
		 		<Img fluid={props.data.coffeeThree.childImageSharp.fluid} className="newImage"/>
		 		<Img fluid={props.data.coffeeFour.childImageSharp.fluid} className="newImage"/>
		 		<Img fluid={props.data.coffeeFive.childImageSharp.fluid} className="newImage"/>
		 		<Img fluid={props.data.coffeeSix.childImageSharp.fluid} className="newImage"/>
 			</div>
 			<div className="titleDiv">
      			<h1 id="titles">Work Desk</h1>
					<div>
						<h2>My junior year I moved into my first apartment and brought a desk big enough for my computer, speakers, and of course books</h2>
					</div>
			</div>
 			<div className='imgGrid'>
		 		<Img fluid={props.data.deskOne.childImageSharp.fluid} className="newImage"/>
		 		<Img fluid={props.data.deskTwo.childImageSharp.fluid} className="newImage"/>
		 		<Img fluid={props.data.deskThree.childImageSharp.fluid} className="newImage"/>
 			</div>
 			<div className="titleDiv">
      			<h1 id="titles">Shoe Rack</h1>
					<div>
						<h2>Using zipper jointed legs, this seven-shelved shoe rack holds all my shoes and doubles as a tie holder on its left side.</h2>
					</div>
			</div>
 			<div className='imgGrid'>
		 		<Img fluid={props.data.shoeOne.childImageSharp.fluid} className="newImage"/>
		 		<Img fluid={props.data.shoeTwo.childImageSharp.fluid} className="newImage"/>
		 		<Img fluid={props.data.shoeThree.childImageSharp.fluid} className="newImage"/>
 			</div>
 			<div className="titleDiv">
      			<h1 id="titles">Side Table</h1>
					<div>
						<h2>This side table is a detachable set of piped legs supporting a crate on top.</h2>
					</div>
			</div>
 			<div className='imgGrid'>
		 		<Img fluid={props.data.sideOne.childImageSharp.fluid} className="newImage"/>
		 		<Img fluid={props.data.sideTwo.childImageSharp.fluid} className="newImage"/>
		 		<Img fluid={props.data.sideThree.childImageSharp.fluid} className="newImage"/>
		 		<Img fluid={props.data.sideFour.childImageSharp.fluid} className="newImage"/>
		 		<Img fluid={props.data.sideFive.childImageSharp.fluid} className="newImage"/>
		 		<Img fluid={props.data.sideSix.childImageSharp.fluid} className="newImage"/>
 			</div>
 	  	</div>
    </Layout>
)

export const imageQuery = graphql`
  	query {
    	coffeeOne: file(relativePath: { eq: "coffee1.jpeg" }) {
      		...fluidImage
    	}
    	coffeeTwo: file(relativePath: { eq: "coffee2.jpeg" }) {
      		...fluidImage
    	}
    	coffeeThree: file(relativePath: { eq: "coffee3.jpeg" }) {
      		...fluidImage
    	}
    	coffeeFour: file(relativePath: { eq: "coffee4.jpeg" }) {
      		...fluidImage
    	}
    	coffeeFive: file(relativePath: { eq: "coffee5.jpeg" }) {
      		...fluidImage
    	}
    	coffeeSix: file(relativePath: { eq: "coffee6.jpeg" }) {
      		...fluidImage
    	}
    	deskOne: file(relativePath: { eq: "desk1.jpeg" }) {
      		...fluidImage
    	}
    	deskTwo: file(relativePath: { eq: "desk2.jpeg" }) {
      		...fluidImage
    	}
    	deskThree: file(relativePath: { eq: "desk3.jpeg" }) {
      		...fluidImage
    	}
    	shoeOne: file(relativePath: { eq: "shoe1.jpeg" }) {
      		...fluidImage
    	}
    	shoeTwo: file(relativePath: { eq: "shoe2.jpeg" }) {
      		...fluidImage
    	}
    	shoeThree: file(relativePath: { eq: "shoe3.jpeg" }) {
      		...fluidImage
    	}
    	sideOne: file(relativePath: { eq: "side1.jpeg" }) {
      		...fluidImage
    	}
    	sideTwo: file(relativePath: { eq: "side2.jpeg" }) {
      		...fluidImage
    	}
    	sideThree: file(relativePath: { eq: "side3.jpeg" }) {
      		...fluidImage
    	}
    	sideFour: file(relativePath: { eq: "side4.jpeg" }) {
      		...fluidImage
    	}
    	sideFive: file(relativePath: { eq: "side5.jpeg" }) {
      		...fluidImage
    	}
    	sideSix: file(relativePath: { eq: "side6.jpeg" }) {
      		...fluidImage
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

export default Carpentry