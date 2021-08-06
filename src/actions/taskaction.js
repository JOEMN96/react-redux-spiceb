import axios from "../helpers/axios";

const AddTaskAction = (formData) => {
  return async (dispatch) => {
    const {
      task_time,
      task_date,
      time_zone,
      is_completed,
      assigned_user,
      task_msg,
    } = formData;
    dispatch({
      type: "NOERROR",
    });
    try {
      const res = await axios.post(
        "https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=company_0336d06ff0ec4b3b9306ddc288482663",
        {
          task_time,
          task_date,
          time_zone,
          is_completed,
          assigned_user,
          task_msg,
        }
      );
      const status = res.data.code;
      if (status === 201) {
        dispatch({
          type: "ADDTASKANDCLOSE",
          payload: formData,
        });
        dispatch(getAllTasks());
      } else {
        dispatch({
          type: "POSTERROR",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const populateDropDown = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://stage.api.sloovi.com/team?company_id=company_b841ec73bbde4de5918b19ac93bf2d56&product=outreach"
      );
      const data = response.data;
      dispatch({
        type: "POPULATEDROPDOWN",
        payload: data.results.data,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: "ERROR",
      });
    }
  };
};

const getAllTasks = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=company_0336d06ff0ec4b3b9306ddc288482663"
      );
      const data = await res.data;

      if (data.code !== 200) {
        throw new Error("Something went Wrong");
      }

      if (data.results.length > 0) {
        dispatch({
          type: "ALLTASKS",
          payload: data.results,
        });
      } else {
        dispatch({
          type: "ALLTASKS",
          payload: null,
        });
      }
    } catch (error) {
      dispatch({
        type: "ERROR",
      });
    }
  };
};

const updateATask = (data, apiOrOpenTab) => {
  return async (dispatch) => {
    if (apiOrOpenTab) {
      const {
        task_time,
        task_date,
        time_zone,
        is_completed,
        assigned_user,
        task_msg,
      } = data;

      const res = await axios.put(
        `https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b/${data.id}?company_id=company_0336d06ff0ec4b3b9306ddc288482663`,
        {
          task_time,
          task_date,
          time_zone,
          is_completed,
          assigned_user,
          task_msg,
        },
        { timeout: 10000 }
      );
      console.log(res);
      if (res.status === 200) {
        dispatch({
          type: "UPDATE",
          payload: { ...data, addNewTask: false },
        });
        dispatch(getAllTasks());
      } else {
        dispatch({
          type: "POSTERROR",
        });
      }
    } else {
      dispatch({
        type: "UPDATE",
        payload: { ...data, addNewTask: true },
      });
    }
  };
};

const deleteTask = (task) => {
  return async (dispatch) => {
    const res = await axios.delete(
      `https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b/${task.id}?company_id=company_0336d06ff0ec4b3b9306ddc288482663`
    );
    if (res.status === 200) {
      dispatch(getAllTasks());
      dispatch({ type: "ADDNEWTASK", payload: false });
    }
    console.log(res);
  };
};

export {
  AddTaskAction,
  populateDropDown,
  getAllTasks,
  updateATask,
  deleteTask,
};
