import {Button} from "@mui/material";
import * as React from "react";
import { MyButton } from "../../button";
import { CSSProperties } from "@mui/material/styles/createMixins";

const Submit = (
    props : {
        onSubmit : ()=>void,
        onCancel? : ()=>void,
        containerStyle? : CSSProperties
    }
) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', margin: 10, width: 250, ... props.containerStyle}}>
            <MyButton onClick={props.onSubmit} text="Submit" type="submit"  />
            {/* <Button variant="contained" color='success'>Submit</Button> */}
            <MyButton onClick={props.onSubmit} text="Cancel" type="cancel"  />

            {/* <Button variant="contained" color='error'>Reset</Button> */}
        </div>
    )
}

export default Submit;