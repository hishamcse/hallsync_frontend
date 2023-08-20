import React, { useState } from 'react';
import { Item } from '../../graphql/__generated__/graphql';
import Image from "next/image";
import TextField from "@mui/material/TextField";

type SelectedItemsListProps = {
  selectedItems: Item[];
  type: string;
  onChangeCupCount: (itemName: string, quantity: number) => void; // Update the prop type
};

const SelectedItemsList: React.FC<SelectedItemsListProps> = ({ selectedItems, type, onChangeCupCount }) => {
  const [itemCupCount, setItemCupCount] = useState<Record<string, number>>({});

  const handleCupCountChange = (itemName: string, quantity: number) => {
    setItemCupCount(prevCupCounts => ({ ...prevCupCounts, [itemName]: quantity }));
    onChangeCupCount(itemName, quantity); // Update the function call
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight : 150}}>
      {selectedItems.length > 0 ? (
        <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap' }}>
          {selectedItems.map((item, index) => (
            <li key={index} style={{ margin: '10px'}}>
              <div>
                <Image src={'/images/default.png'} alt='foodItem' width={150} height={100} />
              </div>
              <div>{item.name}</div>
              {type === 'NON_VEG' && (
                <div>
                  <TextField
                    label="Cup Count"
                    type="number"
                    value={itemCupCount[item.name] || ''}
                    onChange={(e) => handleCupCountChange(item.name, parseInt(e.target.value))}
                    size= "small"
                    style={{ width: '150px', height: '28px' , marginTop : 10}}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div style={{
          display : "flex",
          alignItems : "center",
          flexGrow : 1,
          color : "yellow"
        }} >No {type} selected.</div>
      )}
    </div>
  );
};

export default SelectedItemsList;
