import { useEffect, useState } from "react";
import { AddTaskAction, deleteTask, updateATask } from "../actions/taskaction";
import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import gif from "../assets/Moving train.gif";

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
  let { dropDownData, postError, updateData, loading } = useSelector(
    (state) => state
  );
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (updateData) {
      setFormData({ ...updateData });
    } else {
      setFormData(initialState);
    }
    return () => {
      dispatch({ type: "NOERROR" });
    };
  }, [updateData]);

  const [Sucess, setSucess] = useState(false);
  const dispatch = useDispatch();

  const timeChange = (e) => {
    let arr = e.target.value.split(":");
    const seconds = arr[0] * 60 * 60 + arr[1] * 60;
    setFormData({ ...formData, task_time: seconds });
  };

  const dateChange = (e) => {
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
    dispatch(AddTaskAction(formData));
  };
  console.log(loading);
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
              value={formData.task_date}
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
          <select
            defaultValue={updateData ? updateData.user_id : "select"}
            onChange={handleDropDownChange}
            name=""
          >
            <option value="select">Select</option>
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
          {loading && <img src={gif} alt="" />}
          <div>
            <button
              onClick={() => dispatch({ type: "ADDNEWTASK", payload: false })}
            >
              Cancel
            </button>
            <button type="submit" disabled={loading} onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
