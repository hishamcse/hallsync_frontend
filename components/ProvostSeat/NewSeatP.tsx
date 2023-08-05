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
import { FreeRoom } from "../freeRoom";
import { APPROVE_NEW_SEAT_APPLICATION, GET_FREE_SEAT } from "../../graphql/operations";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

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

const Documents = (props : {
    files : ApplicationDetailsQuery['applicationDetails']['attachedFiles']
}) => {
    return (
        <ol style={{justifyContent: 'left', width: 500}}>
            {
                props.files  &&
                props.files.map(f =>{
                    return (
                        <li key={f.uploadedFile.uploadedFileId} style={{justifyContent: "space-between", padding: 5}}>
                            <div style={{
                                display : 'flex',
                                justifyContent: "space-between",
                                alignContent : "center"
                            }}>
                                {f.uploadedFile.fileName}
                            </div>
                        </li>
                    )
                })
            }
            {/* <div style={{display: "flex", justifyContent: "space-between", padding: 5}}>
                1. NID
                <Button variant="outlined" color='inherit'>Check</Button>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", padding: 5}}>
                2. Electric Bill
                <Button variant="outlined" color='inherit'>Check</Button>
            </div>
            <Button variant="outlined" color='inherit'>Check others(if any)</Button> */}
        </ol>
    )
}

const RoomAllotment = (props : {
    setSeatId : (v : number | undefined)=>void
}) => {
    

    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15, marginTop: 20}}>
            <div style={{ justifyContent: 'space-between'}}>
                <FreeRoom setSeatId={props.setSeatId} autoAssign />
                {/* <Input placeholder="Room No" type={'number'}
                       style={{background: 'black', padding: 2, borderRadius: 5, borderColor: 'white'}}/> */}
                {/* <Button variant="outlined" color='primary'>Auto assign</Button> */}
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
    const router = useRouter();
    const [seatId ,setSeatId] = useState<number>();

    const [query, {error, loading, data}] = useMutation(
        APPROVE_NEW_SEAT_APPLICATION
        , {
            onError : (error)=>{

            },
            onCompleted : (data)=>{
                // console.log(data);
                router.push('/seatManagement');
            }
        })
    function approve(){
        if(!seatId){
            return;
        }
        query({
            variables : {
                newApplicationId : props.application.applicationId,
                seatId : seatId
            }
        })
    }


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
                        <MyCard content={<Documents files={props.application.attachedFiles}/>} title='Documents'/>
                    </div>
                    <div style={{marginTop: 50}}>
                        <MyCard content={<RoomAllotment setSeatId={setSeatId} />} title='Room Allotment' />
                    </div>
                    <div style={{marginTop: 50}}>
                        <MyCard content={<ScheduleAppointment />} title='Schedule Appointment' />
                    </div>
                </div>
            </div>

            { (props.application.status == "PENDING")  &&
                <div className={styles.submit}>
                    <MyCard content={<Confirmation successHandler={approve}/>} title=''/>
                    </div>
            }
        </div>
    )
}

export default NewSeatP;