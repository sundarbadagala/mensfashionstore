import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar/Navbar'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import PaymentForm from './components/Checkout/PaymentForm'
import Details from './components/Details/Details';
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
          <Route path='/checkout'><Checkout/></Route>
          <Route path='/payment'><PaymentForm/></Route>
          <Route path='/details/:id'><Details/></Route>
        </Switch>
    </Router>
    </ProductProvider>
  );
}

export default App;
