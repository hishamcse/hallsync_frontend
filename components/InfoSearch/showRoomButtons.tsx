import {SelectedFloorRoomsQuery} from "../../graphql/__generated__/graphql";
import {MyButton} from "../button";
import {generateRoomNumber} from "../utilities";
import {useState} from "react";

const ShowRoomButtons = (props: {
    allRooms : SelectedFloorRoomsQuery['selectedFloorRooms'],
    getRoomResidents: (roomId : number, fullRoomNo: string) => void
}) => {

    const [selectedRoomNo, setSelectedRoomNo] = useState<string>('');

    const handleRoomNo = (room : SelectedFloorRoomsQuery['selectedFloorRooms'][0]) => {
        const fullRoomNo = generateRoomNumber(room.floor.floorNo, room.floor.roomLabelLen, room.roomNo).toString();
        setSelectedRoomNo(fullRoomNo);
        props.getRoomResidents(room.roomId, fullRoomNo.toString());
    }

    const setBackGroundColor = (room : SelectedFloorRoomsQuery['selectedFloorRooms'][0]) => {
        if(selectedRoomNo == generateRoomNumber(room.floor.floorNo, room.floor.roomLabelLen, room.roomNo).toString()) {
            return 'grey';
        }
        if(room.seats.filter(s=> s.residency).length === room.seats.length) {
            return 'red';
        }

        return 'black';
    }

    return (
        <div style={{display: "block", alignItems: "center", marginTop: 20}}>
            {
                props.allRooms.map((room) => {
                    return (
                        <span key={room.roomNo} onClick={() => handleRoomNo(room)}>
                            <MyButton type='black' key={room.roomNo}
                                      text={generateRoomNumber(room.floor.floorNo, room.floor.roomLabelLen, room.roomNo).toString()}
                                      style={{
                                          margin: 15, fontWeight: 'bold', fontSize: 16,
                                          backgroundColor: setBackGroundColor(room),
                                      }}/>
                        </span>
                    )
                })
            }
        </div>
    )
}

export default ShowRoomButtons;