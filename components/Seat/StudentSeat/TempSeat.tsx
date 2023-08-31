import {useState} from "react";
import styles from '../../../styles/studentSeat.module.scss';
import {SelectChangeEvent} from "@mui/material/Select";
import MyCard from "../../card";
import MUIDropdown from "../../MUIDropdown";
import * as React from "react";
import QuestionBox from "../QuestionBox";
import Agreement from "./Agreement";
import MUIStyledTextarea from "../../MUITextArea";
import {types} from "./StudentView";
import {useRouter} from "next/router";
import {useMutation} from "@apollo/client";
import {POST_TEMP_APPLICATION} from "../../../graphql/operations";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { FreeRoom } from "../freeRoom";
import { ApplicationDetailsQuery } from "../../../graphql/__generated__/graphql";
import MUISelectStyled from "../../MUIMultiSelectCheckbox";
import { MyButton } from "../../button";

const Questionnaire = (props: {answers:  React.Dispatch<React.SetStateAction<boolean>>[]}) => {
    return (
        <div className={styles.questionnaire}>
            <QuestionBox text="Dummy question" checkBox={true} answer={props.answers[0]}/>
            <QuestionBox text="Dummy question" checkBox={false} dropDown={["none", "hello", "hi"]}/>
            <QuestionBox text="Dummy question" checkBox={true} answer={props.answers[1]}/>
        </div>
    )
}

export const ReasonForChange = (props: {
    handleReason: (str: string) => void,
    initialVal? : string,
    disabled? : boolean,
    titleText : string
}) => {
    return (
        <MyCard title={props.titleText}>
            <div style={{justifyContent: 'left', width: 500, paddingTop: 15}}>
                <MUIStyledTextarea val={props.initialVal}
                rows={10} placeHolder="State your reason here" handleInput={props.handleReason}
                disabled = {props.disabled}
                />
            </div>
        </MyCard>
    )
}

const RoomPreference = (props: {
    setDays: (e : number) => void, handleDate: (newValue: Dayjs | null) => void,
    setSeatId : (v : number | undefined)=>void,
    date : Dayjs | null,
    disable? : boolean,
    days : number,
    seat? : NonNullable<ApplicationDetailsQuery['applicationDetails']['tempApplication']>['prefSeat']
}) => {

    
    

    const items: string[] = ['Days', ...Array.from({ length: 11 },
        (_, index) => (index + 5).toString())];

    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15}}>
            <div style={{display: 'flex', justifyContent: 'space-between', margin: 'auto'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker disabled = {props.disable} label="Date of hall entrance" value={props.date}
                                    onChange={props.handleDate}/>
                </LocalizationProvider>
                <div>
                    <MUISelectStyled items={items} placeHolder="Days" disabled = {props.disable} 
                    setVal={(s) => props.setDays(parseInt(s))} type="single" val={props.days.toString()} width={120}  />
                    {/* <MUIDropdown width={120} disable = {props.disable} options={items} val={val} change={handleChange}/> */}
                </div>
            </div>
            <div style={{ marginTop: 20}}>
                <div>
                    <FreeRoom initVal={props.seat ? {
                        floorNo : props.seat.room.floor.floorNo,
                        roomNo : props.seat.room.roomNo,
                        seatLabel : props.seat.seatLabel
                    } : undefined} disabled = {props.disable} setSeatId={props.setSeatId} containerStyle={{
                    }} />
                </div>
            </div>
        </div>
    )
}

const TempSeat = (props: {
    changeType: (event: SelectChangeEvent) => void,
    application? : ApplicationDetailsQuery['applicationDetails']
}) => {

    let initDate = null;
    if(props.application?.tempApplication?.from){
        initDate = dayjs(props.application?.tempApplication?.from, 'yyyy-mm-dd');
        initDate = dayjs("2023-08-03T00:00:00.000Z", 'yyyy-mm-dd');
        console.log(initDate)
    }

    let initDays = 0;
    if(props.application?.tempApplication){
        initDays = props.application.tempApplication.days;
    }
    const [type, setType] = useState('Temporary Seat');

    const [q1Ans, setQ1Ans] = useState(false);
    const [q2Ans, setQ2Ans] = useState(false);

    const [reason, setReason] = useState('');
    const [date, setDate] = useState<Dayjs | null>(initDate);
    const [days, setDays] = useState(initDays);

    const [agreed, setAgreed] = useState(false);
    const [showError, setShowError] = useState(false);
    const [blankError, setBlankError] = useState(false);
    const [reqError, setReqError] = useState(false);
    const [reqErrorMsg, setReqErrorMsg] = useState('');
    const [seatId, setSeatId] = useState<number>();

    const router = useRouter();

    const [tempSeatApplication, {error, loading, data}] = useMutation(
        POST_TEMP_APPLICATION
        , {
            onError : (error)=>{
                setReqError(true)
                setReqErrorMsg(error.message)
            },
            onCompleted : (data)=>{
                console.log(data);
                if(data.tempSeatApplication)
                    router.push('./prevApplication');
                else
                    setReqError(true)
            }
        })

    const allQuestionsAnswered = [setQ1Ans, setQ2Ans];

    const handleReason = (val: string) => {
        setReason(val);
    }

    const handleDate = (newValue: Dayjs | null) => {
        setDate(newValue);
    }

    const handleAgreement = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgreed(event.target.checked);
        setShowError(false);
    }

    const submission = () => {
        console.log('submitted');
        console.log(q1Ans);
        console.log(q2Ans);
        console.log(reason);
        console.log(date?.format('YYYY-MM-DD'));
        console.log(days);
        console.log(agreed);
        console.log(seatId);

        if(!agreed) {
            setShowError(true);
            return;
        }

        if(reason === '' || date === null ||  days === 0 || seatId === undefined) {
            setBlankError(true);
            return;
        } else {
            setBlankError(false);
        }

        tempSeatApplication({
            variables: {
                from: date?.format('YYYY-MM-DD').toString(),
                prefSeatId: seatId,
                days: days,
                q1: q1Ans,
                q2: q2Ans
            }
        }).then(r => {
            console.log(r);
        }).catch(err =>{
            console.log(err);
        })
    }

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
        props.changeType(event);
    };

    const views = [types[0], types[1]];
    let textAreaDisabled = props.application && (props.application.status !== 'REVISE')
    let agreementDisabled = props.application != undefined;
    return (
        <div style={{marginBottom: 20}}>
            { !props.application &&
                <div style={{display: 'flex', justifyContent: 'right', marginRight: 20, marginBottom : 20}}>
                    <MUIDropdown width={200} options={views} val={type} change={handleChange}/>
                </div>
            }
                <div className={styles.row}>
                    <MyCard title='Questionnaire'>
                        <Questionnaire answers={allQuestionsAnswered}/>
                    </MyCard>
                    
                    <ReasonForChange titleText='Reason for Temporary Seat' initialVal = {' '} handleReason={handleReason} disabled = {textAreaDisabled} />
                </div>
                <div className={styles.row}>
                    <MyCard title='Room Preference and Date'>
                        <RoomPreference disable={textAreaDisabled} 
                        date={date} setSeatId={setSeatId}  setDays={setDays} handleDate={handleDate}
                        days={days}
                        seat={props.application?.tempApplication?.prefSeat}
                        />
                    </MyCard>
                </div>

            <div className={styles.agreement}>
                <MyCard title=''>
                    <Agreement disabled = {agreementDisabled} handleAgreement={handleAgreement}/>
                </MyCard>
                <div  style={{color: 'red', fontSize: 14, textAlign: 'center', minHeight : 30}}>
                    {
                        showError && <span>Please agree to the terms and conditions</span>
                    }
                    {
                        blankError && <span>Please fill in all the fields</span>
                    }
                    {
                        reqError && <span>{reqErrorMsg}</span>
                    }
                </div>
            </div>

            <div className={styles.submit} onClick={submission}>

                { !agreementDisabled &&
                    <MyButton onClick={submission} text="Submit" type="submit" />
                }
            </div>
        </div>
    )
}

export default TempSeat