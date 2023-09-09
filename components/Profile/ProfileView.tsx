import {ROOM_RESIDENTS} from "../../graphql/operations";
import {useQuery} from "@apollo/client";
import {useContext, useEffect, useState} from "react";
import ProfileInfo from "../Seat/ProvostSeat/ProfileInfo";
import MyCard from "../card";
import * as React from "react";
import {Title} from "../Seat/ProvostSeat/AppDetailsTitle";
import RoomPreference from "../Seat/StudentSeat/RoomPref";
import {generateRoomNumber} from "../utilities";
import {LoginMutation, ResidencyStatus, SelectedRoomStudentsQuery} from "../../graphql/__generated__/graphql";
import InfoTable from "../InfoSearch/infoTable";
import {userContext} from "../../pages/_app";

const ProfileView = () => {

    const {user} = useContext(userContext);
    const [profileInfo, setProfileInfo] = useState<LoginMutation['login']['student']>();
    const [seat, setSeat] = useState<any>();
    const [fullRoomNo, setFullRoomNo] = useState<number>(0);
    const [roomId, setRoomId] = useState<number>(0);

    const [roomResidents, setRoomResidents] =
        useState<SelectedRoomStudentsQuery['selectedRoomStudents']>([]);

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

    useEffect(() => {
        let item = localStorage.getItem('token');
        console.log(item)
        if(item && user && user.student) setProfileInfo(user.student);
        if(item && user && user.student && user.student.residencyStatus == ResidencyStatus.Resident) {
            const room = user.student.residency?.seat.room;
            if(room) {
                const floor = room.floor.floorNo;
                const block = room.floor.roomLabelLen;
                const roomNo = room.roomNo;
                const roomId = room.roomId;

                setFullRoomNo(generateRoomNumber(floor, block, roomNo));
                setSeat(user.student.residency?.seat)
                setRoomId(roomId)
            }
        }
    }, [])

    return (
        <div>
            <Title text="Your Profile"/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {
                    profileInfo && profileInfo.name &&
                    <MyCard title='Profile' style={{
                        minWidth: 550, marginLeft: 35
                    }}>
                        <ProfileInfo info={profileInfo}/>
                    </MyCard>
                }
                {
                    seat &&
                    <MyCard title='Alloted Room' style={{
                        minWidth: 550, marginRight: 35, height: 200
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
                            margin: 35,
                        }}
                >
                    <InfoTable students={roomResidents}/>
                </MyCard>
            }
        </div>
    )
}

export default ProfileView