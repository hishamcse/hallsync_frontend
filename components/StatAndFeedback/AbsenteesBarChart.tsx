import { useLazyQuery } from "@apollo/client"
import { GET_ABSENTEES } from "../../graphql/operations"
import { useState } from "react";
import { Dayjs } from "dayjs";
import { Box, FormControl, OutlinedInput } from "@mui/material";
import { BarChartWhite } from "./ParticipationBarChart";
import MyCard from "../card";
import { TitleDate } from "../TitleMealTimeDate";


export function AbsenteesBarChart() {

    const [mData, setmData] = useState<any[]>([]);
    const [date, setDate] = useState<Dayjs | null>(null);

    const [top, setTop] = useState(10);

    
    function getData(date : Dayjs | null, top : number){
        if(date){
            query({
                variables : {
                    from : date?.toString(),
                    take : top
                },
                onCompleted: (data) => {
                    setmData(data.absentees.map(d => ({
                        absent: d._count,
                        id: d.residency.student.student9DigitId.substring(2)
                    })))
                },
                onError : (err)=>{
                    console.log(err)
                }
            })
        }
    }

    const handleDate = (newValue: Dayjs | null) => {
        setDate(newValue);
        getData(newValue, top);
    }

    function setTopWrapper(i : number){
        setTop(i);
        getData(date, i);
    }

    let [ query, {loading}]  = useLazyQuery(
        GET_ABSENTEES
    )

    return (
        <MyCard

            title={
                <TitleDate datePickerLabel="From" date={date} handleDate={handleDate} title="Absentees" >
                    <div>
                        <Box component="form" noValidate autoComplete="off">
                            <FormControl sx={{
                                    width: '8ch', 
                                    backgroundColor : "black",
                                    '& input' : {
                                        padding : '9px'
                                    }
                                }}>
                                <OutlinedInput value={top} 
                                onChange={(e: any) => setTopWrapper(parseInt(e.target.value))}
                                type="number" placeholder="Top" />
                            </FormControl>
                        </Box>
                    </div>
                </TitleDate>
            }
            content={
                <div>
                    {
                        mData.length > 0 &&
                        <BarChartWhite barDataKey={["absent"]} data={mData} xAxisDataKey="id" />
                    }
                </div>
            }
            style={{
                display: "block",
                marginRight: 10
            }}
        />
    )
}
