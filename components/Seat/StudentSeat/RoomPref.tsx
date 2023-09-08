import {ApplicationDetailsQuery} from "../../../graphql/__generated__/graphql";
import {FreeRoom} from "../freeRoom";
import * as React from "react";

const RoomPreference = (props: {
    currentRoom: number,
    setSeatId: (v: number | undefined) => void,
    disable?: boolean,
    seat?: NonNullable<ApplicationDetailsQuery['applicationDetails']['seatChangeApplication']>['toSeat']

}) => {
    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15}}>
    <span style={{marginLeft: 5}}>
    Currently Allocated Room: {props.currentRoom}
    </span>
            <FreeRoom initVal={props.seat ? {
                floorNo: props.seat.room.floor.floorNo,
                roomNo: props.seat.room.roomNo,
                seatLabel: props.seat.seatLabel
            } : undefined} disabled={props.disable} setSeatId={props.setSeatId}/>
        </div>
    )
}

export default RoomPreference;