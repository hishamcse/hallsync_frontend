import { useQuery } from "@apollo/client"
import { GET_ABSENTEES, GET_PARTICIPATIONS } from "../graphql/operations"
import { useState } from "react";
import { Dayjs } from "dayjs";
import { SelectChangeEvent, TextField } from "@mui/material";
import { BarChartCard, BarChartWhite } from "./ParticipationBarChart";


export function AbsenteesBarChart(){

    const [mData, setmData] = useState<any[]>([]);
    const [date, setDate] = useState<Dayjs | null>(null);
    const [mealTime, setMealTime] = useState("DINNER");
    const options = ['DINNER', "LUNCH"]
    const handleOptionChange = (e : SelectChangeEvent ) =>{
        setMealTime(e.target.value);
    }
    const [top, setTop] = useState(10);

    const handleDate = (newValue: Dayjs | null) => {
        setDate(newValue);
    }


    let {loading} = useQuery(
        GET_ABSENTEES,
        {
            variables : {
                from : date == undefined ? new Date().toString() : date.toString(),
                take : top
            },
            onCompleted : (data)=>{
                setmData(data.absentees.map(d =>({
                    absent : d._count,
                    id : d.residency.student.student9DigitId.substring(2)
                })))
            }
        }
    )

    return (
        <BarChartCard barChart={
            <BarChartWhite barDataKey="absent" data={mData} xAxisDataKey="id" />
        }  date={date} handleDate={handleDate} handleOptionChange={handleOptionChange}
        mealTime={mealTime} options={options} showDropDown = {false} 
        title="Absentees List" titleExtraContent={
            <div>
                <TextField
                    sx = {{
                        width : 120,
                        marginLeft : "10px"
                    }}
                    label="Top"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value = {top}
                    onChange = {(e : any)=>setTop(parseInt(e.target.value))}
                />
            </div>
        } />
    )
}
