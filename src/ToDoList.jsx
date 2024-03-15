import { useState } from "react";

const ToDoList = () => {
  const [lists, setLists] = useState([]);
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput((i) => (i = e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLists((l) => [...l, input]);
    setInput("");
  };

  const handleDelete = (index) => {
    setLists((l) => l.filter((elem, i) => i !== index));
  };

  const handleChecked = (e, i) => {
    let elem = document.getElementById(`task${i}`);
    if (e.target.checked) {
      elem.style.textDecoration = "line-through";
      elem.style.textDecorationColor = "#2563EB";
      elem.style.textDecorationThickness = "2px";
    } else {
      elem.style.textDecoration = "none";
    }
  };

  const moveDown = (i) => {
    if (i < lists.length - 1) {
      let updatedList = [...lists];
      let temp = updatedList[i];
      updatedList[i] = updatedList[i + 1];
      updatedList[i + 1] = temp;
      setLists(updatedList);
    }
  };

  const moveUp = (i) => {
    if (i > 0) {
      let updatedList = [...lists];
      let temp = updatedList[i];
      updatedList[i] = updatedList[i - 1];
      updatedList[i - 1] = temp;
      setLists(updatedList);
    }
  };

  return (
    <div className="bg-black min-h-svh px-1 lg:px-96 md:px-32 py-6">
      <h1 className="text-white text-7xl text-center py-12">
        TO-<span className="text-blue-600">DO</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-3">
          <input
            className="p-2 rounded-sm outline-none"
            type="text"
            value={input}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="border-none bg-blue-600 text-white w-24 p-2 rounded-sm "
          >
            Add
          </button>
        </div>
      </form>
      {lists.length > 0 ? (
        <div className="my-9 border-2 border-white rounded-md p-4">
          {lists.map((list, i) => (
            <div key={i} className="flex justify-between items-center my-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className=" h-4 w-4 text-blue-600 "
                  onChange={(e) => handleChecked(e, i)}
                />
                <p id={`task${i}`} className="text-white text-xl">
                  {list}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => moveUp(i)}>
                  <i className="text-4xl text-white bi bi-arrow-up-square"></i>
                </button>
                <button onClick={() => moveDown(i)}>
                  <i className="text-4xl text-white bi bi-arrow-down-square"></i>
                </button>
                <button
                  className="border-none bg-blue-600 text-white w-24 p-2 rounded-sm"
                  onClick={() => handleDelete(i)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-white text-center text-5xl font-bold mt-14">
          ADD TASKS
        </h1>
      )}
    </div>
  );
};

export default ToDoList;
