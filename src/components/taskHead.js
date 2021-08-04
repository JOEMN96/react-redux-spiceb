import { AiOutlinePlus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";

function TaskHead() {
  const { addNewTask } = useSelector((state) => state.addNewTask);
  const dispatch = useDispatch();
  return (
    <div className="taskHead">
      <h5>Tasks</h5>
      <AiOutlinePlus
        onClick={() =>
          dispatch({ type: "ADDNEWTASK", payload: addNewTask ? false : true })
        }
      />
    </div>
  );
}

export default TaskHead;
