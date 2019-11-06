import React, { Component} from "react";
import Layout from '../components/layout';
import ContactList from '../components/contacts';
import {hot} from "react-hot-loader";
import { Helmet } from 'react-helmet';

import "../styles/App.css"; 

class App extends Component{
  render(){
    return(
      <div className="App">
      	<Helmet>
          <meta charSet="utf-8"/>
          <title>SMH | Sean Higgins</title>
      	</Helmet>
      	<Layout>
          <h1 className='spacer'> </h1>
          <ContactList>
          </ContactList>
        </Layout>
      </div>
    );
  }
}

export default hot(module) (App);
