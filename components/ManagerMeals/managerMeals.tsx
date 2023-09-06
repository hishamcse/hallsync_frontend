import React, { useEffect, useState } from "react";
import { GetMealPlanQuery, GetMealPlansQuery } from "../../graphql/__generated__/graphql";
import MyCard from "../card";
import { useLazyQuery, useQuery } from "@apollo/client";
import {  GET_MEAL_PLAN, GET_MULTIPLE_MEALPLANS } from "../../graphql/operations";
import SingleMealPlanView from "./MealPlan";
import AddOrEditMealView from "./addOrEditMeal";
import { Dayjs } from "dayjs";
import { TitleMealTime, TitleMealTimeDate } from "../TitleMealTimeDate";
import AddNewItemView from "./addNewItem";

import styles from "../../styles/components.module.scss";
import { CustomDay } from "./calender";
import { MyButton } from "../button";
import { MealItem } from "../itemCard";
import { server } from "../utilities";
import { Loading } from "../../pages";

const DayMealPlan = (props: {
    mealPlans: GetMealPlansQuery["getMealPlans"];
}) => {
    return (
        <div style={{ width: "100%" }}>
            {props.mealPlans.map((mealPlan, index) => (
                <SingleMealPlanView mealPlan={mealPlan} key={index} />
            ))}
        </div>
    );
};

const generateDateInfo = (nextDay: number) => {
    const today = new Date(); // get today's date
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + nextDay); // Add 1 to today's date and set it to tomorrow
    return tomorrow.toLocaleDateString();
};

const ManagerMealView: React.FC = () => {
    const [mealPlans, setMealPlans] = useState<
        GetMealPlansQuery["getMealPlans"]
    >([]);

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedMealTime, setSelectedMealTime] = useState<string>("LUNCH");
    const [selectedMealTimeCalender, setSelectedMealTimeCalender] = useState<string>("LUNCH");
    const [selectedDateCalender, setSelectedDateCalender] = useState<Dayjs | null>(null);
    const [selectedMeal, setSelectedMeal ] = useState<GetMealPlanQuery['getMealPlan']['meal']>();

    let [query, {data : mealData, error , loading}] = useLazyQuery(GET_MEAL_PLAN, {
        onError  : (err)=>{
            console.log(err)
        }
    })

    useEffect(()=>{
        if(selectedDateCalender){
            query({
                variables : {
                    date : selectedDateCalender.toString(),
                    mealTime : selectedMealTimeCalender
                }
            })
        }
    }, [selectedMealTimeCalender, selectedDateCalender])


    const { data } = useQuery(GET_MULTIPLE_MEALPLANS, {
        fetchPolicy: "no-cache",
        variables: {
            from: generateDateInfo(1),
            to: generateDateInfo(2),
        },
        onCompleted: (data) => {
            console.log("data", data);
            setMealPlans(data.getMealPlans);
        },
        onError: (error) => {
            console.log(error);
        },
    });


    
    return (
        <div>
            <div className={styles.managerMealRootContainer}
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                }}
            >
                <MyCard
                    title={
                        <TitleMealTimeDate
                            datePickerLabel="Day"
                            date={selectedDate}
                            handleDate={setSelectedDate}
                            mealTime={selectedMealTime}
                            setMealTime={setSelectedMealTime}
                            title="Add Meal"
                        />
                    }
                    style={{
                        width: 600,
                    }}
                >
                    <AddOrEditMealView
                        selectedDate={selectedDate}
                        selectedMealTime={selectedMealTime}
                        setSelectedDate={setSelectedDate}
                        setSelectedMealTime={setSelectedMealTime}
                        selectedMeal={selectedMeal}
                    />
                </MyCard>
                <div style = {{
                    display : "inline-block"
                }}>
                    <MyCard title = {<TitleMealTime mealTime={selectedMealTimeCalender} 
                    setMealTime={setSelectedMealTimeCalender} title="Meals Added"  />} style={{
                        display : "block",
                        textAlign : "center",
                        width : 550,
                    }} >
                        <CustomDay date={selectedDateCalender} setDate={setSelectedDateCalender} mealTime={selectedMealTimeCalender} />
                        <div style={{
                            minHeight : 80,
                        }}>
                            {
                                loading && <Loading />
                            }
                            {
                                mealData && 
                                mealData.getMealPlan.meal.items.map(item =>{
                                    let imagePath = 'default.png';
                                    // console.log(item);
                                    if(item.photo){
                                    imagePath = item.photo.file.newFileName;
                                    }
                                    imagePath = server + imagePath;
                                    return (
                                        <MealItem height = {60} width={50} key={item.itemId} imagePath={imagePath} item={item} style={{
                                            display : "inline-block"
                                        }}  />
                                    )
                                })
                            }
                        </div>
                        <div>
                            <MyButton buttonProps={{
                                disabled : selectedDateCalender === null
                            }} text="Use Menu" type="submit" onClick={()=>{
                                if(mealData)
                                    setSelectedMeal(mealData.getMealPlan.meal);
                            }} />
                        </div>
                    </MyCard>
                </div>
            </div>

            <MyCard title={"Add New Item"} style={{
                width : 600,
                display : "block",
                marginTop   : 10,
            }} >
                <AddNewItemView />
            </MyCard>
        </div>
    );
};

export default ManagerMealView;
