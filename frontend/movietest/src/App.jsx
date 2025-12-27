import React, { Fragment } from 'react';
import { Hero, Header, Contact, Footer, Favorites } from './components';
import './styles/App.css';
import './styles/Responsive.css';

function App() {
  return (
    <Fragment>
      <Header />
      <Hero />
      <Favorites />
      <Contact />
      <Footer />
    </Fragment>
  );
}

export default App;
