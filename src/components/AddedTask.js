import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { MdNotificationsPaused } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateATask } from "../actions/taskaction";

function AddedTask({ task }) {
  const { task_date, task_msg } = task;
  const dispatch = useDispatch();
  const [done, setdone] = useState(false);
  const handleDone = () => {
    setdone(!done);
  };

  return (
    <div className="task">
      <AiOutlineUser size={38} />
      <div className="text">
        <p className={done ? "overline" : "none"}>{task_msg}</p>
        <p className="date">{task_date}</p>
      </div>
      <div className="icons">
        <MdModeEdit
          onClick={() => dispatch(updateATask(task, null))}
          size={30}
        />
        <MdNotificationsPaused size={30} />
        <MdDone size={30} onClick={() => handleDone()} />
      </div>
    </div>
  );
}

export default AddedTask;
