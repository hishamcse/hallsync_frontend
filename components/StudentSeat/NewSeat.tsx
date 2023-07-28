import {Checkbox, Typography} from "@mui/material";
import MyCard from "../card";
import Card from '@mui/material/Card';
import styles from './studentSeat.module.scss';
import {useState} from "react";
import MUIDropdown from "../MUIDropdown";
import * as React from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import {Button} from "@mui/material";

const QuestionBox = (props : {text: string, checkBox: boolean, dropDown?: string[]}) => {
    const [val, setVal] = useState('none');

    const handleChange = (event: SelectChangeEvent) => {
        setVal(event.target.value as string);
    };

    return (
            <Card sx={{width: 500, height: 35, border: 1, borderColor: 'white',
                padding: 1, marginBottom: 3, backgroundColor : "#000000",}}>
                <div style={{display: 'flex', justifyContent: 'space-between', textAlign: 'center'}}>
                    <Typography variant="body2" color="text.secondary" fontSize='14px' paddingTop={1}>
                        {props.text}
                    </Typography>

                    {props.checkBox && <Checkbox
                        color="default"
                        inputProps={{'aria-label': 'secondary checkbox'}}
                    />}

                    {props.dropDown && <MUIDropdown width={120} options={props.dropDown} val={val} change={handleChange}/>}
                </div>
            </Card>
    )
}

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

const Agreement = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'left', width: 1000}}>
            <div>
                <Checkbox
                    color="default"
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />
            </div>
            &nbsp;&nbsp;
            <div>
                <Typography variant="body2" color="text.secondary" fontSize='15px' paddingTop={1}>
                    I confirm that the given information is correct and the hall authority can take any punitive action
                    if found otherwise
                </Typography>
            </div>
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

const NewSeat = () => {
    const [type, setType] = useState('New Seat');

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
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