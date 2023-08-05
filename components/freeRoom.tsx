import { Button, Input, SelectChangeEvent } from "@mui/material";
import MUIDropdown from "./MUIDropdown";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_FREE_FLOORS, GET_FREE_ROOMS_IN_FLOOR, GET_FREE_SEAT, GET_FREE_SEATS_IN_ROOM } from "../graphql/operations";
import { CSSProperties, useState } from "react";
import MUISelectStyled from "./MUIMultiSelectCheckbox";



export function FreeRoom(props : {
    setSeatId : (v : number | undefined)=>void,
    containerStyle? : CSSProperties,
    autoAssign? : boolean
}){

    let [floor, setFloor] = useState<number | undefined>();
    let [room, setRoom] = useState<number|undefined>();
    let [seat, setSeat] = useState<string|undefined>();

    let [query ,{data }] = useLazyQuery(
        GET_FREE_SEAT
    )
    
    

    let {data : floors, loading, error} = useQuery(
        GET_FREE_FLOORS
    )
    let {data : rooms, refetch : refetchRooms} = useQuery(
        GET_FREE_ROOMS_IN_FLOOR,
        {variables : {
            floorNo : floor ?? -1
        }}
    )
    
    let {data : seats, refetch : refetchSeats} = useQuery(
        GET_FREE_SEATS_IN_ROOM,
        {variables : {
            floorNo : floor ?? -1,
            roomNo : room ?? -1
        }}
    )
    

    function onFloorChange(v: string){
        setFloor(parseInt(v))
        setRoom(undefined);
        onSeatChange(undefined);
        refetchRooms({ floorNo : parseInt(v)});
    }

    function onRoomChange(v : string){
        setRoom(parseInt(v));
        onSeatChange(undefined);
        refetchSeats({
            roomNo : parseInt(v),
            floorNo : floor
        })
    }

    function onSeatChange(v : string | undefined){
        if(!v || !seats){
            props.setSeatId(undefined);
        }
        else{
            let t = seats.freeSeatInRoom.find(s => s.seatLabel == v);
            if(t){
                props.setSeatId(t.seatId);
            }
            else{
                props.setSeatId(undefined);
            }
        }
        setSeat(v);
    }

    function autoAssignOnClick(){
        query({
            onCompleted : (data)=>{
                setFloor(data.freeSeat.room.floor.floorNo);
                setRoom(data.freeSeat.room.roomNo);
                setSeat(data.freeSeat.seatLabel)
                props.setSeatId(data.freeSeat.seatId);
            },
            onError : (err)=>{
            }
        });
    }

    const width = 130

    return (

        <div style={{
            ... props.containerStyle
        }}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 20}}>
                {
                    <MUISelectStyled items={ floors ? floors.freeFloors.map(f => f.floorNo.toString()) : []}
                    placeHolder="Floor"
                    setVal={onFloorChange}
                    val={floor? floor.toString() : "" }
                    type="single"
                    prefix="Floor - "
                    width={width}
                    />
                }     
                {
                    <MUISelectStyled items={rooms ? rooms.freeRoomInFloor.map(r => r.roomNo.toString()) : []}
                    placeHolder="Room"
                    setVal={onRoomChange}
                    val={room? room.toString() : "" }
                    type="single"
                    prefix="Room - "
                    width={width}
                    />
                }      
                {
                    <MUISelectStyled items={ seats ?  seats.freeSeatInRoom.map(s => s.seatLabel) : []}
                    placeHolder="Seat"
                    setVal={onSeatChange}
                    val={seat? seat.toString() : "" }
                    type="single"
                    prefix="Seat - "
                    width={width}
                    />
                }          
            </div>
            <div>
                {
                    props.autoAssign && 
                    <Button variant="outlined" color='primary' onClick={autoAssignOnClick}>Auto assign</Button>

                }
            </div>
        </div>
    )
}