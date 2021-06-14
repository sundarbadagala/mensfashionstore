import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar/Navbar'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import PaymentForm from './components/Checkout/PaymentForm'
import {ProductProvider} from './components/contextAPI'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


function App() {
  return (
    <ProductProvider>
    <Router>
        <Navbar/>
        <Switch>
          <Route exact path='/'><Products/></Route>
          <Route path='/cart'><Cart/></Route>
          <Router path='/checkout'><Checkout/></Router>
          <Router path='/payment'><PaymentForm/></Router>
        </Switch>
    </Router>
    </ProductProvider>
  );
}

export default App;
