// Project Imports
import './App.css';
import groceryCartImage from './assets/grocery-cart.png';

function App() {
  return (
    <main className="App">
      <div>
        <div>
          <h4 className="success">You&apos;re done</h4>
          <div className="header">Shopping List</div>
          <img src={groceryCartImage} alt="Abstract grocery cart" />
          <input type="text" placeholder="Add an Item" className="item-input" />
        </div>
        <ul>
          <li>
            <div className="container">
              <input type="checkbox" />
              <p>Carrots</p>
            </div>
            <div>
              <button className="remove-button">&times;</button>
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default App;
