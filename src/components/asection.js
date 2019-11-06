import React, { Component } from "react";
import { Link } from 'gatsby'
import '../styles/section.css';


class Section extends Component {
  render() {
    return (
      <div className="outerBox">
        <div className="outerSectionBox">
          <h1 className="title">{this.props.title}</h1>
          <h3 className="body">{this.props.body} More... 
            <Link className="link" to={this.props.link}> here</Link>.
          </h3>
        </div>
      </div>
    );
  }
}

export default Section;