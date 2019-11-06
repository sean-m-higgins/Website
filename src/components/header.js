import React, { Component } from 'react'
import { Link } from 'gatsby'
import NavigationButton from './menuButton'
import NavigationMenu from './menu'
import '../styles/header.css'


class Header extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      visible: !this.state.visible
    });
  }

  handleMouseDown(e) {
    this.toggleMenu();
  }

  render() {
    return (
      <div className="navigation-bar-container">
        <NavigationButton handleMouseDown={this.handleMouseDown} />
        <NavigationMenu handleMouseDown={this.handleMouseDown} menuVisibility={this.state.visible}/>
        <header>
          <h1 className="logo"><Link className="logoLink" to="/App">SH</Link></h1>
        </header>
      </div>
    );
  }
}

export default Header