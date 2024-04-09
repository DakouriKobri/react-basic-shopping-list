// NPM Packages
import { useCallback, useEffect, useState } from 'react';

// Project Imports
import './App.css';
import Input from './components/Input';
import ShoppingList from './components/ShoppingList';
import groceryCartImage from './assets/grocery-cart.png';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isAllItemsCompleted, setIsAllItemsCompleted] = useState(false);
  const [shoppingItems, setShoppingItems] = useState([]);

  function handleOnchange(event) {
    setInputValue(event.target.value);
  }

  function handleAddShoppingItem(event) {
    if (event.key === 'Enter' && inputValue) {
      const updatedShoppingItems = [...shoppingItems];
      const existingItemIndex = updatedShoppingItems.findIndex(
        (item) => item.name.toLowerCase() === inputValue.toLowerCase()
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

  function clearList() {
    setShoppingItems([]);
  }

  useEffect(() => {
    handleAllItemsIsCompleted();
  }, [handleAllItemsIsCompleted]);

  return (
    <main className="App">
      <div>
        <div>
          {/* {isAllItemsCompleted && <h4 className="success">You&apos;re done</h4>} */}
          <h4 className={isAllItemsCompleted ? 'success' : 'hidden'}>
            You&apos;re done
          </h4>

          <div className="header">
            <h1>Shopping List</h1>
            <img src={groceryCartImage} alt="Abstract grocery cart" />
            <Input
              inputValue={inputValue}
              handleOnchange={handleOnchange}
              handleAddShoppingItem={handleAddShoppingItem}
            />
          </div>
        </div>

        {shoppingItems.length !== 0 && (
          <ShoppingList
            items={shoppingItems}
            onComplete={handleIsCompleted}
            onRemove={handleRemoveItem}
          />
        )}

        {shoppingItems.length > 0 && (
          <div className="btn-container">
            <button type="button" className="btn" onClick={clearList}>
              Clear List
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
