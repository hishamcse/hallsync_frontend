import {SelectChangeEvent} from "@mui/material/Select";
import styles from '../../styles/studentSeat.module.scss';
import {useState} from "react";
import MyCard from "../card";
import MUIDropdown from "../MUIDropdown";
import Agreement from "./Agreement";
import * as React from "react";
import MUIStyledTextarea from "../MUITextArea";
import {Input} from "@mui/material";
import Submit from "./Submit";

const ReasonForChange = () => {
    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15}}>
            <MUIStyledTextarea rows={10} placeHolder="State your reason here"/>
        </div>
    )
}

const RoomPreference = () => {
    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Input placeholder="Room No" type={'number'}
                       style={{background: 'black', padding: 2, borderRadius: 5, borderColor: 'white'}}/>
            </div>
        </div>
    )
}

const RoomChange = (props: {changeType: (event: SelectChangeEvent) => void}) => {
    const [type, setType] = useState('Room Change');

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
        props.changeType(event);
    };

    const types = ['New Seat', 'Temporary Seat', 'Room Change'];

    return (
        <div style={{marginBottom: 20}}>
            <div className={styles.newSeat}>
                <div className={styles.doc}>
                    <MyCard content={<ReasonForChange/>} title='Reason for change'/>
                </div>
                <div>
                    <div style={{display: 'flex', justifyContent: 'right', marginRight: 20}}>
                        <MUIDropdown width={200} options={types} val={type} change={handleChange}/>
                    </div>
                    <div className={styles.doc}>
                        <MyCard content={<RoomPreference/>} title='Room Preference'/>
                    </div>
                </div>
            </div>
            <div className={styles.agreement}>
                <MyCard content={<Agreement/>} title=''/>
            </div>

            <div className={styles.submit}>
                <MyCard content={<Submit/>} title=''/>
            </div>
        </div>
    )
}

export default RoomChange;