//import NewSeat from "./NewSeat";
//import React, {useContext, useEffect, useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";
//import TempSeat from "./TempSeat";
//import RoomChange from "./RoomChange";
import {userContext} from "../../pages/_app";
import {ResidencyStatus} from "../../graphql/__generated__/graphql";

import Image from "next/image";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
import { Card, CardContent, Typography, Radio, TextField, Button, MenuItem } from "@mui/material";
import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { DragDropContext, Draggable, Droppable, DropResult  } from 'react-beautiful-dnd';
import topBarStyles from "../../styles/topbar.module.scss";

import React, {useState} from "react";
import {GetMealPlansQuery} from "../../graphql/__generated__/graphql";

import MyCard from "../card";
import {useQuery} from "@apollo/client";
import {GET_MULTIPLE_MEALPLANS} from "../../graphql/operations";
import SingleMealPlanView from "./MealPlan";
import AddOrEditMealView from "./addOrEditMeal";


const DayMealPlan = (props: { mealPlans: GetMealPlansQuery['getMealPlans'] }) => {
  return (
      <div style={{width: '100%'}}>
          {props.mealPlans.map((mealPlan, index) => (
              <SingleMealPlanView mealPlan={mealPlan} key={index}/>
          ))}
      </div>
  )
}

const generateDateInfo = (nextDay: number) => {
  const today = new Date() // get today's date
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + nextDay) // Add 1 to today's date and set it to tomorrow
  return tomorrow.toLocaleDateString();
}

const ManagerAddOrEdit = (props: { mealPlans: GetMealPlansQuery['getMealPlans'] }) => {
  return (
    <div style={{width: '100%'}}>
     {props.mealPlans.map((mealPlan, index) => (
              <AddOrEditMealView mealPlan={mealPlan} key={index}/>
          ))}
    </div>
  )
}

const ManagerMealView: React.FC = () => {

  const [mealPlans, setMealPlans] = useState<GetMealPlansQuery['getMealPlans']>([]);

  const {data} = useQuery(GET_MULTIPLE_MEALPLANS, {
      fetchPolicy: "no-cache",
      variables: {
          from: generateDateInfo(1),
          to: generateDateInfo(2)
      },
      onCompleted: (data) => {
          console.log("data", data);
          setMealPlans(data.getMealPlans);
      },
      onError: (error) => {
          console.log(error);
      }
  })

  return (
      <div>
          {mealPlans.map((mealPlan, index) => (
              index % 2 == 0 &&
              <div key={index} style={{margin: 20}}>
                  <MyCard title={new Date(mealPlan.day).toDateString()}
                          content={<DayMealPlan mealPlans={[mealPlans[index], mealPlans[index + 1]]}/>}/>
              </div>   
          ))}
          {mealPlans.map((mealPlan, index) => (
              index % 2 == 0 &&
              <div key={index} style={{margin: 20}}>
                  <MyCard title={new Date(mealPlan.day).toDateString()}
                          content={<ManagerAddOrEdit mealPlans={[mealPlans[index], mealPlans[index + 1]]}/>}/>
              </div>   
          ))}
      </div>
  );
};

export default ManagerMealView;


// //export const types = ['New Seat', 'Temporary Seat', 'Room Change'];
// interface FoodItem {
//   name: string;
//   image: string; // Path to the food item's image
//   cupCount?: number; // Cup count for protein food items
//   type: "Rice" | "Veg" | "Non Veg"; // Add the 'type' property
// }

// interface Meal {
//   foodItems: FoodItem[];
//   optOut: boolean;
// }

// interface DateInfo {
//   date: string;
//   lunch: Meal;
//   dinner: Meal;
// }

// const dummyData: DateInfo[] = [
//   {
//     date: "August 14, 2023",
//     lunch: {
//       foodItems: [
//         { name: "Rice", image: "/images/rice.png" , type: "Rice" },
//         { name: "Meat", image: "/images/meat.png", cupCount: 150, type: "Non Veg" },
//         { name: "Egg", image: "/images/egg.png", cupCount: 80, type: "Non Veg" },
//         { name: "Alu Bhaji", image: "/images/aluBhaji.png", type: "Veg" },
//       ],
//       optOut: false,
//     },
//     dinner: {
//       foodItems: [
//         { name: "Rice", image: "/images/rice.png" , type: "Rice"},
//         { name: "Fish", image: "/images/fish.png", cupCount: 150, type: "Non Veg" },
//         { name: "Egg", image: "/images/egg.png", cupCount: 80, type: "Non Veg" },
//         { name: "Alu Bhaji", image: "/images/aluBhaji.png", type: "Veg" },
//       ],
//       optOut: false,
//     },
//   },
// //   {
// //     date: "August 15, 2023",
// //     lunch: {
// //       foodItems: [
// //         { name: "Rice", image: "/images/rice.png" , type: "Rice" },
// //         { name: "Meat", image: "/images/meat.png", cupCount: 150, type: "Non Veg" },
// //         { name: "Egg", image: "/images/egg.png", cupCount: 80, type: "Non Veg" },
// //         { name: "Alu Bhaji", image: "/images/aluBhaji.png", type: "Veg" },
// //       ],
// //       optOut: false,
// //     },
// //     dinner: {
// //       foodItems: [
// //         { name: "Rice", image: "/images/rice.png" , type: "Rice"},
// //         { name: "Fish", image: "/images/fish.png", cupCount: 150, type: "Non Veg" },
// //         { name: "Egg", image: "/images/egg.png", cupCount: 80, type: "Non Veg" },
// //         { name: "Alu Bhaji", image: "/images/aluBhaji.png", type: "Veg" },
// //       ],
// //       optOut: false,
// //     },
// //   },
//   // Add more dummy data entries here...
// ];

// const ManagerMealView: React.FC = () => {
//     // Define state for creating a meal plan
//     const [mealType, setMealType] = useState<"lunch" | "dinner">("lunch");
//     const [selectedDate, setSelectedDate] = useState("");
//     const [selectedFoodItems, setSelectedFoodItems] = useState<FoodItem[]>([]);
//     const [selectedCupCounts, setSelectedCupCounts] = useState<number[]>([]);
  
//     // Function to handle adding a meal plan
//     const handleAddMealPlan = () => {
//       // Create the new meal plan
//       const newMealPlan: DateInfo = {
//         date: selectedDate,
//         lunch: {
//           foodItems: selectedFoodItems,
//           optOut: false,
//         },
//         dinner: {
//           foodItems: selectedFoodItems,
//           optOut: false,
//         },
//       };
  
//       // Add the new meal plan to the dummyData
//       dummyData.push(newMealPlan);
  
//       // Clear the selected values
//       setSelectedDate("");
//       setSelectedFoodItems([]);
//       setSelectedCupCounts([]);
//     };


//   return (
//     <div>
//       {dummyData.map((dateInfo, index) => (
//         <Card key={index} style={{ marginBottom: "16px", maxWidth: "650px"}}>
//           <CardContent>
//             <Typography variant="h6">{dateInfo.date}</Typography>
//             <div style={{ display: "flex", borderTop: "1px solid #ccc", marginTop: "8px", marginBottom: "16px" }}>
//               <div style={{ flexGrow: 1 }}>
//                 <Typography variant="subtitle1">Lunch:</Typography>
//                 <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//                 {dateInfo.lunch.foodItems.map((foodItem: FoodItem, foodIndex: number) => (
//                   <div key={foodIndex}>
//                     <img src={`${foodItem.image}`} alt={foodItem.name} width={100} height={70} />
//                     <Typography variant="body2">
//                       {foodItem.name} {foodItem.cupCount !== undefined ? `(${foodItem.cupCount} cups)` : ""}
//                     </Typography>
//                   </div>
//                 ))}
//                 </div>
//               </div>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px", borderLeft: "1px solid #ccc", paddingLeft: "16px" }}>
//                 <Typography variant="body2" color="red">Opt Out </Typography>
//                 <Checkbox checked={dateInfo.lunch.optOut} />
//               </div>
//             </div>
//             <div style={{ display: "flex", borderTop: "1px solid #ccc", marginTop: "16px", paddingTop: "16px" }}>
//               <div style={{ flexGrow: 1 }}>
//                 <Typography variant="subtitle1">Dinner:</Typography>
//                 <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//                 {dateInfo.dinner.foodItems.map((foodItem: FoodItem, foodIndex: number) => (
//                   <div key={foodIndex}>
//                     <img src={`${foodItem.image}`} alt={foodItem.name} width={100} height={70} />
//                     <Typography variant="body2">
//                       {foodItem.name} {foodItem.cupCount !== undefined ? `(${foodItem.cupCount} cups)` : ""}
//                     </Typography>
//                   </div>
//                 ))}
//                 </div>
//               </div>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px", borderLeft: "1px solid #ccc", paddingLeft: "16px" }}>
//                 <Typography variant="body2" color="red">Opt Out</Typography>
//                 <Checkbox checked={dateInfo.dinner.optOut} />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       ))}


        
//         <Card style={{ marginBottom: "16px", maxWidth: "750px" }}>
//         <CardContent>
//           <Typography variant="h6">Add Meal Plan</Typography>
//           <div className={topBarStyles.tabSection}>
//             <Radio
//               value="lunch"
//               checked={mealType === "lunch"}
//               onChange={() => setMealType("lunch")}
//             />
//             <Typography variant="body2">Lunch</Typography>
//             <Radio
//               value="dinner"
//               checked={mealType === "dinner"}
//               onChange={() => setMealType("dinner")}
//             />
//             <Typography variant="body2">Dinner</Typography>
//             <TextField
//               label="Select Date"
//               type="date"
//               value={selectedDate}
//               onChange={(event) => setSelectedDate(event.target.value)}
//             />
//           </div>
//           <div className={topBarStyles.tabSection}>
//             {/* Display already added meal items */}
//             {selectedFoodItems.map((foodItem, index) => (
//               <div key={index}>
//                 <img src={foodItem.image} alt={foodItem.name} width={50} height={35} />
//                 <Typography variant="body2">
//                   {foodItem.name} - {foodItem.type}
//                 </Typography>
//               </div>
//             ))}
//           </div>
//           <div className={topBarStyles.tabSection}>
//             {/* Display radio options for food items */}
//             {dummyData[0].lunch.foodItems.map((foodItem, index) => (
//               <div key={index}>
//                 <Radio
//                   value={index}
//                   checked={selectedFoodItems.includes(foodItem)}
//                   onChange={() => {
//                     setSelectedFoodItems([foodItem]);
//                     setSelectedCupCounts([foodItem.cupCount || 0]);
//                   }}
//                 />
//                 <Typography variant="body2">
//                   {foodItem.name} - {foodItem.type}
//                 </Typography>
//                 <TextField
//                   label="Cup Count"
//                   type="number"
//                   value={selectedCupCounts[index] || ""}
//                   onChange={(event) => {
//                     const newCupCounts = [...selectedCupCounts];
//                     newCupCounts[index] = parseInt(event.target.value);
//                     setSelectedCupCounts(newCupCounts);
//                   }}
//                   disabled={!selectedFoodItems.includes(foodItem)}
//                 />
//               </div>
//             ))}
//           </div>
//           <Button variant="contained" onClick={handleAddMealPlan}>
//             Add Meal Plan
//           </Button>
//         </CardContent>
//       </Card>








//     </div>
//   );
// };

// export default ManagerMealView;
