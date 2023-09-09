import {SelectChangeEvent} from "@mui/material/Select";
import styles from '../../../styles/studentSeat.module.scss';
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import MyCard from "../../card";
import MUIDropdown from "../../MUIDropdown";
import Agreement from "./Agreement";
import {types} from "./StudentView";
import {useMutation} from "@apollo/client";
import {POST_SEAT_CHANGE_APPLICATION} from "../../../graphql/operations";
import {useRouter} from "next/router";
import { ReasonForChange } from "./TempSeat";
import {ApplicationDetailsQuery, ResidencyStatus} from "../../../graphql/__generated__/graphql";
import { MyButton } from "../../button";
import RoomPreference from "./RoomPref";
import {generateRoomNumber} from "../../utilities";
import {userContext} from "../../../pages/_app";

const RoomChange = (props: {
    changeType: (event: SelectChangeEvent) => void,
    room: number,
    application? : ApplicationDetailsQuery['applicationDetails']

}) => {

    const {user} = useContext(userContext);

    const [type, setType] = useState('Room Change');

    const [reason, setReason] = useState('');
    const [seatId, setSeatId] = useState<number>();

    const [agreed, setAgreed] = useState(false);
    const [showError, setShowError] = useState(false);
    const [blankError, setBlankError] = useState(false);
    const [reqError, setReqError] = useState(false);
    const [reqErrorMsg, setReqErrorMsg] = useState('');

    const [curRoom, setCurRoom] = useState<number>(0);

    const router = useRouter();

    useEffect(() => {
        let item = localStorage.getItem('token');
        console.log(item)
        if(item && user && user.student && user.student.residencyStatus == ResidencyStatus.Resident) {
            const room = user.student.residency?.seat.room;
            if(room) {
                const floor = room.floor.floorNo;
                const block = room.floor.roomLabelLen;
                const roomNo = room.roomNo;

                setCurRoom(generateRoomNumber(floor, block, roomNo));
            }
        }
    }, [])

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
                    currentRoom={curRoom} setSeatId={setSeatId}
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
                }
            </div>
        </div>
    )
}

export default RoomChange;