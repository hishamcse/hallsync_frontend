import React, { useState } from 'react';
import { MealTypeDropDown } from '../MealTypeDropDown';
import { UploadPhoto } from '../photoUpload';
import { MyInput } from '../input';
import { MyButton } from '../button';
import { uploadFileToServer } from '../utilities';
import { useMutation } from '@apollo/client';
import { ADD_NEW_ITEM } from '../../graphql/operations';

const AddNewItemView = () => {
  const [itemName, setItemName] = useState<string>();
  const [itemType, setItemType] = useState<string>('RICE');
  const [imageFile, setImageFile] = useState<File | null>(null);


  const handleCancel = () => {
    // Reset the form
    setItemName(undefined);
    setItemType('RICE');
    setImageFile(null);
  };


  const handleMealTypeSelect = (selectedValue: string) => {
    setItemType(selectedValue);
  };


  const handleFileChange = (file: File | null) => {
    setImageFile(file);
  };

  let imageUrl = "../../images/default.png"

  if(imageFile){
    imageUrl = URL.createObjectURL(imageFile);
  }

  let [addMutation, {data, error}] = useMutation(ADD_NEW_ITEM)

  async function submit(){
    if(itemName == null){
      return;
    }
    let id = [-1];
    if(imageFile)
      id = await uploadFileToServer([imageFile]);
    addMutation({
      variables : {
        name : itemName,
        type : itemType,
        fileId : id[0]
      },
      onCompleted : ()=> location.reload(),
      onError : (err)=>console.log(err)
    })
  }

  return (
    <div>
      <div style={{
        display : "flex",
        justifyContent : "space-between",
        marginBottom : 20,
        marginTop : 20

      }}>
        <MyInput type='text' onChange={setItemName} value={itemName ?? ''} placeHolder='Item Name' style={{
          height : 40,
          width : 300
        }}   />
        <MealTypeDropDown width={150}  val={itemType} setVal={handleMealTypeSelect} />
      </div>

      <div style={{
        textAlign : 'center',
        margin : 10
      }}>
          <img width={140} height = {120} src={imageUrl} alt='Selected' />
        </div>
      
      <div style={{
        textAlign : 'center',
        margin : 10
      }}>
        <UploadPhoto onChange={handleFileChange} />
      </div>

        
      
      <div style = {{
        textAlign : "center"
      }}>

      <MyButton onClick={submit} text='Add' type='submit' style={{width : 100, marginRight : 10}}  />
      <MyButton text='Reset' type='cancel' style={{width : 100}} onClick={handleCancel}  />

      </div>
    </div>
  );
};

export default AddNewItemView;
