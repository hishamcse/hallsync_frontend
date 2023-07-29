import {Checkbox, Typography} from "@mui/material";
import MyCard from "../card";
import styles from './studentSeat.module.scss';
import {useState} from "react";
import MUIDropdown from "../MUIDropdown";
import * as React from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import {Button} from "@mui/material";
import QuestionBox from "./QuestionBox";
import Agreement from "./Agreement";

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

const NewSeat = (props: {changeType: (event: SelectChangeEvent) => void}) => {
    const [type, setType] = useState('New Seat');

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
                        <MyCard content={<Documents/>} title='Upload Documents'/>
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

export default NewSeat;