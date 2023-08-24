import {Button} from "@mui/material";
import * as React from "react";

const Confirmation = (props : {
    successHandler? : ()=>void,
    rejectHandler? : ()=>void
}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', margin: 'auto', width: 370}}>
            <Button variant="contained" color='success' onClick={props.successHandler} >Approve</Button>
            <Button variant="contained" color='secondary'>Revise</Button>
            <Button variant="contained" color='error' onClick={props.rejectHandler} >Decline</Button>
        </div>
    )
}

export default Confirmation;