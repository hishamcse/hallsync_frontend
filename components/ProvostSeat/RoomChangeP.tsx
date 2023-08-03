import {application} from "../../pages/seatManagement";
import Card from "@mui/material/Card";
import styles from "../../styles/studentSeat.module.scss";
import MyCard from "../card";
import ProfileInfo from "./ProfileInfo";
import Confirmation from "./Confirmation";
import {Button} from "@mui/material";
import * as React from "react";
import MUIStyledTextarea from "../MUITextArea";
import ResidentTable from "./ResidentTable";

const ReasonForChange = (props : {reason: string}) => {
    return (
        <div style={{justifyContent: 'left', paddingTop: 15}}>
            <MUIStyledTextarea rows={10} placeHolder={props.reason} disabled={true}/>
        </div>
    )
}

const RoomPreference = (props: {room: number}) => {
    return (
        <div style={{justifyContent: 'left', width: 400, paddingTop: 15, margin: 'auto'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                <div>
                    Room No: {props.room.toString()}
                </div>
            </div>
        </div>
    )
}

export class RoomResident {
    name: string;
    dept: string;
    agreementStatus: string;
    constructor(name: string, dept: string, agreementStatus: string) {
        this.name = name;
        this.dept = dept;
        this.agreementStatus = agreementStatus;
    }
}

const RoomResidents = (props: {room: number, residents: RoomResident[]}) => {
    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15, margin: 'auto'}}>
            <div style={{marginBottom: 20}}>
                <h5>Room No: {props.room.toString()}</h5>
            </div>
            <div>
                <ResidentTable residents={props.residents}/>
            </div>
        </div>
    )
}

const RoomChangeP = (props: {application: application, resetHandler: () => void}) => {

    const temp_chng = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eligendi eum inventore " +
        "iste natus neque odio quod repudiandae, similique voluptas! Aliquid dignissimos nisi optio placeat repellat. Assumenda " +
        "commodi ipsam laudantium."

    const temp_allocations: RoomResident[] = [
        new RoomResident("John Doe", "CSE", "Agreed"),
        new RoomResident("Jane Doe", "EEE", "Pending"),
        new RoomResident("John Smith", "ME", "Pending"),
    ]

    return (
        <div style={{marginBottom: 20}}>
            <Card style={{margin: 30, textAlign: 'center', padding: 10, border: "1px solid white",
                borderRadius: 10, backgroundColor: 'black'}}>
                <h4>Room Change Application</h4>
            </Card>
            <div className={styles.newSeat} style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{margin: 25,}}>
                    <div style={{marginBottom: 50}}>
                        <MyCard content={<ReasonForChange reason={temp_chng}/>} title='Reason for change'/>
                    </div>
                    <div>
                        <MyCard content={<RoomResidents room={100} residents={temp_allocations}/>} title='Room Residents'/>
                    </div>
                </div>
                <div style={{margin: 25, marginRight: 25}}>
                    <div style={{marginBottom: 80}}>
                        <MyCard content={<ProfileInfo info={props.application.student}/>} title='Profile'/>
                    </div>
                    <div>
                        <MyCard content={<RoomPreference room={100}/>} title='Given Room Preference' />
                    </div>
                </div>
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

export default RoomChangeP