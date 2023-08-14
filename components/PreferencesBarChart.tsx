import { useLazyQuery } from "@apollo/client";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { GET_MEAL_PREF_STATS } from "../graphql/operations";
import MyCard from "./card";
import { MealTimeDropDown } from "./MealTimeDropDown";
import { MyDatePicker } from "./DatePicker";
import { MealPreferenceStatsQuery } from "../graphql/__generated__/graphql";
import { BarChartWhite } from "./ParticipationBarChart";

export function MealPreferencesBarChart(){
    const [mData, setmData] = useState<any[][]>([[]]);
    const [date, setDate] = useState<Dayjs | null>(null);
    const [mealTime, setMealTime] = useState("DINNER");
    
    let [ query, {data, loading} ] = useLazyQuery(
        GET_MEAL_PREF_STATS,
    )
    function processData(data : MealPreferenceStatsQuery['mealPreferenceStats']){
        let rt : any[][] = []
        let n = data.length;
        let set = new Set();
        for(let i = 0; i < n; ++i){
            let pref = data[i];
            if(set.has(pref.item.itemId)){
                continue;
            }
            let arr : any[] = []
            data.forEach(p =>{
                if(p.item.itemId == pref.item.itemId){
                    arr.push({
                        order : p.order + 1,
                        name : p.item.name,
                        count : p.count
                    })
                }
            })
            set.add(pref.item.itemId);
            rt.push(arr);
        }
        setmData(rt);
    }
    function getData(date : string, mealTime : string){
        query({
            variables : {
                date : date,
                mealTime : mealTime
            },onCompleted: (data) => {
                console.log(data);
                processData(data.mealPreferenceStats);
            }
        })
    }
    
    const setMealTime_ = (s : string) => {
        setMealTime(s);
        if(date){
            getData(date.toString(), s);
        }
    }
    const handleDate = (newValue: Dayjs | null) => {
        setDate(newValue);
        if(newValue){
            getData(newValue.toString(), mealTime);
        }
    }


    return(
        <MyCard title={
            <div style={{
                display : "flex",
                justifyContent : "space-between"
            }}>
                <h4>
                    Preferences
                </h4>
                <div style={{
                    display : "flex",
                    alignItems : "center"
                }}>
                    <div style={{
                        padding : "10px"
                    }}>
                        <MealTimeDropDown setVal={setMealTime_} val={mealTime} />
                    </div>
                    <MyDatePicker date={date} handleDate={handleDate} />
                </div>
            </div>
        } content={
            <div style={{
                display : "flex",
                padding : 20,
                margin : 20,
                borderRadius : 10
            }}>
                {
                    mData.filter(m=>m.length > 1).map((m, id) =>(
                        <div  key={id} style={{
                            padding : 10,
                            paddingRight : 30,
                            margin : 10,
                            backgroundColor : "black",
                            borderRadius : 10
                        }}>
                            <BarChartWhite xLabel={m[0].name} doNotUseResponsive = {true} barDataKey={["count"]} data={m} xAxisDataKey={"order"} />
                        </div>
                    ))
                }
            </div>
        } />
        // <div>
        // </div>
    )

}