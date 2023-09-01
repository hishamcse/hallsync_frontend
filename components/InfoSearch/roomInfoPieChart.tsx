import {CSSProperties, useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {GET_SEAT_INFO_STATS} from "../../graphql/operations";
import MyCard from "../card";
import {PieChart_} from "../PieChart_";
import {Typography} from "@mui/material";

const RoomInfoPieChart = () => {

    const [seatInfoData, setSeatInfoData] = useState<any[]>([]);
    const [roomInfoData, setRoomInfoData] = useState<any[]>([]);

    let [query, {data, loading}] = useLazyQuery(
        GET_SEAT_INFO_STATS
    )

    const getData = () => {
        query({
            onCompleted: (data) => {
                let arr_seat = []
                arr_seat.push({
                    count: Math.round((data.fullSeatStats.totalSeats - data.fullSeatStats.freeSeats) * 100. / data.fullSeatStats.totalSeats),
                    name: "%Occupied Seat"
                })
                arr_seat.push({
                    count: Math.round((data.fullSeatStats.freeSeats * 100.) / data.fullSeatStats.totalSeats),
                    name: "%Free Seat"
                })
                setSeatInfoData(arr_seat);

                let arr_room = []
                arr_room.push({
                    count: Math.round((data.fullSeatStats.totalRooms - data.fullSeatStats.freeRooms) * 100. / data.fullSeatStats.totalRooms),
                    name: "%Occupied Room"
                })
                arr_room.push({
                    count: Math.round((data.fullSeatStats.freeRooms * 100.) / data.fullSeatStats.totalRooms),
                    name: "%Free Room"
                })
                setRoomInfoData(arr_room);
            }
        })
    }

    useEffect(() => {
        getData();
    }, []);

    let textDivStyle: CSSProperties = {
        padding: "10px 30px",
        backgroundColor: "black",
        borderRadius: 10,
        margin: 10,
        width: 180
    }

    return (
        <MyCard title="Seat Related Statistics"
                style={{
                    width: '100%',
                }}
        >
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <PieChart_ colors={['#F2ED6F', '#FFFFFF']} data={seatInfoData} dataKey="count" h={250} w={400}/>
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        {
                            data &&
                            <div style={textDivStyle}>
                                <Typography variant="subtitle2" color="#F2ED6F"> Total Seat </Typography>
                                <Typography variant="h5"> {data?.fullSeatStats.totalSeats} </Typography>

                            </div>
                        }
                        {
                            data &&
                            <div style={textDivStyle}>
                                <Typography variant="subtitle2" color="#98D9C2"> Total Rooms </Typography>
                                <Typography variant="h5"> {data?.fullSeatStats.totalRooms} </Typography>

                            </div>
                        }
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        {data &&
                            <div style={textDivStyle}>
                                <Typography variant="subtitle2" color="#F2ED6F"> Occupied Seats </Typography>
                                <Typography
                                    variant="h5"> {data?.fullSeatStats.totalSeats - data?.fullSeatStats.freeSeats} </Typography>
                            </div>
                        }
                        {data &&
                            <div style={textDivStyle}>
                                <Typography variant="subtitle2" color="#98D9C2"> Occupied Rooms </Typography>
                                <Typography
                                    variant="h5"> {data?.fullSeatStats.totalRooms - data?.fullSeatStats.freeRooms} </Typography>
                            </div>
                        }
                    </div>
                </div>
                <PieChart_ colors={['#98D9C2', '#FFFFFF']} data={roomInfoData} dataKey="count" h={250} w={400}/>
            </div>
        </MyCard>
    )
}

export default RoomInfoPieChart;