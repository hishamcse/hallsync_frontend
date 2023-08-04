import {useState} from "react";
import styles from '../../styles/studentSeat.module.scss';
import {SelectChangeEvent} from "@mui/material/Select";
import MyCard from "../card";
import MUIDropdown from "../MUIDropdown";
import * as React from "react";
import QuestionBox from "../QuestionBox";
import {Input} from "@mui/material";
import Agreement from "./Agreement";
import MUIStyledTextarea from "../MUITextArea";
import Submit from "./Submit";
import {types} from "./StudentView";

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

const TempSeat = (props: {changeType: (event: SelectChangeEvent) => void}) => {
    const [type, setType] = useState('Temporary Seat');

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
        props.changeType(event);
    };

    const views = [types[0], types[1]];

    return (
        <div style={{marginBottom: 20}}>
            <div className={styles.newSeat}>
                <MyCard content={<Questionnaire/>} title='Questionnaire'/>
                <div>
                    <div style={{display: 'flex', justifyContent: 'right', marginRight: 20}}>
                        <MUIDropdown width={200} options={views} val={type} change={handleChange}/>
                    </div>
                    <div className={styles.doc}>
                        <MyCard content={<ReasonForChange/>} title='Reason for Temporary Seat'/>
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