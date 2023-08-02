import {application} from "../../pages/seatManagement";
import styles from "../../styles/studentSeat.module.scss";
import QuestionBox from "../QuestionBox";
import * as React from "react";
import MUIStyledTextarea from "../MUITextArea";
import {useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import {Button, Input, TextField} from "@mui/material";
import MUIDropdown from "../MUIDropdown";
import Card from "@mui/material/Card";
import MyCard from "../card";
import ProfileInfo from "./ProfileInfo";
import Confirmation from "./Confirmation";
import DateRangeIcon from '@mui/icons-material/DateRange';

const Questionnaire = (props: {reason: string}) => {
    return (
        <div>
            <div style={{justifyContent: 'left', width: 500, margin: 'auto', marginLeft: 20, marginTop: 20}}>
                <QuestionBox text="Dummy question" checkBox={true} />
                <QuestionBox text="Dummy question" checkBox={false} dropDown={["none", "hello", "hi"]}/>
                <QuestionBox text="Dummy question" checkBox={true} />
            </div>
            <MyCard title='Reason For Change' content={<ReasonForChange reason={props.reason}/>}/>
        </div>

    )
}

const ReasonForChange = (props : {reason: string}) => {
    return (
        <div style={{justifyContent: 'left', paddingTop: 15}}>
            <MUIStyledTextarea rows={10} placeHolder={props.reason} disabled={true}/>
        </div>
    )
}

const RoomPreference = (props: {room: number, days: number}) => {
    const [val, setVal] = useState('Days');

    const handleChange = (event: SelectChangeEvent) => {
        setVal(event.target.value as string);
    };

    const items: string[] = ['Days', ...Array.from({ length: 11 },
        (_, index) => (index + 5).toString())];

    return (
        <div style={{justifyContent: 'left', width: 400, paddingTop: 15, margin: 'auto'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                <div>
                    Room Preference: {props.room.toString()}
                </div>
                <div>
                    Days: {props.days.toString()}
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Input placeholder="Room No" type={'number'}
                       style={{background: 'black', padding: 2, borderRadius: 5, borderColor: 'white'}}/>
                <MUIDropdown width={120} options={items} val={val} change={handleChange}/>
            </div>
            <div style={{marginTop: 20}}>
                <Button variant="outlined" color='primary'>Auto assign</Button>
            </div>
        </div>
    )
}

class TempAllocation {
    room: number;
    days: number;
    date: Date;
    constructor(room: number, days: number, date: Date) {
        this.room = room;
        this.days = days;
        this.date = date;
    }
}

const SingleApplication = (props: {allocation: TempAllocation}) => {
    return (
        <div>
            <div style={{margin: 10}}>
                <DateRangeIcon />&nbsp;
                {props.allocation.date.toDateString()}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <h6>Room No: {props.allocation.room.toString()}</h6>
                </div>
                <div>
                    <h6>Days: {props.allocation.days.toString()}</h6>
                </div>
            </div>
        </div>
    )
}

const PreviousTempAllocation = (props: {allocations: TempAllocation[]}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'left', paddingTop: 15}}>
            {props.allocations.map((allocation, index) => {
                return (
                    <div key={index}>
                        <Card style={{margin: 10, padding: 10, border: "1px solid white",
                            borderRadius: 10, backgroundColor: 'black'}}>
                            <SingleApplication allocation={allocation}/>
                        </Card>
                      {/*<MyCard title='' content={<SingleApplication allocation={allocation}/>} />*/}
                    </div>
                )
            })}
        </div>
    )
}

const TempSeatP = (props: { application: application, resetHandler: () => void }) => {

    const temp_chng = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eligendi eum inventore " +
        "iste natus neque odio quod repudiandae, similique voluptas! Aliquid dignissimos nisi optio placeat repellat. Assumenda " +
        "commodi ipsam laudantium."

    const allocations: TempAllocation[] = [
        new TempAllocation(100, 7, new Date()),
        new TempAllocation(102, 9, new Date()),
        new TempAllocation(120, 7, new Date()),
    ]

    return (
        <div style={{marginBottom: 20}}>
            <Card style={{margin: 30, textAlign: 'center', padding: 10, border: "1px solid white",
                borderRadius: 10, backgroundColor: 'black'}}>
                <h4>Temporary Seat Application</h4>
            </Card>
            <div className={styles.newSeat} style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{margin: 25}}>
                    <MyCard content={<Questionnaire reason={temp_chng}/>} title='Questionnaire'/>
                </div>
                <div style={{margin: 25, marginRight: 20}}>
                    <div style={{marginBottom: 80}}>
                        <MyCard content={<ProfileInfo info={props.application.student}/>} title='Profile'/>
                    </div>
                    <div>
                        <MyCard content={<RoomPreference room={100} days={7}/>} title='Room Allotment' />
                    </div>
                </div>
            </div>

            <div className={styles.prevAllocations}>
                <MyCard content={<PreviousTempAllocation allocations={allocations}/>} title='Previous Allocations'/>
            </div>

            <div className={styles.submit}>
                <MyCard content={<Confirmation/>} title=''/>
            </div>

            <div className={styles.submit}>
                <Button variant="outlined" color="primary" style={{width: 200, height: 40}} onClick={props.resetHandler}>
                    Go Back
                </Button>
            </div>
        </div>
    )
}

export default TempSeatP