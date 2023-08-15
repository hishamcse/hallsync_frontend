import { SelectChangeEvent } from "@mui/material/Select";
import { Dayjs } from "dayjs";
import { CSSProperties, useState } from "react";
import { Cell, Label, Legend, Pie, PieChart, Tooltip } from "recharts";
import MyCard from "./card";
import { GET_OPT_OUTS } from "../graphql/operations";
import { useLazyQuery, useQuery } from "@apollo/client";
import { MyDatePicker } from "./DatePicker";
import { MealTimeDropDown } from "./MealTimeDropDown";
import { Typography } from "@mui/material";


export function OptInPieChart(){
    const [mData, setmData] = useState<any[]>([]);
    const [date, setDate] = useState<Dayjs | null>(null);
    const [mealTime, setMealTime] = useState("DINNER");
    function getData(date : string, mealTime : string){
        query({
            variables : {
                date : date,
                mealTime : mealTime
            },onCompleted: (data) => {
                let arr =  []
                arr.push({
                    count : Math.round((data.optedOutStats.total - data.optedOutStats.optedOut) * 100. /data.optedOutStats.total),
                    name : "%OptedIn"
                })
                arr.push({
                    count :  Math.round((data.optedOutStats.optedOut * 100.) / data.optedOutStats.total),
                    name : "%OptedOut"
                })
                setmData(arr);
                
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

    let [ query, {data, loading} ] = useLazyQuery(
        GET_OPT_OUTS,
    )

    let textDivStyle : CSSProperties = {
        padding : "10px 30px",
        backgroundColor : "black",
        borderRadius : 10,
        margin : 10
    }

    console.log(data);

    return (

        <MyCard
            title={
                <div style={{
                    display : "flex",
                    justifyContent : "space-between",
                    alignItems : "center"
                }}>
                    <h4>
                        Opted Out
                    </h4>
                    <div style={{
                        display : "flex",
                        justifyContent : "flex-end",
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
            }
            content={
                <div style={{
                    display : "flex",
                    alignItems : "center"
                }}>
                    <PieChart_ colors={['#FFE605', '#FFFFFF']} data={mData} dataKey="count" h={250} w={400} />
                    <div>
                        {
                            data &&
                            <div  style={textDivStyle}>
                                <Typography variant="subtitle2"> Total Opted In </Typography>
                                <Typography  variant="h5"> { data?.optedOutStats.total - data?.optedOutStats.optedOut} </Typography>
                                

                            </div>
                        }
                        { data &&
                            <div style={textDivStyle}>
                                <Typography variant="subtitle2" > Total Opted Out </Typography>
                                <Typography variant="h5"> {data?.optedOutStats.optedOut} </Typography>
                            </div>
                        }

                            
                    </div>
                </div>
            }

            style={{
                marginBottom : 20,
                minWidth : 650
            }}
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
          {/* <Tooltip /> */}
          <Legend  layout='vertical' align='right' verticalAlign='middle' />
          <Label>asdlfjsladfj sladkfj</Label>
        </PieChart>
    );
}