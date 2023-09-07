import MyCard from "../card";
import {Typography} from "@mui/material";
import MuiDropdown from "../MUIDropdown";
import {useEffect, useState} from "react";
import {useLazyQuery, useQuery} from "@apollo/client";
import {ALL_FLOORS, GET_ROOMS_IN_FLOOR, ROOM_RESIDENTS} from "../../graphql/operations";
import {SelectedFloorRoomsQuery, SelectedRoomStudentsQuery} from "../../graphql/__generated__/graphql";
import ShowRoomButtons from "./showRoomButtons";
import InfoTable from "./infoTable";

const OptionDropDown = (props: {title: string, options: string[], onChange: (e : any) => void, val: string}) => {
    return (
        <span style={{display: "flex", alignItems: 'center'}}>
                    <Typography variant="h6" sx={{
                        color: "white", fontWeight: 500, fontSize: 16, marginRight: 2
                    }}>{props.title}</Typography>
                    <MuiDropdown sx={{
                        backgroundColor: "black",
                        border: '1px solid white',
                        borderRadius: 1,
                    }}
                                 change={props.onChange} options={props.options}
                                 val={props.val} width={160}/>
                </span>
    )
}

const RoomSearch = () => {

    const [floorNo, setFloorNo] = useState<string>('1');
    const [roomStatus, setRoomStatus] = useState<string>('All');
    const [residentType, setResidentType] = useState<string>('All');

    const [allFloorNos, setAllFloorNos] = useState<string[]>([]);

    const [roomsInFloor, setRoomsInFloor] =
        useState<SelectedFloorRoomsQuery['selectedFloorRooms']>([]);

    const [fullRoomNo, setFullRoomNo] = useState<string>('');

    const [roomResidents, setRoomResidents] =
        useState<SelectedRoomStudentsQuery['selectedRoomStudents']>([]);

    let queryVars = {
        floorNo : parseInt(floorNo),
        roomStatus : roomStatus,
        residentType : residentType
    }

    const {loading, data, error} = useQuery(ALL_FLOORS, {
        onCompleted: (data) => {
            console.log(data);
            setAllFloorNos(data.allFloors.map((floor) => floor.toString()));
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const [roomResidentsQuery] = useLazyQuery(ROOM_RESIDENTS);

    const { refetch } = useQuery(
        GET_ROOMS_IN_FLOOR, {
            variables : queryVars,
            onCompleted: (data) => {
                console.log(data);
                setRoomsInFloor(data.selectedFloorRooms);
            }
        })

    useEffect(() => {
        refetch({
            ... queryVars
        })
    }, [])

    const getRoomResidents = (roomId : number, fullRoomNo: string) => {
        setFullRoomNo(fullRoomNo);
        roomResidentsQuery({
            variables : {
                roomId : roomId
            },
            onCompleted: (data) => {
                console.log(data);
                setRoomResidents(data.selectedRoomStudents);
            },
            onError: (error) => {
                console.log(error);
            }
        })
    }

    const roomStatusOptions = ['All', 'Occupied', 'Free'];
    const residentTypeOptions = ['All', 'Resident', 'Temp Resident'];

    const handleFloorNo = (e : any) => {
        setFloorNo(e.target.value);
    }

    const handleRoomStatus = (e : any) => {
        setRoomStatus(e.target.value);
    }

    const handleResidentType = (e : any) => {
        setResidentType(e.target.value);
    }

    return (
        <div>
            <MyCard title="Search Criterias"
                    style={{
                        width: '75%',
                        marginTop: 20,
                    }}
            >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 30,
                    marginRight: 20
                }}>
                    <OptionDropDown title='Floor No' options={allFloorNos} onChange={handleFloorNo} val={floorNo}/>
                    <OptionDropDown title='Room Status' options={roomStatusOptions} onChange={handleRoomStatus} val={roomStatus}/>
                    <OptionDropDown title='Resident Type' options={residentTypeOptions} onChange={handleResidentType} val={residentType}/>
                </div>
            </MyCard>

            <MyCard title="Rooms"
                    style={{
                        width: '100%',
                        marginTop: 20,
                    }}
            >
                <ShowRoomButtons allRooms={roomsInFloor} getRoomResidents={getRoomResidents}/>
            </MyCard>

            {
                roomResidents.length > 0 &&
                <MyCard title={`Residents in Room ${fullRoomNo}`}
                        style={{
                            width: '100%',
                            marginTop: 20,
                        }}
                >
                    <InfoTable roomResidents={roomResidents}/>
                </MyCard>
            }

        </div>
    )
}

export default RoomSearch