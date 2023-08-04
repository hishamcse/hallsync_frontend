import QuestionBox from "../QuestionBox";
import {Button, Input} from "@mui/material";
import * as React from "react";
import styles from '../../styles/studentSeat.module.scss';
import MyCard from "../card";
import Card from "@mui/material/Card";
import Confirmation from "./Confirmation";
import {useState} from "react";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {DateTimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ApplicationDetailsQuery } from "../../graphql/__generated__/graphql";

const ProfileInfo = (props: {info : ApplicationDetailsQuery['applicationDetails']['student']}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <div className={styles.profile}>
                <p>Name: {props.info.name}</p>
                <p>Id: {props.info.student9DigitId}</p>
                <p>Batch: {props.info.batch.year}</p>
                <p>Department: {props.info.department.shortName.toUpperCase()}</p>
                <p>Level/Term: {props.info.levelTerm.label}</p>
            </div>
            <div>
                <AccountCircleIcon sx={{ fontSize: 180 }}/>
            </div>
        </div>
    )
}

const Questionnaire = () => {
    return (
        <div className={styles.questionnaire}>
            <QuestionBox text="From Outside of Dhaka" checkBox={true} />
            <QuestionBox text="No Close Realtive in Dhaka" checkBox={true} />
            <QuestionBox text="College Outside of Dhaka" checkBox={true} />
            <QuestionBox text="School Outside of Dhaka" checkBox={true} />
            <QuestionBox text="Dummy question" checkBox={true} />
            <QuestionBox text="Dummy question" checkBox={false} dropDown={["none", "hello", "hi"]}/>
            <QuestionBox text="Dummy question" checkBox={true} />
        </div>
    )
}

const Documents = () => {
    return (
        <div style={{justifyContent: 'left', width: 500}}>
            <div style={{display: "flex", justifyContent: "space-between", padding: 5}}>
                1. NID
                <Button variant="outlined" color='inherit'>Check</Button>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", padding: 5}}>
                2. Electric Bill
                <Button variant="outlined" color='inherit'>Check</Button>
            </div>
            <Button variant="outlined" color='inherit'>Check others(if any)</Button>
        </div>
    )
}

const RoomAllotment = () => {
    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15, marginTop: 20}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Input placeholder="Room No" type={'number'}
                       style={{background: 'black', padding: 2, borderRadius: 5, borderColor: 'white'}}/>
                <Button variant="outlined" color='primary'>Auto assign</Button>
            </div>
        </div>
    )
}

const ScheduleAppointment = () => {
    const [value, setValue] = useState<Dayjs | null>();

    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15, marginTop: 20}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker label="Schedule date and time" value={dayjs(value)}
                                        onChange={(newValue) => setValue(newValue)}/>
                </LocalizationProvider>
                <Button variant="outlined" color='primary'>Confirm Appointment</Button>
            </div>
        </div>
    )
}

const NewSeatP = (props: {application: ApplicationDetailsQuery['applicationDetails']}) => {
    return (
        <div style={{marginBottom: 20}}>
            <Card style={{margin: 30, textAlign: 'center', padding: 10, border: "1px solid white",
                borderRadius: 10, backgroundColor: 'black'}}>
                <h4>New Seat Application</h4>
            </Card>
            <div className={styles.newSeat}>
                <div style={{display: 'inline-grid', margin: 15}}>
                    <MyCard content={<ProfileInfo info={props.application.student}/>} title='Profile'/>
                    <br/><br/>
                    <MyCard content={<Questionnaire/>} title='Questionnaire'/>
                </div>
                <div style={{display: 'inline-block', margin: 15}}>
                    <div>
                        <MyCard content={<Documents/>} title='Documents'/>
                    </div>
                    <div style={{marginTop: 50}}>
                        <MyCard content={<RoomAllotment />} title='Room Allotment' />
                    </div>
                    <div style={{marginTop: 50}}>
                        <MyCard content={<ScheduleAppointment />} title='Schedule Appointment' />
                    </div>
                </div>
            </div>

            <div className={styles.submit}>
                <MyCard content={<Confirmation/>} title=''/>
            </div>
        </div>
    )
}

export default NewSeatP;