import {SelectChangeEvent} from "@mui/material/Select";
import styles from '../../styles/studentSeat.module.scss';
import * as React from "react";
import {useState} from "react";
import MyCard from "../card";
import MUIDropdown from "../MUIDropdown";
import Agreement from "./Agreement";
import MUIStyledTextarea from "../MUITextArea";
import {Input} from "@mui/material";
import Submit from "./Submit";
import {types} from "./StudentView";
import {useMutation} from "@apollo/client";
import {POST_SEAT_CHANGE_APPLICATION} from "../../graphql/operations";
import {useRouter} from "next/router";
import { FreeRoom } from "../freeRoom";

const ReasonForChange = (props: {handleReason: (str: string) => void}) => {
    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15}}>
            <MUIStyledTextarea rows={10} placeHolder="State your reason here" handleInput={props.handleReason}/>
        </div>
    )
}

const RoomPreference = (props: {currentRoom: number, setSeatId : (v : number | undefined)=>void,
}) => {
    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15}}>
            <div style={{}}>
                <span style={{marginLeft: 5}}>
                    Currently Allocated Room: {props.currentRoom}
                </span>
                <FreeRoom setSeatId={props.setSeatId} />
            </div>
        </div>
    )
}

const RoomChange = (props: {changeType: (event: SelectChangeEvent) => void, room: number}) => {
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
                setReqErrorMsg("Something went wrong!! Please double check your inputs")
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

    const submission = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
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

    return (
        <div style={{marginBottom: 20}}>
            <div className={styles.newSeat}>
                <div className={styles.doc}>
                    <MyCard content={<ReasonForChange handleReason={handleReason}/>} title='Reason for change'/>
                </div>
                <div>
                    <div style={{display: 'flex', justifyContent: 'right', marginRight: 20}}>
                        <MUIDropdown width={200} options={[types[2]]} val={type} change={handleChange}/>
                    </div>
                    <div className={styles.doc}>
                        <MyCard content={<RoomPreference currentRoom={props.room} setSeatId={setSeatId}/>} title='Room Preference'/>
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

export default RoomChange;