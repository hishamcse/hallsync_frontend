import {useState} from "react";
import styles from '../../styles/studentSeat.module.scss';
import {SelectChangeEvent} from "@mui/material/Select";
import MyCard from "../card";
import MUIDropdown from "../MUIDropdown";
import * as React from "react";
import QuestionBox from "../QuestionBox";
import {Input} from "@mui/material";
import Agreement from "./Agreement";
import MUIStyledTextarea from "../MUITextArea";
import Submit from "./Submit";
import {types} from "./StudentView";
import {useRouter} from "next/router";
import {useMutation} from "@apollo/client";
import {POST_TEMP_APPLICATION} from "../../graphql/operations";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { FreeRoom } from "../freeRoom";

const Questionnaire = (props: {answers:  React.Dispatch<React.SetStateAction<boolean>>[]}) => {
    return (
        <div className={styles.questionnaire}>
            <QuestionBox text="Dummy question" checkBox={true} answer={props.answers[0]}/>
            <QuestionBox text="Dummy question" checkBox={false} dropDown={["none", "hello", "hi"]}/>
            <QuestionBox text="Dummy question" checkBox={true} answer={props.answers[1]}/>
        </div>
    )
}

const ReasonForChange = (props: {handleReason: (str: string) => void}) => {
    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15}}>
            <MUIStyledTextarea rows={10} placeHolder="State your reason here" handleInput={props.handleReason}/>
        </div>
    )
}

const RoomPreference = (props: {
    handleDays: (event: SelectChangeEvent) => void, handleDate: (newValue: Dayjs | null) => void,
    setSeatId : (v : number | undefined)=>void,
}) => {

    const [value, setValue] = useState<Dayjs | null>();

    const [val, setVal] = useState('Days');


    const handleChange = (event: SelectChangeEvent) => {
        setVal(event.target.value as string);
        props.handleDays(event);
    };

    const handleDate = (newValue: Dayjs | null) => {
        setValue(newValue);
        props.handleDate(newValue);
    }

    const items: string[] = ['Days', ...Array.from({ length: 11 },
        (_, index) => (index + 5).toString())];

    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Date of hall entrance" value={dayjs(value)}
                                onChange={handleDate}/>
            </LocalizationProvider>
            <div style={{ marginTop: 20}}>
                <div>
                    <FreeRoom setSeatId={props.setSeatId} containerStyle={{
                    }}  />
                </div>
                {/* <Input placeholder="Room No" type={'number'}
                          style={{background: 'black', padding: 2, borderRadius: 5, borderColor: 'white'}}
                          onChange={props.handleRoom}/> */}
                <div>
                    <MUIDropdown width={120} options={items} val={val} change={handleChange}/>
                </div>
            </div>
        </div>
    )
}

const TempSeat = (props: {changeType: (event: SelectChangeEvent) => void}) => {
    const [type, setType] = useState('Temporary Seat');

    const [q1Ans, setQ1Ans] = useState(false);
    const [q2Ans, setQ2Ans] = useState(false);

    const [reason, setReason] = useState('');
    const [date, setDate] = useState<Dayjs | null>(null);
    const [days, setDays] = useState(0);

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

    const handleDays = (event: SelectChangeEvent) => {
        setDays(parseInt(event.target.value));
    }

    const handleAgreement = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgreed(event.target.checked);
        setShowError(false);
    }

    const submission = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log('submitted');
        console.log(q1Ans);
        console.log(q2Ans);
        console.log(reason);
        console.log(date?.format('YYYY-MM-DD'));
        console.log(days);
        console.log(agreed);

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
        })
    }

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
        props.changeType(event);
    };

    const views = [types[0], types[1]];

    return (
        <div style={{marginBottom: 20}}>
            <div className={styles.newSeat}>
                <MyCard content={<Questionnaire answers={allQuestionsAnswered}/>} title='Questionnaire'/>
                <div>
                    <div style={{display: 'flex', justifyContent: 'right', marginRight: 20}}>
                        <MUIDropdown width={200} options={views} val={type} change={handleChange}/>
                    </div>
                    <div className={styles.doc}>
                        <MyCard content={<ReasonForChange handleReason={handleReason}/>} title='Reason for Temporary Seat'/>
                    </div>
                    <div className={styles.doc}>
                        <MyCard content={<RoomPreference setSeatId={setSeatId}  handleDays={handleDays} handleDate={handleDate}/>}
                                title='Room Preference and Date'/>
                    </div>
                </div>
            </div>

            <div className={styles.agreement}>
                <MyCard content={<Agreement handleAgreement={handleAgreement}/>} title=''/>
                {showError && <div style={{color: 'red', fontSize: 14, textAlign: 'center'}}>
                    Please agree to the terms and conditions</div>}
                {blankError && <div style={{color: 'red', fontSize: 14, textAlign: 'center'}}>
                    Please fill in all the fields</div>}
                {reqError && <div style={{color: 'red', fontSize: 14, textAlign: 'center'}}>
                    {reqErrorMsg}</div>}
            </div>

            <div className={styles.submit} onClick={submission}>
                <MyCard content={<Submit/>} title=''/>
            </div>
        </div>
    )
}

export default TempSeat