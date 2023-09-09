import styles from "../../../styles/studentSeat.module.scss";
import ProfileInfo from "./ProfileInfo";
import * as React from "react";
import ResidentTable from "./ResidentTable";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {useRouter} from "next/router";
import { ApplicationDetailsQuery } from "../../../graphql/__generated__/graphql";
import { APPROVE_SEAT_CHANGE_APPLICATION, REJECT_APPLICATION } from "../../../graphql/operations";
import MyCard from "../../card";
import Confirmation from "./Confirmation";
import { Title } from "./AppDetailsTitle";
import { ReasonForChange } from "../StudentSeat/TempSeat";
import {generateRoomNumber} from "../../utilities";


const RoomPreference = (props: {room: number}) => {
    return (
        <div style={{justifyContent: 'left',paddingTop: 15, margin: 'auto'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                <div>
                    Room No: {props.room.toString()}
                </div>
            </div>
        </div>
    )
}

const RoomResidents = (props: {room: number,
    seatChangeApp: ApplicationDetailsQuery['applicationDetails']['seatChangeApplication']}) => {

    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15, margin: 'auto'}}>
            <div style={{marginBottom: 20}}>
                <h6>Room No: &nbsp; {props.room.toString()}</h6>
            </div>
            <div>
                <ResidentTable seatChangeApp={props.seatChangeApp}/>
            </div>
        </div>
    )
}

const RoomChangeP = (props: {application: ApplicationDetailsQuery['applicationDetails']}) => {

    const router = useRouter();
    const [reqError, setReqError] = useState(false);
    const [reqErrorMsg, setReqErrorMsg] = useState('');

    const temp_chng = props.application.seatChangeApplication?.reason;
    const seat = props.application.seatChangeApplication?.toSeat;

    const floor = seat?.room.floor.floorNo;
    const block = seat?.room.floor.roomLabelLen;
    const roomNo = seat?.room.roomNo;

    let num = 0;

    if(floor && block && roomNo) {
        num = generateRoomNumber(floor, block, roomNo);
    }

    const [approveMutation, {}] = useMutation(
        APPROVE_SEAT_CHANGE_APPLICATION
        , {
            onError : (error)=>{
                setReqError(true)
                setReqErrorMsg(error.message)
            },
            onCompleted : (data)=>{
                // console.log(data);
                router.push('/seatManagement');
            }
        }
    )

    const [rejectMutation, {}] = useMutation(
        REJECT_APPLICATION
        , {
            onError : (error)=>{
                setReqError(true)
                setReqErrorMsg(error.message)
            },
            onCompleted : (data)=>{
                // console.log(data);
                router.push('/seatManagement');
            }
        }
    )

    function approve(){
        const seatId = props.application.seatChangeApplication?.toSeatId;

        console.log(seatId)
        console.log(props.application.seatChangeApplication?.seatChangeApplicationId)

        approveMutation({
            variables : {
                seatChangeApplicationId : props.application.seatChangeApplication?.seatChangeApplicationId || 0,
                seatId: seatId || 0
            }
        }).then(r => {
            console.log(r)
        })
    }

    function reject(){
        rejectMutation({
            variables: {
                applicationId: props.application.applicationId
            }
        }).then(r => {
            console.log(r)
        })
    }

    return (
        <div style={{marginBottom: 20}}>
            <Title text="Room Change Application" />
            <div className={styles.row}>
                <ReasonForChange handleReason={()=>{}} titleText={"Reason For Change"}
                disabled = {temp_chng != null} initialVal={temp_chng}  />

                <MyCard  title={"Profile"} style={{
                    minWidth : 500
                }}>
                    <ProfileInfo info={props.application.student} />
                </MyCard>
            </div>
            <div className={styles.row}>
                <MyCard title={"Room Residents"}>
                    <RoomResidents room={num} seatChangeApp={props.application.seatChangeApplication}/>
                </MyCard>
                <MyCard title={"Given Room Preference"} style={{
                    minWidth : 500,
                    height : 120
                }} >
                    <RoomPreference room={num} />
                </MyCard>
            </div>

            { (props.application.status == "PENDING")  &&
                <div className={styles.submit}>
                    <div  style={{color: 'red', fontSize: 14, textAlign: 'center', minHeight : 30}}>
                    {
                        reqError && <span>{reqError}</span>
                    }
                    </div>
                    {/* <MyCard title=''> */}
                        <Confirmation rejectHandler={reject} successHandler={approve}/>
                    {/* </MyCard> */}
                </div>
            }

        </div>
    )
}

export default RoomChangeP