import AddedTaskWrapper from "./components/AddedTaskWrapper";
import AddTask from "./components/AddTask";
import TaskHead from "./components/taskHead";
import { useSelector } from "react-redux";

function App() {
  const { addNewTask, error } = useSelector((state) => state);
  return (
    <div className="App">
      {error ? (
        <h1>Error</h1>
      ) : (
        <div className="container">
          <TaskHead />
          {addNewTask ? <AddTask /> : ""}
          <AddedTaskWrapper />
        </div>
      )}
    </div>
  );
}

export default App;
