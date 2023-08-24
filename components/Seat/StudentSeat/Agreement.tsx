import {Checkbox, Typography} from "@mui/material";
import * as React from "react";

const Agreement = (props: {
    handleAgreement: (e: React.ChangeEvent<HTMLInputElement>) => void,
    disabled? : boolean
}) => {
    let opts = {}
    if(props.disabled){
        opts = {
            checked : true
        }
    }
    return (
        <div style={{display: 'flex', justifyContent: 'left', width: 1000}}>
            <div>
                <Checkbox
                    {... opts}
                    color="default"
                    inputProps={{'aria-label': 'secondary checkbox'}}
                    onChange={props.handleAgreement}
                    disabled = {props.disabled}
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

export default Agreement;