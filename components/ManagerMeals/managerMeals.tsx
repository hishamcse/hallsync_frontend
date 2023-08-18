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
