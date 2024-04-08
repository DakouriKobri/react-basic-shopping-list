// NPM Packages
import { useState } from 'react';

// Project Imports
import './App.css';
import groceryCartImage from './assets/grocery-cart.png';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [shoppingItems, setShoppingItems] = useState([]);

  function handleOnchange(event) {
    setInputValue(event.target.value);
  }

  function handleAddShoppingItem(event) {
    if (event.key === 'Enter' && inputValue) {
      const newItem = {
        name: inputValue,
        quantity: 1,
        complete: false,
      };

      setShoppingItems([...shoppingItems, newItem]);
      setInputValue('');
    }
  }

  return (
    <main className="App">
      <div>
        <div>
          <h4 className="success">You&apos;re done</h4>

          <div className="header">
            <h1>Shopping List</h1>
            <img src={groceryCartImage} alt="Abstract grocery cart" />
            <input
              type="text"
              placeholder="Add an Item"
              className="item-input"
              value={inputValue}
              onChange={handleOnchange}
              onKeyDown={handleAddShoppingItem}
            />
          </div>
        </div>

        <ul>
          <li className="item">
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
