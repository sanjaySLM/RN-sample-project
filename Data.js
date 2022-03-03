import Employee from "./Models/Employee";
import RadioButton from "./Models/RadioButton";
import Checkbox from "./Models/Checkbox";
import Picker from "./Models/Picker";

export const DATA = [
  new Employee(0, "Sanjay", "Male","Mobile Development"),
  new Employee(1, "Mujib", "Male", "Deployment"),
  new Employee(2, "Sathesh", "Male","Mobile Development"),
  new Employee(3, "Praveen", "Male", "Deployment"),
  new Employee(4, "Santhosh", "Male","Mobile Development"),
  new Employee(5, "Jeenath", "Male", "Deployment"),
];

export const RADIO_BUTTON_DATA = [
  new RadioButton(0, "Mobile Development", "Mobile Development", false),
  new RadioButton(1, "Testing", "Testing", false),
  new RadioButton(2, "Deployment", "Deployment", false),
  new RadioButton(3, "Support", "Support", false),
];

export const CHECKBOX_DATA = [
  new Checkbox(0, "JavaScript", "JavaScript", false),
  new Checkbox(1, "React Native", "React Native", false),
  new Checkbox(2, "SQL Server", "SQL Server", false),
  new Checkbox(3, "Dot Net", "Dot Net", false),
];

let arrayPicker = [
  { id: 0, value: "first", selected: false },
  { id: 1, value: "second", selected: false },
  { id: 2, value: "third", selected: false },
];

export const PICKER_DATA = [
  new Picker(0, 'Male', false),
  new Picker(1, "Female", false),
  new Picker(2, "Others", false)
];