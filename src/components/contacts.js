import React, { Component } from "react";
import '../styles/contact.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"


class ContactList extends Component {
  render() {
    return (
      <div className="outerBox">
      <div className="contactBox">
        <ul>
          <li className="listItem">
            <a href="https://github.com/sean-m-higgins"><FontAwesomeIcon icon = { faGithub } className ="socialIcons" /></a>
          </li>
          <li className="listItem">
            <a href="https://www.linkedin.com/in/sean-m-higgins20/"><FontAwesomeIcon icon = { faLinkedin } className ="socialIcons" /></a>
          </li>
          <li className="listItem">
            <a href="mailto:shiggins@luc.edu?subject=Person Website Inquiry"><FontAwesomeIcon icon = { faEnvelope } className ="socialIcons" /></a>
          </li>
          <li className="listItem">
            <a href="https://www.instagram.com/hazy.lens/"><FontAwesomeIcon icon = { faInstagram } className ="socialIcons" /></a>
          </li>
        </ul>
      </div>
      </div>
    );
  }
}

export default ContactList;