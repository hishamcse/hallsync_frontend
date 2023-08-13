import { SelectChangeEvent } from "@mui/material/Select";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import MyCard from "./card";
import { GET_OPT_OUTS } from "../graphql/operations";
import { useQuery } from "@apollo/client";
import { MyDatePicker } from "./DatePicker";
import { MealTimeDropDown } from "./MealTimeDropDown";


export function OptInPieChart(){
    const [mData, setmData] = useState<any[]>([]);
    const [date, setDate] = useState<Dayjs | null>(null);
    const [mealTime, setMealTime] = useState("DINNER");
    const options = ['DINNER', "LUNCH"]
    const handleOptionChange = (e: SelectChangeEvent) => {
        setMealTime(e.target.value);
    }
    const handleDate = (newValue: Dayjs | null) => {
        setDate(newValue);
    }

    let { loading } = useQuery(
        GET_OPT_OUTS,
        {
            variables: {
                date: date == undefined ? new Date().toString() : date.toString(),
                mealTime : mealTime
            },
            onCompleted: (data) => {
                let arr =  []
                arr.push({
                    count : data.optedOutStats.total - data.optedOutStats.optedOut,
                    name : "OptedIn"
                })
                arr.push({
                    count : data.optedOutStats.optedOut,
                    name : "OptedOut"
                })
                setmData(arr);
                
            }
        }
    )



    return (

        <MyCard
            title={<div>
                 <MyDatePicker date={date} handleDate={handleDate} />
                 <MealTimeDropDown setVal={setMealTime} val={mealTime} />
            </div>}
            content={
                <PieChart_ colors={['#FFE605', '#FFFFFF']} data={mData} dataKey="count" h={400} w={400} />
            }
        />
    )
}

export function PieChart_(
    props : {
        w : number,
        h : number,
        data : any[],
        dataKey : string,
        colors : string[],
        ir? : number,
        or? : number
    }
) {

    return (
        <PieChart width={props.w} height={props.h}>
          {/* <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" /> */}
          <Pie data={props.data} dataKey={props.dataKey} 
          cx="50%" cy="50%" innerRadius={props.ir ?? 70} outerRadius={props.or ?? 90}  
          label paddingAngle={5} >
            {
              props.data.map((d, i) =>(
                <Cell key={d.name} fill={props.colors[i]} />
              ))
            }
          </Pie>
          <Tooltip />
          <Legend  layout='vertical' align='right' verticalAlign='middle' />
        </PieChart>
    );
}