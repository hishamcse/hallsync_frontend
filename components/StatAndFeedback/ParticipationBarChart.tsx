import {useLazyQuery} from "@apollo/client"
import {GET_PARTICIPATIONS} from "../../graphql/operations"
import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label} from 'recharts';
import {useState} from "react";
import MyCard from "../card";
import {Dayjs} from "dayjs";
import {getDayAndMonthString} from "../utilities";
import {TitleMealTimeDate} from "../TitleMealTimeDate";

export default function ParticipationBarChart() {

    const [mData, setmData] = useState<any[]>([]);
    const [date, setDate] = useState<Dayjs | null>(null);
    const [mealTime, setMealTime] = useState("DINNER");

    function getData(date: Dayjs | null, mealTime: string) {
        if (date) {
            query({
                variables: {
                    from: date?.toString(),
                    mealTime: mealTime
                },
                onCompleted: (data) => {
                    setmData(data.participants.map(d => ({
                        ...d,
                        day: getDayAndMonthString(d.mealPlan.day)
                    })))
                }
            })
        }
    }

    function setMealTimeWrapper(s: string) {
        setMealTime(s);
        getData(date, s);
    }

    const handleDate = (newValue: Dayjs | null) => {
        setDate(newValue);
        getData(newValue, mealTime);
    }


    let [query, {}] = useLazyQuery(
        GET_PARTICIPATIONS
    )

    return (
        <MyCard
            title={
                <TitleMealTimeDate
                    datePickerLabel="From"
                    date={date}
                    handleDate={handleDate}
                    mealTime={mealTime}
                    setMealTime={setMealTimeWrapper}
                    title="Participations"
                />
            }
            style={{
                display: "block",
                marginRight: 10
            }}
        >
            <div>
                {
                    mData.length > 0 &&
                    <BarChartWhite barDataKey={["_count"]} data={mData} xAxisDataKey="day"/>
                }
            </div>

        </MyCard>
    )
}


export function BarChartWhite(
    props: {
        data: any[],
        xAxisDataKey: string,
        barDataKey: string[],
        colors?: string[],
        doNotUseResponsive?: boolean,
        xLabel?: string
    }
) {
    let hwProps = {}
    if (props.doNotUseResponsive) {
        hwProps = {
            height: 250,
            width: 450
        }
    }
    let Inner = (
        <BarChart data={props.data} {...hwProps} margin={{
            bottom: 10,
            right: 10
        }}>
            {/* <CartesianGrid strokeDasharray="3 3" stroke='#ffffff' /> */}
            <XAxis dataKey={props.xAxisDataKey} stroke='#ffffff' padding={{
                left: 10,
            }}>
                {
                    props.xLabel &&
                    <Label value={props.xLabel} offset={-5} position="insideBottom"/>
                }
            </XAxis>
            <YAxis stroke='#ffffff' padding={{
                top: 20
            }}/>
            <Tooltip cursor={{}} contentStyle={{
                backgroundColor: "black"
            }}/>
            {props.barDataKey.length > 1 &&
                <Legend/>}
            {
                props.barDataKey.map((bd, i) => (
                    <Bar key={bd} label={{
                        position: "top"
                    }} dataKey={bd} fill={(props.colors && props.colors[i]) ? props.colors[i] : "#8884d8"}/>
                ))
            }
        </BarChart>
    )

    if (!props.doNotUseResponsive) {
        return (
            <ResponsiveContainer width="95%" height={300}>
                {Inner}
            </ResponsiveContainer>
        );
    }
    return Inner;

}