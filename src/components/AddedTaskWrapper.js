import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../actions/taskaction";
import AddedTask from "./AddedTask";

function AddedTaskWrapper() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTasks());
  }, []);
  let { tasks } = useSelector((state) => state);
  if (!tasks) {
    tasks = [];
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
