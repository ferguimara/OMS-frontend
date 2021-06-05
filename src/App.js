import { useState, useEffect } from "react";
import './App.css';
import OrderTable from './components/OrderTable/OrderTable';
import CreateOrderButton from './components/CreateOrderButton/CreateOrderButton';
import Header from './components/Header/Header';

function App() {
  
  //States:
  const [ state, setState ] = useState({
    orders: [{
      date: '6/1/2021',
      product: 'MacBook Pro',
      price: '$1,500',
      //TODO: figure out best way of managing these status and connecting to select
      status: 'forSale',
    }],
    newOrder: {
      //TODO: set this to a date
      date: '6/1/2021',
      product: '',
      price: '$',
      status: 'pending',
    }
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
    setState((prevState) => ({
      ...prevState,
      newOrder: {
        ...prevState.newOrder,
        //the square brackets allow us to use an expression to "compute the property name"
        [e.target.name]: e.target.value,
      }
    }))
  }
  
  /* addOrder function: adds order to our table from our form */
  async function handleSubmit(e) {
    e.preventDefault();
    try{
      const order = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        //header informs express to parse the incoming json data with express.json()
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify(state.newOrder)
      }).then(res => res.json())
        setState({
          orders: [...state.orders, state.newOrder],
          newOrder: {
            //TODO: set this to a date
            date: '6/1/2021',
            product: '',
            price: '$',
            status: 'pending',
          }
        });
    } catch (error){
      console.log(error);
    }
  }

  //Render:
  return (
    <div className="App">
      <Header/>
      <OrderTable orders={state.orders}/>
      <CreateOrderButton />
      <h2>Create Order Below:</h2>
      <form className='createOrderForm' onSubmit={handleSubmit}>
        <label>
          <span>Date</span>
          <input name="date" value={state.newOrder.date} onChange={handleChange}/>
        </label>
        <label>
          <span>Product</span>
          <input name="product" value={state.newOrder.product} onChange={handleChange}/>
        </label>
        <label>
          <span>Price</span>
          <input name="price" value={state.newOrder.price} onChange={handleChange}/>
        </label>
        <label>
          <span>Status</span>
          <select name="status" value={state.newOrder.status} onChange={handleChange}>
            <option value="forSale">For Sale</option>
            <option value="outOfStock">Out of Stock</option>
            <option value="pending">Pending</option>
          </select>
        </label>
        <button>Submit Order</button>
        
      </form>
      <footer>
        <p>All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
