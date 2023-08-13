import { Dayjs } from "dayjs";
import { useState } from "react";
import { GET_RATINGS } from "../graphql/operations";
import { useQuery } from "@apollo/client";
import { getDayAndMonthString } from "./utilities";
import { BarChartCard, BarChartWhite } from "./ParticipationBarChart";
import { ExampleQueryQuery } from "../graphql/__generated__/graphql";

export function RatingBarChart(){
    
    const [mData, setmData] = useState<any[]>([]);
    const [date, setDate] = useState<Dayjs | null>(null);
    const handleDate = (newValue: Dayjs | null) => {
        setDate(newValue);
    }

    function formatData(ratings : ExampleQueryQuery['ratings']){
        let n = ratings.length;
        let set = new Set();
        let data = []
        for(let i = 0; i < n; ++i){
            if(set.has(ratings[i].feedback.feedbackId))
                continue;
            let m = ratings[i];
            let obj : any = {}
            ratings.forEach(r =>{
                if(r.feedback.feedbackId != ratings[i].feedback.feedbackId)
                    return;
                obj[r.type] = r.avg.toFixed(1);
            })
            obj["range"] = getDayAndMonthString(m.feedback.startMealPlan.day) + "-" + getDayAndMonthString(m.feedback.endMealPlan.day)
            data.push(obj)
            set.add(m.feedback.feedbackId);
        }
        console.log(data);
        setmData(data);
    }

    let {loading} = useQuery(
        GET_RATINGS,
        {
            variables : {
                date :  date == undefined ? new Date().toString() : date.toString()
            },
            onCompleted : (data)=>{
                formatData(data.ratings);
            },
            onError : (err)=>{
                console.log(err);
            }
        }
    )

    return (
        <BarChartCard barChart={
            <BarChartWhite colors={['#8884d8','#FCB07E','#EBE9E9', ]} barDataKey={["QUALITY","QUANTITY","MANAGEMENT"]} data={mData} xAxisDataKey="range" />
        }  date={date} handleDate={handleDate}
        title="Ratings"  />
    )
}