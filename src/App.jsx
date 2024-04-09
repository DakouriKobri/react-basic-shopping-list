// NPM Packages
import { useCallback, useEffect, useState } from 'react';

// Project Imports
import './App.css';
import groceryCartImage from './assets/grocery-cart.png';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isAllItemsCompleted, setIsAllItemsCompleted] = useState(false);
  const [shoppingItems, setShoppingItems] = useState([]);

  console.log('isAllItemsCompleted:', isAllItemsCompleted);

  function handleOnchange(event) {
    setInputValue(event.target.value);
  }

  function handleAddShoppingItem(event) {
    if (event.key === 'Enter' && inputValue) {
      const updatedShoppingItems = [...shoppingItems];
      const existingItemIndex = updatedShoppingItems.findIndex(
        (item) => item.name === inputValue
      );

      if (existingItemIndex === -1) {
        const newItem = {
          name: inputValue,
          quantity: 1,
          isCompleted: false,
        };

        updatedShoppingItems.push(newItem);
      } else {
        updatedShoppingItems[existingItemIndex].quantity++;
      }

      setShoppingItems(updatedShoppingItems);
      setInputValue('');
    }
  }

  function handleRemoveItem(name) {
    const updatedShoppingItems = [...shoppingItems].filter(
      (item) => item.name !== name
    );

    setShoppingItems(updatedShoppingItems);
  }

  function handleIsCompleted(event, name) {
    const updatedShoppingItems = [...shoppingItems];

    const shoppingItemIndex = updatedShoppingItems.findIndex(
      (item) => item.name === name
    );
    updatedShoppingItems[shoppingItemIndex].isCompleted = event.target.checked;

    setShoppingItems(updatedShoppingItems);
  }

  const handleAllItemsIsCompleted = useCallback(() => {
    if (!shoppingItems.length) {
      return setIsAllItemsCompleted(false);
    }

    const isAllCompleted = !shoppingItems.some(
      (item) => item.isCompleted === false
    );

    setIsAllItemsCompleted(isAllCompleted);
  }, [shoppingItems]);

  useEffect(() => {
    handleAllItemsIsCompleted();
  }, [handleAllItemsIsCompleted]);

  const shoppingList = shoppingItems.map((item, index) => {
    const { name, quantity, isCompleted } = item;

    return (
      <li key={`${index}-${name}`} className="item">
        <div className="container">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(event) => handleIsCompleted(event, name)}
          />
          <p>
            {name} {quantity > 1 && <span> x{quantity}</span>}
          </p>
        </div>

        <div>
          <button
            className="remove-button"
            onClick={() => handleRemoveItem(name)}
          >
            &times;
          </button>
        </div>
      </li>
    );
  });

  return (
    <main className="App">
      <div>
        <div>
          {isAllItemsCompleted && <h4 className="success">You&apos;re done</h4>}

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

        {shoppingItems.length !== 0 && <ul>{shoppingList}</ul>}

        <div className="btn-container">
          <button type="button" className="btn">
            Clear List
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
