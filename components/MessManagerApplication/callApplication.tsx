import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CALL, GET_ASSIGNED_TILL } from "../../graphql/operations";
import { addDay, getDayAndMonthAndYearString , addDays} from "../utilities";
import MyCard from "../card";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { MyDatePicker } from "../DatePicker";
import { MyButton } from "../button";
import styles from '../../styles/components.module.scss'

export function CallApplicationTsx(){

    let {data, loading, error} = useQuery(
        GET_ASSIGNED_TILL,
        {
            onCompleted : (data)=>{
                console.log(data);
                setFromDate(dayjs(addDay(data.callUntil)));
                setToDate(dayjs(addDays(data.callUntil, 30)))
            }
        }
    )

    const [fromDate, setFromDate] = useState<Dayjs | null>(null);
    const [toDate, setToDate] = useState<Dayjs | null>(null);
    const [message, setMessage] = useState<string>();
    
    let [query, {data : callData}] = useMutation(
        CREATE_CALL
    )

    function setFuncWrapper(f : (s : any)=>void){
        return (a : any)=>{
            f(a);
            setMessage(undefined);
        }
    }

    function CreateCallOnClick(){
        if(!fromDate || !toDate){
            return;
        }
        query({
            variables : {
                from : fromDate.toISOString(),
                to : toDate.toISOString()
            },
            onCompleted : (data)=>{
                setFromDate(null);
                setToDate(null);
                setMessage("Call Created");
            },
            onError : (err)=>{
                setMessage( "error : " + err.message);
            }
        })
    }

    return (

        <MyCard title={"Call For Mess Manager Applications"} content={
            <div className={styles.callForContentRoot}>
                <div>
                    <div>
                        Mess Manager Assigned Upto
                    </div>
                    <div>
                        <span className={styles.rangeSpan}>
                            {data && getDayAndMonthAndYearString(new Date(data.messManagerAssignedTill).toString())}
                        </span>
                    </div>
                </div>
                <div>
                    <div>
                        Applications Called Upto
                    </div>
                    <div>
                        <span className={styles.rangeSpan}>
                            {data && getDayAndMonthAndYearString(new Date(data.callUntil).toString())}
                        </span>
                    </div>
                </div>
                <div>
                    Call for applications
                    <div>
                        <div>
                            <div>
                            From
                            </div>
                            <MyDatePicker date={fromDate} handleDate={setFuncWrapper(setFromDate)} />
                        </div>
                        <div>
                            <div>
                            To
                            </div>
                            <MyDatePicker date={toDate} handleDate={setFuncWrapper(setToDate)} />
                        </div>
                    </div>

                </div>
                <div>
                    <MyButton text="Call" type="submit" onClick={CreateCallOnClick}  />
                </div>
                <div>
                    {
                        message
                    }
                </div>
            </div>
        } style={{
            minWidth : 600,
        }} />
    )
}