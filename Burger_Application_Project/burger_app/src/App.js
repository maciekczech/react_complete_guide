import React from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/' component={BurgerBuilder}/>
        </Switch>
{/*         <BurgerBuilder/>
        <Checkout></Checkout> */}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
