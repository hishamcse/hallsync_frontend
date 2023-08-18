import {GetMealPlansQuery} from "../../graphql/__generated__/graphql";
import {useRouter} from "next/router";
import React, {useRef, useState} from "react";
import {useMutation} from "@apollo/client";
import {ADD_PREFERENCES, OPT_OUT_MEAL, ADD_MEALPLAN} from "../../graphql/operations";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import {Button, Checkbox} from "@mui/material";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DragHandleIcon from "@mui/icons-material/DragHandle";

// const DraggableList = (props: { list: string[], setList: (list: string[]) => void, disabled: boolean }) => {

//     const dragItem: React.MutableRefObject<any> = useRef();
//     const dragOverItem: React.MutableRefObject<any> = useRef();
//     const [list, setList] = useState(props.list);

//     const dragStart = (e: any, position: number) => {
//         dragItem.current = position;
//         console.log(e.target.innerHTML);
//     };

//     const dragEnter = (e: any, position: number) => {
//         dragOverItem.current = position;
//         console.log(e.target.innerHTML);
//     };

//     const drop = () => {
//         const copyListItems = [...list];
//         const dragItemContent = copyListItems[dragItem.current];
//         copyListItems.splice(dragItem.current, 1);
//         copyListItems.splice(dragOverItem.current, 0, dragItemContent);
//         dragItem.current = null;
//         dragOverItem.current = null;
//         setList(copyListItems);
//         props.setList(copyListItems);
//     };

//     return (
//         <Paper sx={{maxWidth: '100%'}}>
//             <MenuList>
//                 {
//                     list &&
//                     list.map((item, index) => (
//                         <MenuItem style={{
//                             textAlign: 'center', fontSize: '12px', backgroundColor: '#000',
//                             margin: '5px', padding: '10px', borderRadius: '10px', border: '1px solid #fff'
//                         }}
//                                   onDragStart={(e) => dragStart(e, index)}
//                                   onDragEnter={(e) => dragEnter(e, index)}
//                                   onDragEnd={drop}
//                                   key={index}
//                                   draggable disabled={props.disabled}>
//                             <ListItemIcon>
//                                 {index + 1}
//                             </ListItemIcon>&nbsp;
//                             <ListItemText>{item}</ListItemText>&nbsp;&nbsp;
//                             <DragHandleIcon/>
//                         </MenuItem>
//                     ))}
//             </MenuList>
//         </Paper>
//     );
// }

const AddOrEditMealView = (props: { mealPlan: GetMealPlansQuery['getMealPlans'][0] }) => {

    const router = useRouter();

    let nonVegList;

    if(!props.mealPlan.preferences || props.mealPlan.preferences.length === 0) {
        nonVegList = props.mealPlan.meal.items.filter((item) => {
            return item.type.toString().toLowerCase() == 'non_veg';
        }).map((item) => item.name);
    } else {
        nonVegList = props.mealPlan.preferences.filter((pref) => {
            return pref.item.type.toString().toLowerCase() == 'non_veg';
        }).sort((a, b) => a.order - b.order)
            .map((pref) => pref.item.name);
    }

    const list = nonVegList.map((item) => {
        return item;
    });

    const getSelecteds = (names: string[]) => {
        let selecteds: GetMealPlansQuery['getMealPlans'][0]['meal']['items'] = [];
        names.forEach((name) => {
            selecteds.push(props.mealPlan.meal.items.filter((item) => {
                return item.name == name;
            })[0]);
        });

        return selecteds;
    }

    const [strList, setStrList] = useState<string[]>(list);
    const [optedOut, setOptedOut] = useState<boolean>(!!props.mealPlan.optedOut);

    const [reqError, setReqError] = useState(false);
    const [reqErrorMsg, setReqErrorMsg] = useState('');

    let disabled = !!props.mealPlan.optedOut;

    let prefDisabled = (props.mealPlan.preferences && props.mealPlan.preferences.length > 0) || false;

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

    const handleOptOut = () => {
        setOptedOut(!optedOut);
    }

    const handleComplete = () => {
        // if (optedOut) {
        //     // call mutation to opt out
        //     optOutRequest({
        //         variables: {
        //             mealPlanId: props.mealPlan.mealPlanId
        //         }
        //     }).then((data) => {
        //         disabled = true;
        //         console.log(data);
        //     }).catch((error) => {
        //         console.log(error);
        //     });

        //     return;
        // }

        const selected = getSelecteds(strList);

        const selectedPrefs = selected.map((item, index) => {
            return {
                itemId: item.itemId,
                order: index
            }
        });

        const preferences = {
            preferences: selectedPrefs
        }

        console.log(selected)
        console.log(preferences)

        // call mutation to add preferences
        addPreferences({
            variables: {
                mealPlanId: props.mealPlan.mealPlanId,
                preferences: preferences
            }
        }).then((data) => {
            prefDisabled = true;
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            {/* <Typography style={{marginTop: 15, marginBottom: 5}}>
                <b>{props.mealPlan.mealTime.toString()}</b>
            </Typography> */}

            <div style={{borderTop: "1px solid #ccc"}}>
                <div style={{display: "flex", margin: "16px"}}>
                    {/* <div style={{display: "flex", alignItems: "center", justifyContent: 'space-between', margin: 10}}>
                        {props.mealPlan.meal.items.map((item, index: number) => {
                            let cupcountA = props.mealPlan.cupCount.filter(c => c.itemId == item.itemId);
                            let cupcount = "NA"
                            if(cupcountA.length  > 0){
                                cupcount = cupcountA[0].cupcount.toString();
                            }
                            return (
                                <div key={index} style={{margin: 10}}>
                                    <Image src={importedImgPath(item.photo?.file.fileName ?? 'default.png')}
                                           alt='foodItem'
                                           width={820 / props.mealPlan.meal.items.length}
                                           height={650 / props.mealPlan.meal.items.length}/>
                                    <Typography variant="body2" textAlign='center'>
                                        {item.name}
                                        {item.type.toString().toLowerCase() != 'rice' &&
                                        item.type.toString().toLowerCase() != 'veg' ?
                                            `(${ cupcount } cups)` : ""}
                                    </Typography>
                                </div>
                            )
                        } 
                        )}
                    </div> */}

                    <div style={{
                        display: "block", alignItems: "center", borderLeft: "1px solid #ccc",
                        paddingLeft: "16px", marginLeft: 15
                    }}>
                        {/* <div style={{display: "flex", alignItems: "center",}}>
                            <Typography variant="body2" color="red"><b>Opt Out</b></Typography>
                            {
                                !disabled &&
                                <Checkbox onChange={handleOptOut} value={optedOut}/>
                            }
                            {
                                disabled &&
                                <Checkbox onChange={handleOptOut} value={optedOut} disabled={disabled} checked/>
                            }

                        </div> */}
                        {/* <div style={{display: 'inline-grid'}}>
                            <Typography variant="body2" color="#00ff00"
                                        style={{marginTop: 10}}><b>Preferences</b></Typography> */}
                            {/*{!disabled &&*/}
                                {/* <DraggableList list={list} setList={handleList}
                                               disabled={prefDisabled || optedOut}/> */}
                            {/*}*/}
                        {/* </div> */}

                        {!disabled && <div style={{textAlign: 'center'}}>
                            <Button variant="outlined" color="primary"
                                    style={{marginTop: 10}} size='small' onClick={handleComplete}>
                                Complete
                            </Button>
                        </div>}
                        {!disabled && <div style={{textAlign: 'center', color: 'red'}}>
                            <Button variant="outlined" color="primary"
                                    style={{marginTop: 10}} size='small' onClick={handleComplete}>
                                Cancel
                            </Button>
                        </div>}

                        {reqError && <Typography variant="body2" color="red">
                            <b>{reqErrorMsg}</b>
                        </Typography>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddOrEditMealView;