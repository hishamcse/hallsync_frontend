import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CALL, GET_ASSIGNED_TILL } from "../graphql/operations";
import { getDayAndMonthAndYearString } from "./utilities";
import MyCard from "./card";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { MyDatePicker } from "./DatePicker";
import { MyButton } from "./button";

export function CallApplicationTsx(){

    let {data, loading, error} = useQuery(
        GET_ASSIGNED_TILL,
        {
            onCompleted : (data)=>{
                console.log(data);
                setFromDate(dayjs(data.messManagerAssignedTill));
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
            <div>
                <div>
                    Mess Manager Assinged Till
                </div>
                <div>
                    {data && getDayAndMonthAndYearString(new Date(data.messManagerAssignedTill).toString())}
                </div>
                <div>
                    Call for applications
                    <MyDatePicker date={fromDate} handleDate={setFuncWrapper(setFromDate)} />
                    <MyDatePicker date={toDate} handleDate={setFuncWrapper(setToDate)} />

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
        } />
    )
}