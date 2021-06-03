import { useState, useEffect } from "react";
import './App.css';
import OrderTable from './components/OrderTable/OrderTable';
import CreateOrderButton from './components/CreateOrderButton/CreateOrderButton';
import Header from './components/Header/Header';

function App() {
  
  //states:
  const [ state, setState ] = useState({
    orders: [{
      date: '6/1/2021',
      product: 'MacBook Pro',
      price: '$1,500',
      status: 'For Sale',
    }],
    newOrder: {
      //TODO: set this to a date
      date: '6/1/2021',
      product: '',
      price: '$',
      status: 'pending',
    }
  })

  //functions:

  //onChange function: a setter function allowing us to access previous state and override it with new values
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
  
  //addOrder function: adds order to our table from our form
  function addOrder(e) {
    e.preventDefault();
    setState({
      orders: [...state.orders, state.newOrder],
      newOrder: {
        //TODO: set this to a date
        date: '6/1/2021',
        product: '',
        price: '$',
        status: 'pending',
      }
    })
  }

  //render:
  return (
    <div className="App">
      <Header/>
      <OrderTable orders={state.orders}/>
      <CreateOrderButton />
      <h2>Create Order Below:</h2>
      <form className='createOrderForm' onSubmit={addOrder}>
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
