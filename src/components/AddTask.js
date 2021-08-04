import moment from "moment";
import { useDispatch } from "react-redux";
import axios from "../helpers/axios";
import { useEffect, useState } from "react";

function AddTask() {
  const [dropDown, setdropDown] = useState([]);

  useEffect(() => {
    getDropDowmUsers();
  }, []);
  async function getDropDowmUsers() {
    try {
      const response = await axios.get(
        "https://stage.api.sloovi.com/team?company_id=company_b841ec73bbde4de5918b19ac93bf2d56&product=outreach"
      );
      const data = response.data;
      setdropDown(data.results.data);
    } catch (error) {
      console.error(error);
    }
  }
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const timeChange = (e) => {
    console.log(e.target.value);
    let arr = e.target.value.split(":");
    const seconds = arr[0] * 60 * 60 + arr[1] * 60;
    console.log(seconds);
  };

  const dateChange = (e) => {
    const date = moment().format("YYYY-MM-DD", e.target.value);
    console.log(date);
  };

  const handleSave = () => {
    dispatch({ type: "ADDNEWTASK", payload: false });
  };

  const handleDropDownChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="addTask">
      <form onSubmit={handleSubmit}>
        <p>Task Description</p>
        <input type="text" />
        <div className="split">
          <div>
            {/* <label for="date">Date</label> */}
            <p>Date</p>
            <input type="date" onChange={dateChange} name="" id="" />
          </div>
          <div>
            <p>Time</p>
            <input type="time" name="" onChange={timeChange} id="" />
          </div>
        </div>
        <div className="assignUser">
          <p>Assign User</p>
          <select onChange={handleDropDownChange} name="">
            {dropDown.length > 0 &&
              dropDown.map((item) => (
                <option value={item.user_id}>{item.first}</option>
              ))}
          </select>
        </div>

        <div className="actionArea">
          <button>Cancel</button>
          <button type="submit" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
