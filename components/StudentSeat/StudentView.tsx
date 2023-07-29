import NewSeat from "./NewSeat";
import {useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import TempSeat from "./TempSeat";
import RoomChange from "./RoomChange";

const StudentView = () => {
    const [type, setType] = useState('New Seat');

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    }

    return (
        <div>
            {type == 'New Seat' && <NewSeat changeType={handleChange}/>}
            {type == 'Temporary Seat' && <TempSeat changeType={handleChange}/>}
            {type == 'Room Change' && <RoomChange changeType={handleChange}/>}
        </div>
    )
}

export default StudentView;