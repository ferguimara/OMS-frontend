import logo from './logo.svg';
import './App.css';
import OrderTable from './components/OrderTable/OrderTable';
import CreateOrderButton from './components/CreateOrderButton/CreateOrderButton';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <OrderTable />
      <CreateOrderButton />
      <footer>
        <p>All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
