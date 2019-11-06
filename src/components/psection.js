import React, { Component } from "react";
import { Link } from 'gatsby'
import '../styles/section.css';


class Section extends Component {
  render() {
    return (
      <div className="titleBox">
        <h2 className="title">{this.props.title}</h2>
        <div className="middleBox">
          <h3 className="middle">{this.props.middle}</h3>
          <div className="bodyBox">
            <h3 className="body">{this.props.body} More... 
              <Link className="link" to={this.props.link}> here</Link>.
            </h3>
          </div>  
        </div>
      </div>
    );
  }
}

export default Section;