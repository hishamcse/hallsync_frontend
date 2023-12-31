import { Dayjs } from "dayjs";
import { CSSProperties, useState } from "react";
import MyCard from "../card";
import { GET_OPT_OUTS } from "../../graphql/operations";
import { useLazyQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { TitleMealTimeDate } from "../TitleMealTimeDate";
import {PieChart_} from "../PieChart_";


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
                <TitleMealTimeDate
                datePickerLabel="Day"
                date={date}
                handleDate={handleDate}
                mealTime={mealTime}
                setMealTime={setMealTime_}
                title="Opted In-Out"
            />
            }

            style={{
                minWidth : 650
            }}
        >
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
        </MyCard>
    )
}