import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import AddOrEditMealView from './addOrEditMeal';
import AddNewItemView from './addNewItem';// Import your AddNewItemView component

const MainContainer = () => {
  return (
    <Box display="flex" gap={20}>
      <AddOrEditMealView />
      <AddNewItemView />
    </Box>
  );
};

export default MainContainer;
