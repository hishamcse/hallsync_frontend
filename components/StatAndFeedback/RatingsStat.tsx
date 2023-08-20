import { Dayjs } from "dayjs";
import { useState } from "react";
import { GET_RATINGS } from "../../graphql/operations";
import { useLazyQuery, useQuery } from "@apollo/client";
import { getDayAndMonthString } from "../utilities";
import { BarChartCard, BarChartWhite } from "./ParticipationBarChart";
import { ExampleQueryQuery } from "../../graphql/__generated__/graphql";
import MyCard from "../card";
import { TitleDate } from "../TitleMealTimeDate";

export function RatingBarChart(){
    
    const [mData, setmData] = useState<any[]>([]);
    const [date, setDate] = useState<Dayjs | null>(null);
    const handleDate = (newValue: Dayjs | null) => {
        setDate(newValue);
        getData(newValue);
    }

    function getData(date : Dayjs | null){
        if(date){
            query({
                variables : {
                    date : date.toString()
                },
                onCompleted : (data)=>{
                    formatData(data.ratings);
                }
            })
        }
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

    let [query, {loading}] = useLazyQuery(
        GET_RATINGS
    )

    return (
        <MyCard
        title={<TitleDate datePickerLabel="From" date={date} handleDate={handleDate} title="Ratings" />}
        content={
            <div>
                {
                    mData.length > 0 &&
                    <BarChartWhite colors={['#8884d8','#FCB07E','#EBE9E9', ]} barDataKey={["QUALITY","QUANTITY","MANAGEMENT"]} data={mData} xAxisDataKey="range" />
                }
            </div>
        }
        style={{
            display: 'block',
            marginRight: 20
        }}
        />
    )
}