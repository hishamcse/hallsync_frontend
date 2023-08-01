import {Button} from "@mui/material";
import * as React from "react";

const Confirmation = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', margin: 'auto', width: 370}}>
            <Button variant="contained" color='success'>Approve</Button>
            <Button variant="contained" color='secondary'>Revise</Button>
            <Button variant="contained" color='error'>Decline</Button>
        </div>
    )
}

export default Confirmation;