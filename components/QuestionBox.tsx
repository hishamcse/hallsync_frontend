import {useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import Card from "@mui/material/Card";
import {Checkbox, Typography} from "@mui/material";
import MUIDropdown from "./MUIDropdown";
import * as React from "react";

const QuestionBox = (props : {text: string, checkBox: boolean,
    dropDown?: string[], answer?: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [val, setVal] = useState('none');

    const handleChange = (event: SelectChangeEvent) => {
        setVal(event.target.value as string);
    };

    return (
        <Card sx={{width: 480, height: 35, border: 1, borderColor: 'white',
            padding: 1, marginBottom: 3, backgroundColor : "#000000",}}>
            <div style={{display: 'flex', justifyContent: 'space-between', textAlign: 'center'}}>
                <Typography variant="body2" color="text.secondary" fontSize='14px' paddingTop={1}>
                    {props.text}
                </Typography>

                {props.checkBox && <Checkbox
                    color="default"
                    inputProps={{'aria-label': 'secondary checkbox'}}
                    onChange={(e) => props.answer && props.answer(e.target.checked)}
                />}

                {props.dropDown && <MUIDropdown width={120} options={props.dropDown} val={val} change={handleChange}/>}
            </div>
        </Card>
    )
}

export default QuestionBox;