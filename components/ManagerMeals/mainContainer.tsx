import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import AddOrEditMealView from './addOrEditMeal';
import AddNewItemView from './addNewItem';// Import your AddNewItemView component
import { Dayjs } from 'dayjs';

const MainContainer = (props : {
  selectedMealTime : string,
  setSelectedMealTime : (v : string)=>void,
  selectedDate : Dayjs | null,
  setSelectedDate : (newValue: Dayjs | null) => void,
}) => {
  return (
    // <Box display="flex" gap={20}>
      <AddOrEditMealView selectedDate={props.selectedDate} selectedMealTime={props.selectedMealTime} 
      setSelectedDate={props.setSelectedDate} setSelectedMealTime={props.setSelectedMealTime}  />
      /* <AddNewItemView /> */
    // </Box>
  );
};

export default MainContainer;
