import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import * as React from "react";
import styles from '../../../styles/studentSeat.module.scss';
import { ApplicationDetailsQuery } from "../../../graphql/__generated__/graphql";

const ProfileInfo = (props: {info : {
    name : string,
    student9DigitId : string,
    batch : {
        year : string
    },
    department : {
        shortName : string
    },
    levelTerm : {
        label : string
    }

}}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <div className={styles.profile}>
                <p>Name: {props.info.name}</p>
                <p>Id: {props.info.student9DigitId}</p>
                <p>Batch: {props.info.batch.year}</p>
                <p>Department: {props.info.department.shortName.toUpperCase()}</p>
                <p>Level/Term: {props.info.levelTerm.label}</p>
            </div>
            <div>
                <AccountCircleIcon sx={{ fontSize: 180 }}/>
            </div>
        </div>
    )
}

export default ProfileInfo