// import React, { useState } from "react";
// import { Text, View, TouchableOpacity } from "react-native";
// import { AntDesign, Ionicons } from "@expo/vector-icons";

// const Picker = (props) => {
//   const [picker, setPicker] = useState(false);

//   return (
//     <View
//       style={{
//         width: "35%",
//         height:'100%',
//         borderWidth: 1,
//         borderColor: "black",
//       }}
//     >
//       {picker &&
//         props.pickerArray.map((object, index) => {
//           return (
//             <View key={index}>
//               <TouchableOpacity
//                 color="black"
//                 onPress={() => {
//                   props.textChangeHandler(object);
//                   setPicker(false);
//                 }}
//               >
//                 <Text>{object.value}</Text>
//               </TouchableOpacity>
//             </View>
//           );
//         })}
//     </View>
//   );
// };
// export default Picker;

import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const Picker = (props) => {
  return (
    <View>
      {props.pickerData.map((object, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              props.onPress(object);
            }}
          >
            <Text style={{ fontSize: 25 }}>{object.value}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default Picker;
