import {GetMealPlansQuery} from "../../graphql/__generated__/graphql";
import {useRouter} from "next/router";
import React, {useRef, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {ADD_PREFERENCES, OPT_OUT_MEAL, ADD_MEALPLAN, GET_DEPTS} from "../../graphql/operations";
import Typography from "@mui/material/Typography";
import MUISelectStyled from "../MUIMultiSelectCheckbox";
import { MyDatePicker } from "../DatePicker";
import { MealTimeDropDown } from "../MealTimeDropDown";
// import Image from "next/image";
import {Button, Checkbox} from "@mui/material";
// import Paper from "@mui/material/Paper";
// import MenuList from "@mui/material/MenuList";
// import MenuItem from "@mui/material/MenuItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import DragHandleIcon from "@mui/icons-material/DragHandle";


const AddOrEditMealView = () => {

    const router = useRouter();

    let nonVegList;

    // if(!props.mealPlan.preferences || props.mealPlan.preferences.length === 0) {
    //     nonVegList = props.mealPlan.meal.items.filter((item) => {
    //         return item.type.toString().toLowerCase() == 'non_veg';
    //     }).map((item) => item.name);
    // } else {
    //     nonVegList = props.mealPlan.preferences.filter((pref) => {
    //         return pref.item.type.toString().toLowerCase() == 'non_veg';
    //     }).sort((a, b) => a.order - b.order)
    //         .map((pref) => pref.item.name);
    // }

    // const list = nonVegList.map((item) => {
    //     return item;
    // });

    // const getSelecteds = (names: string[]) => {
    //     let selecteds: GetMealPlansQuery['getMealPlans'][0]['meal']['items'] = [];
    //     names.forEach((name) => {
    //         selecteds.push(props.mealPlan.meal.items.filter((item) => {
    //             return item.name == name;
    //         })[0]);
    //     });

    //     return selecteds;
    // }

    //const [strList, setStrList] = useState<string[]>(list);
    //const [optedOut, setOptedOut] = useState<boolean>(!!props.mealPlan.optedOut);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedMealTime, setSelectedMealTime] = useState<string>('LUNCH');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const [reqError, setReqError] = useState(false);
    const [reqErrorMsg, setReqErrorMsg] = useState('');

    // let disabled = !!props.mealPlan.optedOut;

    // let prefDisabled = (props.mealPlan.preferences && props.mealPlan.preferences.length > 0) || false;


    

    

    const [optOutRequest, {}] = useMutation(
        OPT_OUT_MEAL, {
            onError: (error) => {
                console.log(error);
                setReqError(true)
                setReqErrorMsg(error.message)
            },
            onCompleted: (data) => {
                console.log(data);
                router.reload();
            }
        }
    )

    const [addPreferences, {}] = useMutation(
        ADD_PREFERENCES, {
            onError: (error) => {
                console.log(error);
                setReqError(true)
                setReqErrorMsg(error.message)
            },
            onCompleted: (data) => {
                console.log(data);
                router.reload();
            }
        }
    )

    const [addMealPlan, {}] = useMutation(
        ADD_PREFERENCES, {
            onError: (error) => {
                console.log(error);
                setReqError(true)
                setReqErrorMsg(error.message)
            },
            onCompleted: (data) => {
                console.log(data);
                router.reload();
            }
        }
    )
    

    const importedImgPath = (imgName: string) => {
        return "/images/" + imgName;
    }

    const handleList = (list: string[]) => {
        setStrList(list);
    }

    // const handleOptOut = () => {
    //     setOptedOut(!optedOut);
    // }

    const handleComplete = () => {

        // const selected = getSelecteds(strList);

        // const selectedPrefs = selected.map((item, index) => {
        //     return {
        //         itemId: item.itemId,
        //         order: index
        //     }
        // });

        // const preferences = {
        //     preferences: selectedPrefs
        // }

        // console.log(selected)
        // console.log(preferences)

        // // call mutation to add preferences
        // addPreferences({
        //     variables: {
        //         mealPlanId: props.mealPlan.mealPlanId,
        //         preferences: preferences
        //     }
        // }).then((data) => {
        //     prefDisabled = true;
        //     console.log(data);
        // }).catch((error) => {
        //     console.log(error);
        // });
    }

    const handleCancel = () => {
        // Handle the Cancel button action
      };

    const handleDateChange = (newDate: Dayjs | null) => {
        setSelectedDate(newDate); // Step 3
        // Perform actions based on the selected date
    };

    const handleMealTimeChange = (newMealTime: string) => {
        setSelectedMealTime(newMealTime); // Step 2
        // Perform actions based on the selected meal time
    };

    // Define a function to handle the action based on selected departments
    const handleItemSelection = (selected: string[]) => {
        setSelectedItems(selected);
        // Perform your desired action here based on the selected departments
        // For example: update state, make API calls, etc.
    };



    // done with departments for now. need replacing with food items
    const { loading, error, data } = useQuery(GET_DEPTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const oldItems = data?.departments;

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
          <MUISelectStyled
            type="multiple"
            items={oldItems.map((item) => item.name)}
            placeHolder="Select Departments"
            vals={selectedItems}
            setVals={setSelectedItems}
          />
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

//     return (
//         <div>
//             {/* <Typography style={{marginTop: 15, marginBottom: 5}}>
//                 <b>{props.mealPlan.mealTime.toString()}</b>
//             </Typography> */}

//             <div style={{borderTop: "1px solid #ccc"}}>
//                 <div style={{display: "flex", margin: "16px"}}>
//                     <div>
//                     <MyDatePicker // Step 1
//                         date={selectedDate}
//                         handleDate={handleDateChange}
//                     />
                    
//                         <Typography variant="h6" style={{ marginBottom: 10 }}>
//                         Departments:
//                         </Typography>
//                         <MUISelectStyled
//                             type="multiple"
//                             items={oldItems.map(item => item.name)}
//                             placeHolder="Select Departments"
//                             vals={selectedItems}
//                             setVals={handleItemSelection}
//                         />
//                     </div>


//                     <div style={{
//                         display: "block", alignItems: "center", borderLeft: "1px solid #ccc",
//                         paddingLeft: "16px", marginLeft: 15
//                     }}>
       
//                         {!disabled && <div style={{textAlign: 'center'}}>
//                             <Button variant="outlined" color="primary"
//                                     style={{marginTop: 10}} size='small' onClick={handleComplete}>
//                                 Complete
//                             </Button>
//                         </div>}
//                         {!disabled && <div style={{textAlign: 'center', color: 'red'}}>
//                             <Button variant="outlined" color="primary"
//                                     style={{marginTop: 10}} size='small' onClick={handleComplete}>
//                                 Cancel
//                             </Button>
//                         </div>}

//                         {reqError && <Typography variant="body2" color="red">
//                             <b>{reqErrorMsg}</b>
//                         </Typography>}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default AddOrEditMealView;