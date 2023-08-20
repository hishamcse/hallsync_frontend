import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ITEM } from '../../graphql/operations'; // Replace with your actual mutation
import { MealTypeDropDown } from '../MealTypeDropDown';
import { SelectChangeEvent } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { UploadFile } from '../fileUpload'; // Make sure to import the UploadFile component
import { UploadPhoto } from '../photoUpload';

const AddNewItemView = () => {
  const [itemName, setItemName] = useState<string>();
  const [itemType, setItemType] = useState<string>();
  const [imageFile, setImageFile] = useState<File | null>(null);


  const handleCancel = () => {
    // Reset the form
    setItemName(undefined);
    setItemType(undefined);
    setImageFile(null);
  };

  const handleItemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);
  };

  const handleMealTypeChange = (event: SelectChangeEvent) => {
    setItemType(event.target.value);
  };

  const handleMealTypeSelect = (selectedValue: string) => {
    setItemType(selectedValue);
  };

  const handleFileUpload = (file: File | null) => {
    setImageFile(file);
  };

  const handleFileChange = (file: File | null) => {
    setImageFile(file);
  };

  return (
    <div>
      <TextField label="Item Name" value={itemName} onChange={handleItemNameChange} />
      <div style = {{
        display : "flex",
        alignItems : "center",
        justifyContent: "space-between",
        marginTop : 10
      }}>
        Type
        <MealTypeDropDown  val={itemType} setVal={handleMealTypeSelect} />
      </div>
      <div>
        <UploadPhoto onChange={handleFileChange} />
      </div>
      <div style = {{
        textAlign : "center"
      }}>

      <Button variant='contained' color = "primary" sx={{
        marginRight : 10
      }}>
          Add
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddNewItemView;
