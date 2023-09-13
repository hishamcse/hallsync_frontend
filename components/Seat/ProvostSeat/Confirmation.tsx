import * as React from "react";
import {MyButton} from "../../button";

const Confirmation = (props: {
    successHandler?: () => void,
    rejectHandler?: () => void,
    includeRevise?: boolean,
    reviseHandler?: () => void
}) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: 'auto',
            width: 220 + (props.includeRevise ? 110 : 0)
        }}>
            <MyButton onClick={props.successHandler} text="Approve" type="submit"/>
            {
                props.includeRevise &&
                <MyButton onClick={props.reviseHandler} text="Revise" type="intermediate"/>
            }

            <MyButton onClick={props.rejectHandler} text="Decline" type="cancel"/>
        </div>
    )
}

export default Confirmation;