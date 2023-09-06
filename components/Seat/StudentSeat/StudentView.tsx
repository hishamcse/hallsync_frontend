import NewSeat from "./NewSeat";
import {useContext, useEffect, useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import TempSeat from "./TempSeat";
import RoomChange from "./RoomChange";
import {userContext} from "../../../pages/_app";
import {ResidencyStatus} from "../../../graphql/__generated__/graphql";
import {generateRoomNumber} from "../../utilities";

export const types = ['New Seat', 'Temporary Seat', 'Room Change'];


const StudentView = () => {
    const {user} = useContext(userContext);
    const [type, setType] = useState('');
    const [dropDownType, setDropDownType] = useState(0);
    const [roomNumber, setRoomNumber] = useState(0);

    useEffect(() => {
        let item = localStorage.getItem('token');
        console.log(item)
        if(item && user?.student && user.student.residencyStatus == ResidencyStatus.Resident) {
            setType('Room Change');
            setDropDownType(1);
            const room = user.student.residency?.seat.room;
            if(room) {
                const floor = room.floor.floorNo;
                const block = room.floor.roomLabelLen;
                const roomNo = room.roomNo;

                setRoomNumber(generateRoomNumber(floor, block, roomNo));
            }
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
            {dropDownType == 1 && type == 'Room Change' && <RoomChange changeType={handleChange} room={roomNumber}/>}
        </div>
    )
}

export default StudentView;