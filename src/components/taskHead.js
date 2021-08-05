import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { populateDropDown } from "../actions/taskaction";

function TaskHead() {
  const { addNewTask } = useSelector((state) => state.addNewTask);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(populateDropDown());
  }, []);

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
