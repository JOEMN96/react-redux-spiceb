import { AiOutlineUser } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { MdNotificationsPaused } from "react-icons/md";
import { MdDone } from "react-icons/md";

function AddedTask() {
  return (
    <div className="task">
      <AiOutlineUser size={38} />
      <div className="text">
        <p>TaskName</p>
        <p className="date">2/2/2020</p>
      </div>
      <div className="icons">
        <MdModeEdit size={30} />
        <MdNotificationsPaused size={30} />
        <MdDone size={30} />
      </div>
    </div>
  );
}

export default AddedTask;
