import React, { Component } from "react";
import '../styles/section.css';


class Section extends Component {
  render() {
    return (
      <div className="nameBox">
        <h2 className="name">{this.props.name}</h2>
        <h3 className="codeproject">{this.props.project}</h3>
        <h3 className="codeproject">{this.props.project2}</h3>
      </div>
    );
  }
}


export default Section;