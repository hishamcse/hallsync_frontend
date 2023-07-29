import {Checkbox, Typography} from "@mui/material";
import * as React from "react";
import exp = require("constants");

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

export default Agreement;