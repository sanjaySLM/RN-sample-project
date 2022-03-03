import Employee from "../../Models/Employee";
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";

export const addEmployeeData = (name, pickerData, radioData,checkboxData) => {
  return (dispatch, getState) => {
    const val = Math.floor(1000 + Math.random() * 9000);
    let modifiedData = new Employee(val, name, pickerData, radioData,checkboxData);
    dispatch({
      type: ADD_EMPLOYEE,
      addData: modifiedData,
    });
  };
};

export const editEmployeeData = (id, name, pickerData,radioData,checkboxData) => {
  return (dispatch, getState) => {
    let modifiedData = new Employee(id, name, pickerData,radioData,checkboxData);
    dispatch({
      type: EDIT_EMPLOYEE,
      editData: modifiedData,
    });
  };
};

export const deleteEmployeeData = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_EMPLOYEE,
      deleteEmployeeId: id,
    });
  };
};
