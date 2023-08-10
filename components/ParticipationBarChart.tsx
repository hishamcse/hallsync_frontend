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

export default function ParticipationBarChart(){

    const [mData, setmData] = useState<any[]>();
    const [date, setDate] = useState<Dayjs | null>();
    const [mealTime, setMealTime] = useState("DINNER");
    const options = ['DINNER', "LUNCH"]
    const handleOptionChange = (e : SelectChangeEvent ) =>{
        setMealTime(e.target.value);
    }

    const handleDate = (newValue: Dayjs | null) => {
        setDate(newValue);
    }


    let {data, loading} = useQuery(
        GET_PARTICIPATIONS,
        {
            variables : {
                from : date == undefined ? new Date().toString() : date.toString(),
                mealTime : mealTime
            },
            onCompleted : (data)=>{
                setmData(data.participants.map(d =>({
                    ... d,
                    day : new Date(d.mealPlan.day).toLocaleString('default',{
                        day : 'numeric',
                        month : 'short'
                    })
                })))
            }
        }
    )
    console.log(data)

    return(
        <div>
            {
                mData && 
                <MyCard content={
                    <div style={{
                        margin : "30px",
                        padding : "20px",
                        textAlign : "center",
                        backgroundColor : "black",
                        borderRadius : "10px"
                    }}>
                        <BarChartWhite barDataKey="_count" data={mData}
                        xAxisDataKey="day" />
                    </div>
                } title={
                <div style={{
                    display : "flex",
                    alignItems : "center",
                    justifyContent : "space-between"
                }}>
                    <h3> Participation List </h3>
                    <div style={{
                        display : "flex",
                        alignItems : "center"
                    }}>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker sx={{
                                    width : "160px",
                                }} value={date} 
                                                onChange={handleDate}/>
                            </LocalizationProvider>
                                
                        </div>
                        <div style={{
                            padding : "10px"
                        }}>
                            <MuiDropdown
                             change={handleOptionChange} options={options}
                            val={mealTime} width={150} />
                        </div>
                        
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


function BarChartWhite(
    props : {
        data : any[],
        xAxisDataKey : string,
        barDataKey : string
    }
) {

    return (
        <ResponsiveContainer width="95%" height={300} >
            <BarChart height={250} data={props.data} >
            {/* <CartesianGrid strokeDasharray="3 3" stroke='#ffffff' /> */}
            <XAxis dataKey={props.xAxisDataKey} stroke='#ffffff' />
            <YAxis stroke='#ffffff' />
            <Tooltip cursor = {{
                
            }} contentStyle={{
                backgroundColor : "black"
            }} />
            {/* <Legend /> */}
            <Bar label = {{
                fill : "#ffffff",
                position : "top"
            }}  dataKey={props.barDataKey} fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
  }