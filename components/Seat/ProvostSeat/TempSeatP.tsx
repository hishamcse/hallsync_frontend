import styles from "../../../styles/studentSeat.module.scss";
import * as React from "react";
import {useState} from "react";
import Card from "@mui/material/Card";
import ProfileInfo from "./ProfileInfo";
import DateRangeIcon from '@mui/icons-material/DateRange';
import {useRouter} from "next/router";
import {useMutation} from "@apollo/client";
import dayjs, {Dayjs} from "dayjs";
import {SelectChangeEvent} from "@mui/material/Select";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import QuestionBox from "../QuestionBox";
import MyCard from "../../card";
import MUIStyledTextarea from "../../MUITextArea";
import { ApplicationDetailsQuery } from "../../../graphql/__generated__/graphql";
import MUIDropdown from "../../MUIDropdown";
import { FreeRoom } from "../freeRoom";
import { APPROVE_TEMP_SEAT_APPLICATION, REJECT_APPLICATION } from "../../../graphql/operations";
import Confirmation from "./Confirmation";
import { Title } from "./AppDetailsTitle";

const Questionnaire = (props: {reason: string}) => {
    return (
        <div>
            <div style={{justifyContent: 'left',  margin: 'auto', marginLeft: 20, marginTop: 20}}>
                <QuestionBox text="Dummy question" checkBox={true} />
                <QuestionBox text="Dummy question" checkBox={false} dropDown={["none", "hello", "hi"]}/>
                <QuestionBox text="Dummy question" checkBox={true} />
            </div>

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

const RoomPreference = (props : {
    setSeatId : (v : number | undefined)=>void, disabled: boolean,
    tmpApp: ApplicationDetailsQuery['applicationDetails']['tempApplication'] }) => {

    const floor = props.tmpApp?.prefSeat?.room.floor.floorNo;
    const block = props.tmpApp?.prefSeat?.room.floor.roomLabelLen;
    const roomNo = props.tmpApp?.prefSeat?.room.roomNo;

    let num = 0;

    if(floor && block && roomNo) {
        num = Math.pow(10, block - 1);
        num = num * floor + roomNo;
    }

    const entranceDate = new Date(props.tmpApp?.from.toString().split("T")[0]).toLocaleDateString()

    let initDate = null;
    if(props.tmpApp?.from){
        initDate = dayjs(props.tmpApp?.from, 'yyyy-mm-dd');
        // initDate = dayjs("2023-08-03T00:00:00.000Z", 'yyyy-mm-dd');
        console.log(initDate)
    }
    let initDays = 'Days'
    if(props.tmpApp?.days){
        initDays = props.tmpApp?.days.toString()
    }

    const [value, setValue] = useState<Dayjs | null>();

    const [val, setVal] = useState(initDays);

    const handleChange = (event: SelectChangeEvent) => {
        setVal(event.target.value as string);
    };

    const items: string[] = ['Days', ...Array.from({ length: 11 },
        (_, index) => (index + 5).toString())];

    return (
        <div style={{justifyContent: 'left', width: 450, paddingTop: 15, margin: 'auto'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', margin: 'auto'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker disabled = {true} label="Date of hall entrance" value={dayjs(value)}/>
                </LocalizationProvider>
                <div>
                    <MUIDropdown width={120} disable = {true} options={items} val={val} change={handleChange}/>
                </div>
            </div>

            <div style={{justifyContent: 'left', width: 450, paddingTop: 10, marginTop: 10}}>
                <div style={{ justifyContent: 'space-between'}}>
                    <FreeRoom initVal={props.tmpApp?.prefSeat ? {
                        floorNo : floor || 0,
                        roomNo : roomNo || 0,
                        seatLabel : props.tmpApp?.prefSeat?.seatLabel
                    } : undefined} disabled = {props.disabled} setSeatId={props.setSeatId} containerStyle={{
                    }} />
                </div>
            </div>
        </div>
    )
}

const SingleApplication = (props: {allocation:
        ApplicationDetailsQuery['applicationDetails']['student']['tempResidencyHistory'][0]}) => {

    const floor = props.allocation.seat?.room.floor.floorNo;
    const block = props.allocation.seat?.room.floor.roomLabelLen;
    const roomNo = props.allocation.seat?.room.roomNo;

    let num = 0;

    if(floor && block && roomNo) {
        num = Math.pow(10, block - 1);
        num = num * floor + roomNo;
    }

    const fromDate = new Date(props.allocation.from.toString().split("T")[0]).toLocaleDateString();
    const toDate = new Date(props.allocation.to.toString().split("T")[0]).toLocaleDateString();

    return (
        <div>
            <div style={{margin: 10}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h6>Room No: {num.toString()}</h6>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{marginLeft : 10}}>From:</span>
                <span>To:</span>
                <span></span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', padding : 10}}>
                <div style={{
                    marginRight : 10
                }}>
                    <DateRangeIcon  />
                </div>
                <div style={{
                    display : "flex",
                    alignItems : "center"
                }}>
                    {fromDate}
                    <div style={{
                        marginRight : 10,
                        marginLeft: 30
                    }}>
                        <DateRangeIcon  />
                    </div>{toDate}
                </div>
            </div>
        </div>
    )
}

const PreviousTempAllocation = (props: {allocations:
        ApplicationDetailsQuery['applicationDetails']['student']['tempResidencyHistory']}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'left', paddingTop: 15}}>
            {props.allocations.map((allocation, index) => {
                return (
                    <div key={index}>
                        <Card style={{margin: 10, padding: 10, border: "1px solid white",
                            borderRadius: 10, backgroundColor: 'black'}}>
                            <SingleApplication allocation={allocation}/>
                        </Card>
                    </div>
                )
            })}
            {
                // props.allocations.length == 0 && 
                // <div>
                //     No Previous Allocation
                // </div>
            }
        </div>
    )
}

const TempSeatP = (props: {application: ApplicationDetailsQuery['applicationDetails']}) => {

    const router = useRouter();
    const [seatId ,setSeatId] = useState<number>();

    const [blankError, setBlankError] = useState(false);
    const [reqError, setReqError] = useState(false);
    const [reqErrorMsg, setReqErrorMsg] = useState('');

    const temp_chng = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eligendi eum inventore " +
        "iste natus neque odio quod repudiandae, similique voluptas! Aliquid dignissimos nisi optio placeat repellat. Assumenda " +
        "commodi ipsam laudantium."


    const allocations = props.application?.student.tempResidencyHistory;

    const [approveMutation, {}] = useMutation(
        APPROVE_TEMP_SEAT_APPLICATION
        , {
            onError : (error)=>{
                setReqError(true)
                setReqErrorMsg(error.message)
                setBlankError(false);
                console.log(error)
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
                setBlankError(false);
            },
            onCompleted : (data)=>{
                // console.log(data);
                router.push('/seatManagement');
            }
        }
    )

    function approve(){
        if(!seatId){
            setBlankError(true)
            return;
        }
        setBlankError(false);

        console.log(seatId)

        approveMutation({
            variables : {
                applicationId : props.application.applicationId,
                seatId : seatId,
                from: props.application?.tempApplication?.from.toString(),
                days: props.application?.tempApplication?.days || 5
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
            <Title text="Temporary Seat Application" />
            <div className={styles.row}>

                <MyCard title='Questionnaire' style={{minWidth : 530}}>
                    <Questionnaire reason={temp_chng}/>
                </MyCard>
                <MyCard title='Profile' style={{minWidth : 500}} >
                    <ProfileInfo info={props.application.student}/>
                </MyCard>
            </div>
            <div className={styles.row}>
                <MyCard title='Reason For Change' style={{minWidth : 530}}>
                    <ReasonForChange reason={temp_chng}/>
                </MyCard>
                
                <MyCard title='Room Allotment' style={{
                    minWidth : 500
                }} >
                    <RoomPreference tmpApp={props.application?.tempApplication}
                    disabled={props.application.status == "ACCEPTED" || props.application.status == "REJECTED"}
                        setSeatId={setSeatId}/>
                </MyCard>

            </div>
            {
                allocations.length > 0 &&
                <div className={styles.prevAllocContainer}>
                    <MyCard title='Previous Allocations'>
                        <PreviousTempAllocation allocations={allocations}/>
                    </MyCard>
                </div>
            }

            {/* <div style={{
                margin : "20px"
            }}>
                
                    {
                        blankError && 
                        <div style={{color: 'red', fontSize: 14, textAlign: 'center'}}>
                            Please fill in all the fields
                        </div>
                    }
                    {
                    reqError && 
                        <div style={{color: 'red', fontSize: 14, textAlign: 'center'}}>
                            {reqErrorMsg}
                        </div>
                    }
            </div> */}
            { (props.application.status == "PENDING")  &&
                <div className={styles.submit}>
                    <div  style={{color: 'red', fontSize: 14, textAlign: 'center', minHeight : 30}}> 
                        {
                            blankError && <span>Please fill in all the fields</span>
                        }
                        {
                            reqError && <span>{reqErrorMsg}</span>
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

export default TempSeatP