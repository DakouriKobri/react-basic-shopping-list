export default function ShoppingList({ items, onComplete, onRemove }) {
  const shoppingList = items.map((item, index) => {
    const { name, quantity, isCompleted } = item;

    return (
      <li key={`${index}-${name}`} className="item">
        <div className="container">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(event) => onComplete(event, name)}
          />
          <p>
            {name} {quantity > 1 && <span> x{quantity}</span>}
          </p>
        </div>

        <div>
          <button className="remove-button" onClick={() => onRemove(name)}>
            &times;
          </button>
        </div>
      </li>
    );
  });

  return <ul>{shoppingList}</ul>;
}
