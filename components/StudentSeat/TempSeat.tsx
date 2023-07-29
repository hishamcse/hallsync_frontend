import {useState} from "react";
import styles from './studentSeat.module.scss';
import {SelectChangeEvent} from "@mui/material/Select";
import MyCard from "../card";
import MUIDropdown from "../MUIDropdown";
import * as React from "react";
import QuestionBox from "./QuestionBox";
import {Box, Button, Checkbox, Input, TextareaAutosize, Typography} from "@mui/material";
import Agreement from "./Agreement";
import MUIStyledTextarea from "../MUITextArea";

const Questionnaire = () => {
    return (
        <div className={styles.questionnaire}>
            <QuestionBox text="Dummy question" checkBox={true} />
            <QuestionBox text="Dummy question" checkBox={false} dropDown={["none", "hello", "hi"]}/>
            <QuestionBox text="Dummy question" checkBox={true} />
        </div>
    )
}

const ReasonForChange = () => {
    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15}}>
            <MUIStyledTextarea rows={10} placeHolder="State your reason here"/>
        </div>
    )
}

const RoomPreference = () => {
    const [val, setVal] = useState('Days');

    const handleChange = (event: SelectChangeEvent) => {
        setVal(event.target.value as string);
    };

    const items: string[] = ['Days', ...Array.from({ length: 11 },
        (_, index) => (index + 5).toString())];

    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                   <Input placeholder="Room No" type={'number'}
                          style={{background: 'black', padding: 2, borderRadius: 5, borderColor: 'white'}}/>
                <MUIDropdown width={120} options={items} val={val} change={handleChange}/>
            </div>
        </div>
    )
}

const Documents = () => {
    return (
        <div style={{justifyContent: 'left', width: 500}}>
            <div style={{display: "flex", justifyContent: "space-between", padding: 5}}>
                1. NID
                <Button variant="outlined" color='inherit'>Upload</Button>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", padding: 5}}>
                2. Electric Bill
                <Button variant="outlined" color='inherit'>Upload</Button>
            </div>
            <Button variant="outlined" color='inherit'>Upload others(if any)</Button>
        </div>
    )
}

const Submit = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', margin: 10, width: 250}}>
            <Button variant="contained" color='success'>Submit</Button>
            <Button variant="contained" color='error'>Reset</Button>
        </div>
    )
}

const TempSeat = (props: {changeType: (event: SelectChangeEvent) => void}) => {
    const [type, setType] = useState('Temporary Seat');

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
        props.changeType(event);
    };

    const types = ['New Seat', 'Temporary Seat', 'Room Change'];

    return (
        <div style={{marginBottom: 20}}>
            <div className={styles.newSeat}>
                <MyCard content={<Questionnaire/>} title='Questionnaire'/>
                <div>
                    <div style={{display: 'flex', justifyContent: 'right', marginRight: 20}}>
                        <MUIDropdown width={200} options={types} val={type} change={handleChange}/>
                    </div>
                    <div className={styles.doc}>
                        <MyCard content={<ReasonForChange/>} title='Reason for change'/>
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

export default TempSeat