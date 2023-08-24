import React, {useState} from "react";
import {GetMealPlansQuery} from "../../graphql/__generated__/graphql";

import MyCard from "../card";
import {useQuery} from "@apollo/client";
import {GET_MULTIPLE_MEALPLANS} from "../../graphql/operations";
import SingleMealPlanView from "./singleMealPlan";


const DayMealPlan = (props: { mealPlans: GetMealPlansQuery['getMealPlans'] }) => {
    return (
        <div style={{width: '100%'}}>
            {props.mealPlans.map((mealPlan, index) => (
                <SingleMealPlanView mealPlan={mealPlan} key={index}/>
            ))}
        </div>
    )
}

const generateDateInfo = (nextDay: number) => {
    const today = new Date() // get today's date
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + nextDay) // Add 1 to today's date and set it to tomorrow
    return tomorrow.toLocaleDateString();
}

const MealView: React.FC = () => {

    const [mealPlans, setMealPlans] = useState<GetMealPlansQuery['getMealPlans']>([]);

    const {data} = useQuery(GET_MULTIPLE_MEALPLANS, {
        fetchPolicy: "no-cache",
        variables: {
            from: generateDateInfo(1),
            to: generateDateInfo(2)
        },
        onCompleted: (data) => {
            console.log("data", data);
            setMealPlans(data.getMealPlans);
        },
        onError: (error) => {
            console.log(error);
        }
    })

    return (
        <div>
            {mealPlans.map((mealPlan, index) => (
                index % 2 == 0 &&
                <div key={index} style={{margin: 20}}>
                    <MyCard title={new Date(mealPlan.day).toDateString()}>
                        <DayMealPlan mealPlans={[mealPlans[index], mealPlans[index + 1]]}/>
                    </MyCard>
                </div>
            ))}
        </div>
    );
};

export default MealView;
