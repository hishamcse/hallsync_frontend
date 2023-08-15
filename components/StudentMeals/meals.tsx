//import NewSeat from "./NewSeat";
import {useContext, useEffect, useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";
//import TempSeat from "./TempSeat";
//import RoomChange from "./RoomChange";
import {userContext} from "../../pages/_app";
import {ResidencyStatus} from "../../graphql/__generated__/graphql";

import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { DragDropContext, Draggable, Droppable, DropResult  } from 'react-beautiful-dnd';




//export const types = ['New Seat', 'Temporary Seat', 'Room Change'];
interface FoodItem {
  name: string;
  image: string; // Path to the food item's image
  cupCount?: number; // Cup count for protein food items
  type: "Rice" | "Veg" | "Non Veg"; // Add the 'type' property
}

interface Meal {
  foodItems: FoodItem[];
  optOut: boolean;
}

interface DateInfo {
  date: string;
  lunch: Meal;
  dinner: Meal;
}

const dummyData: DateInfo[] = [
  {
    date: "August 14, 2023",
    lunch: {
      foodItems: [
        { name: "Rice", image: "/images/rice.png" , type: "Rice" },
        { name: "Meat", image: "/images/meat.png", cupCount: 150, type: "Non Veg" },
        { name: "Egg", image: "/images/egg.png", cupCount: 80, type: "Non Veg" },
        { name: "Alu Bhaji", image: "/images/aluBhaji.png", type: "Veg" },
      ],
      optOut: false,
    },
    dinner: {
      foodItems: [
        { name: "Rice", image: "/images/rice.png" , type: "Rice"},
        { name: "Fish", image: "/images/fish.png", cupCount: 150, type: "Non Veg" },
        { name: "Egg", image: "/images/egg.png", cupCount: 80, type: "Non Veg" },
        { name: "Alu Bhaji", image: "/images/aluBhaji.png", type: "Veg" },
      ],
      optOut: false,
    },
  },
  {
    date: "August 15, 2023",
    lunch: {
      foodItems: [
        { name: "Rice", image: "/images/rice.png" , type: "Rice" },
        { name: "Meat", image: "/images/meat.png", cupCount: 150, type: "Non Veg" },
        { name: "Egg", image: "/images/egg.png", cupCount: 80, type: "Non Veg" },
        { name: "Alu Bhaji", image: "/images/aluBhaji.png", type: "Veg" },
      ],
      optOut: false,
    },
    dinner: {
      foodItems: [
        { name: "Rice", image: "/images/rice.png" , type: "Rice"},
        { name: "Fish", image: "/images/fish.png", cupCount: 150, type: "Non Veg" },
        { name: "Egg", image: "/images/egg.png", cupCount: 80, type: "Non Veg" },
        { name: "Alu Bhaji", image: "/images/aluBhaji.png", type: "Veg" },
      ],
      optOut: false,
    },
  },
  // Add more dummy data entries here...
];

const MealView: React.FC = () => {
  return (
    <div>
      {dummyData.map((dateInfo, index) => (
        <Card key={index} style={{ marginBottom: "16px", maxWidth: "650px"}}>
          <CardContent>
            <Typography variant="h6">{dateInfo.date}</Typography>
            <div style={{ display: "flex", borderTop: "1px solid #ccc", marginTop: "8px", marginBottom: "16px" }}>
              <div style={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">Lunch:</Typography>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {dateInfo.lunch.foodItems.map((foodItem: FoodItem, foodIndex: number) => (
                  <div key={foodIndex}>
                    <img src={`${foodItem.image}`} alt={foodItem.name} width={100} height={70} />
                    <Typography variant="body2">
                      {foodItem.name} {foodItem.cupCount !== undefined ? `(${foodItem.cupCount} cups)` : ""}
                    </Typography>
                  </div>
                ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", borderLeft: "1px solid #ccc", paddingLeft: "16px" }}>
                <Typography variant="body2" color="red">Opt Out </Typography>
                <Checkbox checked={dateInfo.lunch.optOut} />
              </div>
            </div>
            <div style={{ display: "flex", borderTop: "1px solid #ccc", marginTop: "16px", paddingTop: "16px" }}>
              <div style={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">Dinner:</Typography>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {dateInfo.dinner.foodItems.map((foodItem: FoodItem, foodIndex: number) => (
                  <div key={foodIndex}>
                    <img src={`${foodItem.image}`} alt={foodItem.name} width={100} height={70} />
                    <Typography variant="body2">
                      {foodItem.name} {foodItem.cupCount !== undefined ? `(${foodItem.cupCount} cups)` : ""}
                    </Typography>
                  </div>
                ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", borderLeft: "1px solid #ccc", paddingLeft: "16px" }}>
                <Typography variant="body2" color="red">Opt Out</Typography>
                <Checkbox checked={dateInfo.dinner.optOut} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MealView;
