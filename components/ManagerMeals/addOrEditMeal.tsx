import {GetMealPlansQuery, Item, ItemType} from "../../graphql/__generated__/graphql";
import {useRouter} from "next/router";
import React, {useRef, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {ADD_PREFERENCES, OPT_OUT_MEAL, GET_OLD_MEAL_ITEMS, ADD_MEAL_PLAN} from "../../graphql/operations";
import Typography from "@mui/material/Typography";
import MUISelectStyled from "../MUIMultiSelectCheckbox";
import dayjs, { Dayjs } from "dayjs";
import { MyDatePicker } from "../DatePicker";
import { MealTimeDropDown } from "../MealTimeDropDown";
import SelectedItemsList from './SelectedItem';
// import Image from "next/image";
import {Button, Checkbox} from "@mui/material";

const AddOrEditMealView = () => {

    const router = useRouter();
    const [strList, setStrList] = useState<string[]>([]);
    //const [optedOut, setOptedOut] = useState<boolean>(!!props.mealPlan.optedOut);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedMealTime, setSelectedMealTime] = useState<string>('LUNCH');

    const [reqError, setReqError] = useState(false);
    const [reqErrorMsg, setReqErrorMsg] = useState('');
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);

    const [selectedRiceItems, setSelectedRiceItems] = useState<Item[]>([]);
    const [selectedVegItems, setSelectedVegItems] = useState<Item[]>([]);
    const [selectedNonVegItems, setSelectedNonVegItems] = useState<Item[]>([])

    const [nonVegCupCount, setNonVegCupCount] = useState<Record<string, number>>({});

    const [addMealPlan, {}] = useMutation(
        ADD_MEAL_PLAN, {
            onError: (error) => {
                console.log(error);
                setReqError(true)
                setReqErrorMsg(error.message)
            },
            onCompleted: (data) => {
                console.log(data);
                // router.reload();
            }
        }
    )

    // done with departments for now. need replacing with food items
    const { loading, error, data } = useQuery(GET_OLD_MEAL_ITEMS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const oldItems = data?.getOldItems ?? [];

    // Separate arrays for different types of items
    const riceItems = oldItems.filter((item) => item.type === 'RICE').map((item) => item.name);
    const vegItems = oldItems.filter((item) => item.type === 'VEG').map((item) => item.name);
    const nonVegItems = oldItems.filter((item) => item.type === 'NON_VEG').map((item) => item.name);

    // Callback function to update the quantities of NON_VEG items
    const handleNonVegCupCount = (itemName: string, cupCount: number) => {
      setNonVegCupCount(prevCupCount => ({ ...prevCupCount, [itemName]: cupCount }));
    };

    const handleCancel = () => {
      // Reset all selections to initial state
      setSelectedDate(null);
      setSelectedMealTime('LUNCH');
      setSelectedRiceItems([]);
      setSelectedVegItems([]);
      setSelectedNonVegItems([]);
    };
    // let disabled = !!props.mealPlan.optedOut;

    // let prefDisabled = (props.mealPlan.preferences && props.mealPlan.preferences.length > 0) || false;
    

    const importedImgPath = (imgName: string) => {
        return "/images/" + imgName;
    }

    const getSelecteds = (names: string[]) => {
        let selecteds: GetMealPlansQuery['getMealPlans'][0]['meal']['items'] = [];
        names.forEach((name) => {
            selecteds.push(oldItems.filter((item) => {
                return item.name.toLowerCase() == name.toLowerCase();
            })[0]);
        });

        return selecteds;
    }


    const handleComplete = () => {

        const riceNames = selectedRiceItems.map(item => item.name)
        const vegNames = selectedVegItems.map(item => item.name)
        const nenVegNames = selectedNonVegItems.map(item => item.name)

        console.log(riceNames, vegNames, nenVegNames)

        const str: string[] = [...riceNames, ...vegNames, ...nenVegNames];

        setStrList(str)

        const selected = getSelecteds(strList);

        console.log(nonVegCupCount, selectedDate?.toDate().toLocaleDateString(), selectedMealTime)

        const addedItems = str.map(itemName => {
            let itemId = selected
                .filter(s => s.name.toLowerCase() == itemName.toLowerCase())[0]?.itemId;
            let cupCount = nonVegCupCount[itemName] ?? 150;

            return {itemId, cupCount}
        })

        if(!selectedDate) {
            setReqError(true)
            setReqErrorMsg('date undefined');
            return;
        }

        setReqError(false)

        const items = {
            items: addedItems
        }

        console.log(addedItems)

        addMealPlan({
            variables: {
                mealTime: selectedMealTime,
                date: selectedDate?.toDate().toLocaleDateString(),
                items: items
            }
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
    }


    const handleDateChange = (newDate: Dayjs | null) => {
        setSelectedDate(newDate); // Step 3
        // Perform actions based on the selected date
    };

    const handleMealTimeChange = (newMealTime: string) => {
        setSelectedMealTime(newMealTime); // Step 2
        // Perform actions based on the selected meal time
    };

    // Define a function to handle the action based on selected departments
    // const handleItemSelection = (selected: Item[]) => {
    //     setSelectedItems(selected);
    //     // Perform your desired action here based on the selected departments
    //     // For example: update state, make API calls, etc.
    // };

    return (
        
        <div>
          {/* ... Other content ... */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <MealTimeDropDown
              val={selectedMealTime}
              setVal={handleMealTimeChange}
              width={160}
            />
            <div style={{ width: 20 }} /> {/* Add space */}
            <MyDatePicker date={selectedDate} handleDate={handleDateChange} />
          </div>

        {/* Render SelectedItemsList */}
      {/* <SelectedItemsList selectedItems={selectedItems} /> */}
      <div><SelectedItemsList selectedItems={selectedRiceItems} type = "RICE" /></div>
      <div><SelectedItemsList selectedItems={selectedVegItems} type = "VEG" /></div>
      <div><SelectedItemsList selectedItems={selectedNonVegItems} type = "NON_VEG" onChangeCupCount={handleNonVegCupCount}/></div>
          <div style={{ display: 'flex' }}>
        {/* Dropdown for RICE items */}
        <MUISelectStyled
          type="multiple"
          items={riceItems}
          placeHolder="RICE"
          vals={selectedRiceItems.map(item => item.name)} // Convert to string[]
          setVals={(s: string[]) => setSelectedRiceItems(s.map(name => ({ name } as Item)))}
        />
        
        <div style={{ width: 20 }} /> {/* Add space */}
        {/* Dropdown for VEG items */}
        <MUISelectStyled
          type="multiple"
          items={vegItems}
          placeHolder="VEG"
          vals={selectedVegItems.map(item => item.name)} // Convert to string[]
          setVals={(s: string[]) => setSelectedVegItems(s.map(name => ({ name } as Item)))}
        />
        <div style={{ width: 20 }} /> {/* Add space */}
        {/* Dropdown for NON_VEG items */}
        <MUISelectStyled
          type="multiple"
          items={nonVegItems}
          placeHolder="NON_VEG"
          vals={selectedNonVegItems.map(item => item.name)} // Convert to string[]
          setVals={(s: string[]) => setSelectedNonVegItems(s.map(name => ({ name } as Item)))}
        />
      </div>
          <div style={{ marginTop: 10 }}>
            <Button variant="outlined" color="primary" onClick={handleComplete}>
              Complete
            </Button>
            <Button variant="outlined" color="primary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
          {/* ... Other content ... */}
        </div>
      );
    };

export default AddOrEditMealView;