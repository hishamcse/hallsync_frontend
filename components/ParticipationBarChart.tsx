import { useQuery } from "@apollo/client"
import { GET_PARTICIPATIONS } from "../graphql/operations"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from "react";
import MyCard from "./card";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import MuiDropdown from "./MUIDropdown";
import { SelectChangeEvent } from "@mui/material";
import { getDayAndMonthString } from "./utilities";
import { MyDatePicker } from "./DatePicker";
import { MealTimeDropDown } from "./MealTimeDropDown";


export function BarChartCard(props : {
    date : Dayjs | null,
    handleDate : (newValue: Dayjs | null) => void,
    barChart : React.JSX.Element,
    title : string,
    titleExtraContent? : React.JSX.Element
}){
    
    return(
        <div>
            {
                <MyCard content={
                    <div style={{
                        margin : "30px",
                        padding : "20px",
                        textAlign : "center",
                        backgroundColor : "black",
                        borderRadius : "10px"
                    }}>
                        {props.barChart}
                    </div>
                } title={
                <div style={{
                    display : "flex",
                    alignItems : "center",
                    justifyContent : "space-between"
                }}>
                    <h3> {props.title} </h3>
                    <div style={{
                        display : "flex",
                        alignItems : "center"
                    }}>
                        <div>
                            <MyDatePicker date={props.date} handleDate={props.handleDate} />
                                
                        </div>
                        {
                            props.titleExtraContent
                        }

                        
                    </div>
                </div>
            } style={{
                    display : "block",
                    margin : "20px"
                }} />
            }
        </div>
    )
}

export default function ParticipationBarChart(){

    const [mData, setmData] = useState<any[]>([]);
    const [date, setDate] = useState<Dayjs | null>(null);
    const [mealTime, setMealTime] = useState("DINNER");
    const options = ['DINNER', "LUNCH"]
    const handleOptionChange = (e : SelectChangeEvent ) =>{
        setMealTime(e.target.value);
    }

    const handleDate = (newValue: Dayjs | null) => {
        setDate(newValue);
    }


    let {loading} = useQuery(
        GET_PARTICIPATIONS,
        {
            variables : {
                from : date == undefined ? new Date().toString() : date.toString(),
                mealTime : mealTime
            },
            onCompleted : (data)=>{
                setmData(data.participants.map(d =>({
                    ... d,
                    day : getDayAndMonthString(d.mealPlan.day)
                })))
            }
        }
    )

    return (
        <BarChartCard barChart={
            <BarChartWhite barDataKey={["_count"]} data={mData} xAxisDataKey="day" />
        }  date={date} handleDate={handleDate} 
        title="Participations List" 
        titleExtraContent={
            <div style={{
                padding : "10px"
            }}>
                <MealTimeDropDown val={mealTime} setVal={setMealTime} />
            </div>
        }
        />
    )
}


export function BarChartWhite(
    props : {
        data : any[],
        xAxisDataKey : string,
        barDataKey : string[],
        colors? : string[]
    }
) {

    return (
        <ResponsiveContainer width="95%" height={300} >
            <BarChart  data={props.data} >
            {/* <CartesianGrid strokeDasharray="3 3" stroke='#ffffff' /> */}
            <XAxis dataKey={props.xAxisDataKey} stroke='#ffffff' padding={{
                left : 10,
            }} />
            <YAxis  stroke='#ffffff' padding={{
                top : 20
            }} />
            <Tooltip cursor = {{
                
            }} contentStyle={{
                backgroundColor : "black"
            }} />
            { props.barDataKey.length > 1  &&
                <Legend />}
            {
                props.barDataKey.map((bd, i) =>(
                    <Bar key={bd} label = {{
                        position : "top"
                    }}  dataKey={bd} fill= { (props.colors && props.colors[i]) ? props.colors[i] : "#8884d8"} />
                ))
            }
            </BarChart>
        </ResponsiveContainer>
    );
}