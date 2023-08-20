import React from 'react';
import { Item } from '../../graphql/__generated__/graphql';
import Image from "next/image";

type SelectedItemsListProps = {
  selectedItems: Item[];
};

const SelectedItemsList: React.FC<SelectedItemsListProps> = ({ selectedItems }) => {
    return (
      <div>
        {selectedItems.length > 0 ? (
          <ul>
            {selectedItems.map((item, index) => (
              <li key={index}>
                 <Image src={( '/images/default.png')}
                                           alt='foodItem'
                                           width={100 }
                                           height={75 }/>
                {item.name}
              </li>
            ))}
          </ul>
        ) : (
          <p></p>
        )}
      </div>
    );
};

export default SelectedItemsList;
