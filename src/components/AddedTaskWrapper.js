import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../actions/taskaction";
import AddedTask from "./AddedTask";

function AddedTaskWrapper() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTasks());
  }, []);
  let { tasks, addNewTask } = useSelector((state) => state);
  if (tasks === null && addNewTask === true) {
    return <></>;
  }

  if (tasks === null) {
    return <p className="Notask">Currently there is no tasks ! Please add !</p>;
  }

  return (
    <div className="addedTasksArea">
      {tasks.length > 0 ? (
        tasks.map((task) => <AddedTask key={task.id} task={task} />)
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default AddedTaskWrapper;
