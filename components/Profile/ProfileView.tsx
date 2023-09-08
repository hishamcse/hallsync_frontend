import {GET_INFO, ROOM_RESIDENTS} from "../../graphql/operations";
import {useQuery} from "@apollo/client";
import {useState} from "react";
import ProfileInfo from "../Seat/ProvostSeat/ProfileInfo";
import MyCard from "../card";
import * as React from "react";
import {Title} from "../Seat/ProvostSeat/AppDetailsTitle";
import RoomPreference from "../Seat/StudentSeat/RoomPref";
import {generateRoomNumber} from "../utilities";
import {SelectedRoomStudentsQuery} from "../../graphql/__generated__/graphql";
import InfoTable from "../InfoSearch/infoTable";

const ProfileView = () => {

    const [profileInfo, setProfileInfo] = useState<any>(undefined);
    const [seat, setSeat] = useState<any>();
    const [fullRoomNo, setFullRoomNo] = useState<number>(0);
    const [roomId, setRoomId] = useState<number>(0);

    const [roomResidents, setRoomResidents] =
        useState<SelectedRoomStudentsQuery['selectedRoomStudents']>([]);

    const {loading, error, data} = useQuery(GET_INFO, {
        onCompleted: (data) => {
            setProfileInfo(data.selfInfo.student);
            if (data.selfInfo?.student?.residency?.seat) {
                setSeat(data.selfInfo.student.residency.seat)
                setFullRoomNo(generateRoomNumber(data.selfInfo.student.residency.seat.room.floor.floorNo,
                    data.selfInfo.student.residency.seat.room.floor.roomLabelLen,
                    data.selfInfo.student.residency.seat.room.roomNo))
                setRoomId(data.selfInfo.student.residency.seat.room.roomId)
            }
        }
    });

    useQuery(ROOM_RESIDENTS, {
        variables: {
            roomId: roomId
        },
        onCompleted: (data) => {
            console.log(data);
            setRoomResidents(data.selectedRoomStudents);
        },
        onError: (error) => {
            console.log(error);
        }
    })

    return (
        <div>
            <Title text="My Profile"/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {
                    profileInfo &&
                    <MyCard title='Profile' style={{
                        minWidth: 550, marginLeft: 30
                    }}>
                        <ProfileInfo info={profileInfo}/>
                    </MyCard>
                }
                {
                    seat &&
                    <MyCard title='Alloted Room' style={{
                        minWidth: 550, marginRight: 30, height: 200
                    }}>
                        <RoomPreference
                            currentRoom={fullRoomNo} setSeatId={() => {
                        }}
                            seat={seat}
                            disable={true}
                        />
                    </MyCard>
                }
            </div>
            {
                roomResidents.length > 0 &&
                <MyCard title={`Residents of Your Room ${fullRoomNo}`}
                        style={{
                            width: '95%',
                            margin: 30,
                        }}
                >
                    <InfoTable students={roomResidents}/>
                </MyCard>
            }
        </div>
    )
}

export default ProfileView