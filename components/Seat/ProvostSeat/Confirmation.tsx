import {Button} from "@mui/material";
import * as React from "react";
import { MyButton } from "../../button";

const Confirmation = (props : {
    successHandler? : ()=>void,
    rejectHandler? : ()=>void,
    includeRevise? : boolean
}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', margin: 'auto', width: 220 + (props.includeRevise ? 110 : 0)}}>
            <MyButton onClick={props.successHandler} text="Approve" type="submit" />
            {/* <Button variant="contained" color='success' onClick={props.successHandler} >Approve</Button> */}
            {
                props.includeRevise && 
                <MyButton onClick={()=>{}} text="Revise" type="intermediate" />
            }
            
            {/* <Button variant="contained" color='secondary'>Revise</Button> */}
            {/* <Button variant="contained" color='error' onClick={props.rejectHandler} >Decline</Button> */}
            <MyButton onClick={props.rejectHandler} text="Decline" type="cancel" />

        </div>
    )
}

export default Confirmation;