import {
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  DELETE_EMPLOYEE,
} from "../action/Employee-action";
import { DATA, RADIO_BUTTON_DATA, CHECKBOX_DATA,PICKER_DATA } from "../../Data";


const initialState = {
  Data: [],
  RadioButtonData: RADIO_BUTTON_DATA,
  CheckboxData: CHECKBOX_DATA,
  PickerData: PICKER_DATA,
};

export default (state = initialState, action) => {
  let copiedState = [...state.Data];
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        Data: state.Data.concat(action.addData),
      };
    case EDIT_EMPLOYEE:
      const test = state.Data.findIndex(
        (state) => state.id === action.editData.id
      );
      copiedState[test] = action.editData;
      return {
        ...state,
        Data: copiedState,
      };
    case DELETE_EMPLOYEE:
      const updatedData = copiedState.filter(
        (state) => state.id != action.deleteEmployeeId
      );
      return {
        ...state,
        Data: updatedData,
      };
    default:
      return state;
  }
};
