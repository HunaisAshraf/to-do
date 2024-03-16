import { useRef, useState } from "react";

const ToDoList = () => {
  const [lists, setLists] = useState([]);
  const [input, setInput] = useState("");

  const validationRef = useRef();
  const checkedRef = useRef();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let taskExists;
    for (let list of lists) {
      if (list.task === input) {
        taskExists = true;
        break;
      }
    }

    if (taskExists) {
      validationRef.current.style.display = "block";
    } else {
      validationRef.current.style.display = "none";
      let data = {
        id: lists.length === 0 ? 1 : lists.length + 1,
        task: input,
        done: false,
      };
      setLists((l) => [...l, data]);
      setInput("");
    }
  };

  const handleDelete = (index) => {
    setLists((l) => l.filter((elem, i) => elem.id !== index));
  };

  const handleChecked = (id) => {
    let tempList = [...lists];

    for (let list of tempList) {
      if (list.id === id) {
        list.done = !list.done;
        break;
      }
    }

    setLists((l) => (l = tempList));
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

  const checkedStyle = {
    textDecoration: "line-through",
    textDecorationColor: "#2563EB",
    textDecorationThickness: "2px",
    wordBreak: "break-word",
  };

  return (
    <div className="bg-black min-h-svh px-1 lg:px-80 md:px-32 py-6 ">
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
        <p
          ref={validationRef}
          style={{ display: "none" }}
          className="text-3xl text-red-600 text-center mt-8"
        >
          Task Exists!!
        </p>
      </form>
      {lists.length > 0 ? (
        <div className="my-9 border-2 border-white rounded-md p-4">
          {lists.map((list, i) => (
            <div
              key={list.id}
              className="flex justify-between items-center my-2 gap-4"
            >
              <div className="flex items-center gap-2 ">
                <input
                  type="checkbox"
                  checked={list.done}
                  className=" h-4 w-4 text-blue-600 "
                  onChange={() => handleChecked(list.id)}
                />
                <p
                  id={`task${i}`}
                  style={list.done ? checkedStyle : { wordBreak: "break-word" }}
                  className="text-white text-xl"
                >
                  {list.task}
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
                  onClick={() => handleDelete(list.id)}
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
