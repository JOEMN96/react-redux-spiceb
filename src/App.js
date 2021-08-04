import AddedTaskWrapper from "./components/AddedTaskWrapper";
import AddTask from "./components/AddTask";
import TaskHead from "./components/taskHead";
import { useSelector } from "react-redux";

function App() {
  const { addNewTask } = useSelector((state) => state);
  console.log(addNewTask);
  return (
    <div className="App">
      <div className="container">
        <TaskHead />
        {addNewTask ? <AddTask /> : ""}
        <AddedTaskWrapper />
      </div>
    </div>
  );
}

export default App;
