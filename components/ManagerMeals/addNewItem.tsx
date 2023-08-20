import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ITEM } from '../../graphql/operations'; // Replace with your actual mutation
import { MealTypeDropDown } from '../MealTypeDropDown';
import { SelectChangeEvent } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { UploadFile } from '../fileUpload'; // Make sure to import the UploadFile component
import { UploadPhoto } from '../photoUpload';

const AddNewItemView = () => {
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

//   const [addItem, { loading }] = useMutation(ADD_ITEM, {
//     // Replace ADD_ITEM with your actual mutation and handle success/error as needed
//     onCompleted: (data) => {
//       console.log('Item added:', data);
//       // Reset the form after successfully adding the item
//       setItemName('');
//       setItemType('');
//       setImageFile(null);
//     },
//     onError: (error) => {
//       console.error('Error adding item:', error);
//     },
//   });

//   const handleAddItem = () => {
//     // Perform validation and other necessary checks before adding the item
//     if (!itemName || !itemType || !imageFile) {
//       console.log('Please fill in all fields.');
//       return;
//     }

//     // Call the addItem mutation
//     addItem({
//       variables: {
//         name: itemName,
//         type: itemType,
//         image: imageFile,
//       },
//     });
//   };

  const handleCancel = () => {
    // Reset the form
    setItemName('');
    setItemType('');
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
      <MealTypeDropDown val={itemType} setVal={handleMealTypeSelect} />
      <div>
        <UploadPhoto onChange={handleFileChange} />
      </div>
      {/* <Button variant="contained" color="primary" onClick={handleAddItem} disabled={loading}> */}
    <Button variant='contained' color = "primary">
        Add
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default AddNewItemView;
