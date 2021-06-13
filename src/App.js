import { useState, useEffect } from "react";
import './App.css';
import Header from './components/Header/Header';
import LandingPage from './components/Landing/Landing';
import SignUpPage from './components/SignUp/SignUp';
import SignInPage from './components/SignIn/SignIn';
import PasswordForgetPage from './components/PasswordForget/PasswordForget';
import AccountPage from './components/Account/Account';
import AdminPage from './components/Admin/Admin';
import { withAuthentication } from './components/Session/Session';
//Importing Pages:
import OrderPage from './pages/OrderPage/OrderPage';
import NewOrderPage from './pages/NewOrderPage/NewOrderPage';
//Import Route from react-router-dom
import { Route, Switch, withRouter } from 'react-router-dom';
//Importing Routes:
import * as ROUTES from './constants/routes';

function App(props) {
  
  //States:
  const [ state, setState ] = useState({
    orders: [{
      date: '6/1/2021',
      product: 'MacBook Pro',
      price: '$1,500',
      //TODO: figure out best way of managing these status and connecting to select
      status: 'For Sale',
    }],
    newOrder: {
      //TODO: set this to a date
      date: '6/1/2021',
      product: '',
      price: '$',
      status: 'Pending',
    },
    editMode: false,
  })

  //Functions:

  /* Effect Function: Anything we need to run on page load goes here */
  useEffect(() => {
    function getAppData() {
      //simple fetch request to our express backend using fetch() web api
      fetch('http://localhost:3001/api/orders')
      .then(res => res.json())
      .then(data => 
        setState(prevState => ({ //set state to the actual data from our backend on page load
          ...prevState,
          orders: data
        }))
      ).catch(err => console.log(err))
    }
    getAppData();
  }, []); //empty dependency array ensures effect funtion only gets called on initial load

  /* onChange function: a setter function allowing us to access previous state and override it with new values */
  function handleChange(e) {
    setState(prevState => ({
      ...prevState,
      newOrder: {
        ...prevState.newOrder,
        //the square brackets allow us to use an expression to "compute the property name"
        [e.target.name]: e.target.value,
      },
    }));
  }
  
  /* addOrder function: adds order to our table from our form */
  async function handleSubmit(e) {
    e.preventDefault();
    if(state.editMode){
      const { _id, date, product, price, status } = state.newOrder;
      try{
        // include _id as url param - note that we're receiving a new skill list as a response
        const orders = await fetch(`http://localhost:3001/api/orders/${_id}`, {
          method: 'PUT',
          //header informs express to parse the incoming json data with express.json()
          headers: {
            'Content-type': 'Application/json'
          },
          body: JSON.stringify({date, product, price, status})
        }).then(res => res.json())
          setState(prevState => ({
            ...prevState,
            orders,
            newOrder: {
              //TODO: set this to a date
              date: '6/1/2021',
              product: '',
              price: '$',
              status: 'Pending',
            },
            editMode: false //set edit mode back to false
          }));
      } catch (error){
        console.log(error);
      }
    } else {
      try {
        console.log(state.newOrder)
        console.log('user id:', props.authUser.uid);
        const order = await fetch('http://localhost:3001/api/orders', {
          method: 'POST',
          //header informs express to parse the incoming json data with express.json()
          headers: {
            'Content-type': 'Application/json'
          },
          body: JSON.stringify(state.newOrder, props.authUser.uid)
        }).then(res => res.json())
          console.log(order)
          setState({
            orders: [...state.orders, order],
            newOrder: {
              //TODO: set this to a date
              date: '6/1/2021',
              product: '',
              price: '$',
              status: 'Pending',
            }
          });
          props.history.push('/home')
      } catch (error){
        console.log(error);
      }
    }
  }

  /* handleEdit function: taking in the edits*/
  function handleEdit(id) {
    const orderToEdit = state.orders.find(order => order._id === id);
    setState(prevState => ({
      ...prevState,
      newOrder: orderToEdit,
      editMode: true,
    }))
  }

  /* handleDelet: Delete order*/
  async function handleDelete(id) {
    try{
      const orders = await fetch(`http://localhost:3001/api/orders/${id}`, {
        method: 'DELETE'
      }).then(res => res.json());
      setState(prevState => ({
        ...prevState,
        orders,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  //Render:
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route 
          exact path='/home' 
          render={() => 
            <OrderPage 
              orders={state.orders} 
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleSubmit={handleSubmit}
              newOrder={state.newOrder}
              handleChange={handleChange}
              editMode={state.editMode}
          />
        } />
        <Route 
          exact path='/new-order' 
          render={(props) => 
            <NewOrderPage 
              {...props}
              orders={state.orders} 
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleSubmit={handleSubmit}
              newOrder={state.newOrder}
              handleChange={handleChange}
              editMode={state.editMode}
              />
          }
        />
        <Route 
          exact path={ROUTES.LANDING} 
          component={LandingPage} 
        />
        <Route 
          path={ROUTES.SIGN_UP} 
          component={SignUpPage} 
        />
        <Route 
          path={ROUTES.SIGN_IN} 
          component={SignInPage} 
        />
        <Route 
          path={ROUTES.PASSWORD_FORGET} 
          component={PasswordForgetPage} 
        />
        <Route 
          path={ROUTES.ACCOUNT} 
          component={AccountPage} 
        />
        <Route 
          path={ROUTES.ADMIN} 
          component={AdminPage} 
        />
      </Switch>
      <footer>
        <p>All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default withAuthentication(withRouter(App));
