export default function Input({
  inputValue,
  handleOnchange,
  handleAddShoppingItem,
}) {
  return (
    <input
      type="text"
      placeholder="Add an Item"
      className="item-input"
      value={inputValue}
      onChange={handleOnchange}
      onKeyDown={handleAddShoppingItem}
    />
  );
}
