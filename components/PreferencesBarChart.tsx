import { useLazyQuery } from "@apollo/client";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { GET_MEAL_PREF_STATS } from "../graphql/operations";
import MyCard from "./card";
import { MealTimeDropDown } from "./MealTimeDropDown";
import { MyDatePicker } from "./DatePicker";
import { MealPreferenceStatsQuery } from "../graphql/__generated__/graphql";
import { BarChartWhite } from "./ParticipationBarChart";
import { PieChart_ } from "./OptInPieChart";

const pieCharColors = ['#FF05C8', '#FFE605', '#00FFF5']

export function MealPreferencesBarChart(){
    const [mData, setmData] = useState<any[][]>([[]]);
    const [date, setDate] = useState<Dayjs | null>(null);
    const [mealTime, setMealTime] = useState("DINNER");
    const [pieChartData, setPieCharData] = useState<any[][]>([[]]);
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
        let pt : any[][] = []
        let types = ['VEG', 'NON_VEG','RICE']
        types.forEach(t =>{
            let tTypeItems = data.filter(d => d.item.type == t);
            let st = new Set();
            tTypeItems.forEach(i => st.add(i.order));
            let n = st.size;

            for(let order = 0; order < n; ++order){
                
                let arr = tTypeItems.filter(item => item.order == order).map(item =>({
                    count : item.count,
                    name : "%" + item.item.name
                }))
                let total = 0;
                arr.forEach(f =>{total += f.count})
                arr = arr.map(item =>({
                    count : Math.round(item.count * 100. / total),
                    name : item.name,
                    order : order + 1
                }))
                arr.sort((a, b) => a.name.localeCompare(b.name))
                pt.push(arr)
            }
        })
        setmData(rt);
        setPieCharData(pt);
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
                justifyContent : "space-between",
                alignItems : "center"
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
            <div>
                <div style={{
                    // display : "flex",
                    // padding : 20,
                    // margin : 20,
                    borderRadius : 10
                }}>
                    {
                        mData.filter(m=>m.length > 1).map((m, id) =>(
                            <div  key={id} style={{
                                margin : 10,
                                padding : 20,
                                backgroundColor : "black",
                                borderRadius : 10,
                                display : "inline-block"
                            }}>
                                <BarChartWhite  doNotUseResponsive = {true} barDataKey={["count"]} data={m} xAxisDataKey={"order"} />
                                <div style={{
                                    textAlign : "center"
                                }}>
                                    {m[0].name}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div style={{
                }}>
                    {
                        pieChartData.filter(d => d.length > 1).map((d, i) =>(
                            <div key={i} style={{
                                display : "inline-block",
                                backgroundColor : "black",
                                margin : 10,
                                padding : 20,
                                borderRadius : 10
                            }} >
                                <PieChart_ colors={pieCharColors} data={d} dataKey="count" h={250} w={450} />
                                <div style={{
                                    textAlign : "center"
                                }}>
                                    Preference #{d[0].order}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        } 
        style={{
            marginRight : 10,
            display : "block"
        }}
        />
        
        // <div>
        // </div>
    )

}