import {Checkbox, Typography} from "@mui/material";
import MyCard from "../card";
import Card from '@mui/material/Card';
import styles from './studentSeat.module.scss';
import MyDropDown from "../dropdown";
import {useState} from "react";

const QuestionBox = (props : {text: string, checkBox: boolean, dropDown?: string[]}) => {
    const [val, setVal] = useState<string|undefined>('none');

    console.log(props.dropDown?.length)
    console.log(props.dropDown?.map((v)=>v))

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

                    {props.dropDown && <MyDropDown items={props.dropDown}
                       onSelect={(v)=>setVal(v)} selectedVal={val ?? props.dropDown[0]}
                                                   toggleStyle={{width : "100px"}}/>}
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
        </div>
    )
}

const NewSeat = () => {
    return (
        <div>
            <MyCard content={<Questionnaire />} title='Questionnaire'/>
        </div>
    )
}

export default NewSeat;