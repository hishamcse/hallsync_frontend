import {Button} from "@mui/material";
import * as React from "react";

const Submit = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', margin: 10, width: 250}}>
            <Button variant="contained" color='success'>Submit</Button>
            <Button variant="contained" color='error'>Reset</Button>
        </div>
    )
}

export default Submit;