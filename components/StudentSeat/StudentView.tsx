import NewSeat from "./NewSeat";
import {useContext, useEffect, useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import TempSeat from "./TempSeat";
import RoomChange from "./RoomChange";
import {userContext} from "../../pages/_app";
import {ResidencyStatus} from "../../graphql/__generated__/graphql";

export const types = ['New Seat', 'Temporary Seat', 'Room Change'];

const StudentView = () => {
    const {user, setUser} = useContext(userContext);
    const [type, setType] = useState('');
    const [dropDownType, setDropDownType] = useState(0);

    useEffect(() => {
        let item = localStorage.getItem('token');
        console.log(item)
        if(item && user?.student && user.student.residencyStatus == ResidencyStatus.Resident) {
            setType('Room Change');
            setDropDownType(1);
        } else {
            setType('New Seat');
            setDropDownType(0);
        }
    }, [])

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    }

    return (
        <div>
            {dropDownType == 0 && type == 'New Seat' && <NewSeat changeType={handleChange}/>}
            {dropDownType == 0 && type == 'Temporary Seat' && <TempSeat changeType={handleChange}/>}
            {dropDownType == 1 && type == 'Room Change' && <RoomChange changeType={handleChange}/>}
        </div>
    )
}

export default StudentView;