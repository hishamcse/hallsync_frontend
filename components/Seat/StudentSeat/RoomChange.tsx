import {SelectChangeEvent} from "@mui/material/Select";
import styles from '../../../styles/studentSeat.module.scss';
import * as React from "react";
import {useState} from "react";
import MyCard from "../../card";
import MUIDropdown from "../../MUIDropdown";
import Agreement from "./Agreement";
import MUIStyledTextarea from "../../MUITextArea";
import {Input} from "@mui/material";
import Submit from "./Submit";
import {types} from "./StudentView";
import {useMutation} from "@apollo/client";
import {POST_SEAT_CHANGE_APPLICATION} from "../../../graphql/operations";
import {useRouter} from "next/router";
import { FreeRoom } from "../freeRoom";
import { ReasonForChange } from "./TempSeat";
import { ApplicationDetailsQuery } from "../../../graphql/__generated__/graphql";
import { MyButton } from "../../button";

// const ReasonForChange = (props: {handleReason: (str: string) => void}) => {
//     return (
//         <div style={{justifyContent: 'left', width: 500, paddingTop: 15}}>
//             <MUIStyledTextarea rows={10} placeHolder="State your reason here" handleInput={props.handleReason}/>
//         </div>
//     )
// }

const RoomPreference = (props: {
    currentRoom: number,
    setSeatId : (v : number | undefined)=>void,
    disable? : boolean,
    seat? : NonNullable<ApplicationDetailsQuery['applicationDetails']['seatChangeApplication']>['toSeat']

}) => {
    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15}}>
            <span style={{marginLeft: 5}}>
                Currently Allocated Room: {props.currentRoom}
            </span>
            <FreeRoom initVal={props.seat ? {
                    floorNo : props.seat.room.floor.floorNo,
                    roomNo : props.seat.room.roomNo,
                    seatLabel : props.seat.seatLabel
                } : undefined} disabled = {props.disable} setSeatId={props.setSeatId}  />
        </div>
    )
}

const RoomChange = (props: {
    changeType: (event: SelectChangeEvent) => void,
    room: number,
    application? : ApplicationDetailsQuery['applicationDetails']

}) => {
    const [type, setType] = useState('Room Change');

    const [reason, setReason] = useState('');
    const [seatId, setSeatId] = useState<number>();

    const [agreed, setAgreed] = useState(false);
    const [showError, setShowError] = useState(false);
    const [blankError, setBlankError] = useState(false);
    const [reqError, setReqError] = useState(false);
    const [reqErrorMsg, setReqErrorMsg] = useState('');

    const router = useRouter();

    const [seatChangeApplication, {error, loading, data}] = useMutation(
        POST_SEAT_CHANGE_APPLICATION
        , {
            onError : (error)=>{
                setReqError(true)
                // setReqErrorMsg("Something went wrong!! Please double check your inputs")
                setReqErrorMsg(error.message)
            },
            onCompleted : (data)=>{
                console.log(data);
                setReqError(false)
                if(data.seatChangeApplication)
                    router.push('./prevApplication');
                else
                    setReqError(true)
            }
        })

    const handleReason = (val: string) => {
        setReason(val);
        setShowError(false);
        setBlankError(false)
        setReqError(false)
    }

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
        props.changeType(event);
    };

    const handleAgreement = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgreed(event.target.checked);
        setShowError(false);
        setBlankError(false)
        setReqError(false)
    }

    const submission = () => {
        // event.preventDefault();
        console.log('submitted');
        console.log(reason);
        console.log(seatId);
        console.log(agreed);

        if(!agreed) {
            setShowError(true);
            setBlankError(false);
            setReqError(false)
            return;
        }

        if(reason === '' || seatId === undefined) {
            setBlankError(true);
            setReqError(false)
            setShowError(false)
            return;
        } else {
            setBlankError(false);
        }

        seatChangeApplication({
            variables: {
                reason: reason,
                seatId: seatId,
            }
        }).then(r => {
            console.log(r);
        })
    }
    let textAreaDisabled = props.application && (props.application.status !== 'REVISE')
    let agreementDisabled = props.application != undefined;
    
    return (
        <div style={{marginBottom: 20}}>
            { !props.application &&

                <div style={{display: 'flex', justifyContent: 'right', marginRight: 20}}>
                    <MUIDropdown width={200} options={[types[2]]} val={type} change={handleChange}/>
                </div>
            }
            <div className={styles.newSeat}>
                <ReasonForChange titleText="Reason For Change" disabled = {textAreaDisabled} initialVal={props.application?.seatChangeApplication?.reason} handleReason={handleReason}/>
                <MyCard title='Room Preference'>
                    <RoomPreference
                    currentRoom={props.room} setSeatId={setSeatId}
                    seat={props.application?.seatChangeApplication?.toSeat}
                    disable={textAreaDisabled} 
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
            
            <div className={styles.submit}>
                { !textAreaDisabled && 
                    <MyButton onClick={submission} text="Submit" type="submit" />
                    // <MyCard title=''>
                    //     <Submit onSubmit={submission} />
                    // </MyCard>
                }
            </div>
        </div>
    )
}

export default RoomChange;