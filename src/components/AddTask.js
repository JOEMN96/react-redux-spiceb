import moment from "moment";
import { useEffect, useState } from "react";
import { AddTaskAction, deleteTask, updateATask } from "../actions/taskaction";
import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";

const initialState = {
  task_time: "",
  task_date: "",
  time_zone: new Date().getTimezoneOffset() * 60,
  is_completed: 0,
  assigned_user: "",
  Close: false,
  task_msg: "",
};
function AddTask() {
  let { dropDownData, postError, updateData } = useSelector((state) => state);
  const [formData, setFormData] = useState(initialState);
  useEffect(() => {
    if (updateData) {
      setFormData({ ...updateData });
    } else {
      setFormData(initialState);
    }
  }, [updateData]);
  const [Sucess, setSucess] = useState(false);
  console.log(postError);
  const dispatch = useDispatch();

  const timeChange = (e) => {
    console.log(e.target.value);
    let arr = e.target.value.split(":");
    const seconds = arr[0] * 60 * 60 + arr[1] * 60;
    setFormData({ ...formData, task_time: seconds });
  };

  const dateChange = (e) => {
    // const date = moment().format("yyyy-MM-DD", e.target.value);
    // console.log(date, "From Moment");
    // console.log(e.target.value);
    setFormData({ ...formData, task_date: e.target.value });
  };

  const handleDropDownChange = (e) => {
    setFormData({ ...formData, assigned_user: e.target.value });
  };

  const handletask = (e) => {
    setFormData({
      ...formData,
      task_msg: e.target.value,
    });
  };

  const handleSave = () => {
    if (formData.task_msg === "" || formData.assignedUser === "") {
      setSucess(true);
      return;
    }
    if (updateData) {
      dispatch(updateATask(formData, true));
      return;
    }
    setSucess(false);
    dispatch(AddTaskAction(formData));
  };

  return (
    <div className="addTask">
      <div>
        <p>Task Description</p>
        <input
          type="text"
          id="taskbox"
          value={formData.task_msg}
          onChange={handletask}
        />
        <div className="split">
          <div>
            {/* <label for="date">Date</label> */}
            <p>Date</p>
            <input
              type="date"
              value={setFormData.task_date}
              onChange={dateChange}
              name=""
              id=""
            />
          </div>
          <div>
            <p>Time</p>
            <input type="time" onChange={timeChange} id="" />
          </div>
        </div>
        <div className="assignUser">
          <p>Assign User</p>
          <select onChange={handleDropDownChange} name="">
            <option>Select</option>
            {dropDownData.length > 0 &&
              dropDownData.map((item, index) => (
                <option key={index} value={item.user_id}>
                  {item.first}
                </option>
              ))}
          </select>
        </div>
        <p style={{ textAlign: "center", color: "red" }}>
          {Sucess && "Please fill the fields"}
        </p>

        <p style={{ textAlign: "center", color: "red" }}>
          {postError && "SOMETHING WENT WRONG !"}
        </p>
        <div className="actionArea">
          <div>
            {updateData && (
              <AiFillDelete
                onClick={() => dispatch(deleteTask(updateData))}
                className="del"
              />
            )}
          </div>
          <div>
            <button
              onClick={() => dispatch({ type: "ADDNEWTASK", payload: false })}
            >
              Cancel
            </button>
            <button type="submit" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
