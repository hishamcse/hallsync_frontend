import * as React from "react";
import { MyButton } from "../../button";

const Submit = (
    props : {
        onSubmit : ()=>void,
        onCancel? : ()=>void
    }
) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', margin: 10, width: 250}}>
            <MyButton onClick={props.onSubmit} text="Submit" type="submit"  />
            <MyButton onClick={props.onSubmit} text="Cancel" type="cancel"  />
        </div>
    )
}

export default Submit;