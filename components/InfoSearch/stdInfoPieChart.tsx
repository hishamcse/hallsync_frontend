import {CSSProperties, useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import MyCard from "../card";
import {PieChart_} from "../PieChart_";
import {Typography} from "@mui/material";
import {GET_DEPT_WISE_RESIDENT_STATS, GET_STUDENT_INFO_STATS} from "../../graphql/operations";
import {randomColorGenerator} from "../utilities";

const StdInfoPieChart = () => {

    const [seatInfoData, setSeatInfoData] = useState<any[]>([]);
    const [deptInfoData, setDeptInfoData] = useState<any[]>([]);
    const [colors2, setColors2] = useState<string[]>([]);

    let colors1 = ["#F2ED6F", "#98D9C2", "#F2A65A"]

    let [stdQuery, {data: data1}] = useLazyQuery(
        GET_STUDENT_INFO_STATS
    )

    let [deptQuery] = useLazyQuery(
        GET_DEPT_WISE_RESIDENT_STATS
    )

    const getData = () => {
        stdQuery({
            onCompleted: (data) => {
                let arr_std = []
                arr_std.push({
                    count: Math.round((data.fullStudentStats.totalAttached) * 100. / data.fullStudentStats.totalStudents),
                    name: "%Attached"
                })

                arr_std.push({
                    count: Math.round((data.fullStudentStats.totalResidents) * 100. / data.fullStudentStats.totalStudents),
                    name: "%Resident"
                })

                arr_std.push({
                    count: Math.round((data.fullStudentStats.totalTempResidents) * 100. / data.fullStudentStats.totalStudents),
                    name: "%Temp Resident"
                })

                setSeatInfoData(arr_std);
            }
        })

        deptQuery({
            onCompleted: (data) => {
                let arr_dept:any[] = []
                let colors2:string[] = []
                data.departmentWiseResidentStats.forEach((d ) => {
                   arr_dept.push({
                       count: d.totalResidents,
                       name: d.deptName
                   });
                   colors2.push(randomColorGenerator());
                });

                setDeptInfoData(arr_dept);
                setColors2(colors2);
            }
        });
    }

    useEffect(() => {
        getData();
    }, []);

    let textDivStyle: CSSProperties = {
        padding: "10px 20px",
        backgroundColor: "black",
        borderRadius: 10,
        margin: 5,
        width: 155
    }

    return (
        <MyCard title="Student Statistics"
                style={{
                    width: '100%',
                }}
        >
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <PieChart_ colors={colors1} data={seatInfoData} dataKey="count" h={250} w={400} name='Students'/>
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        {
                            data1 &&
                            <div style={textDivStyle}>
                                <Typography variant="subtitle2" color="#F2ED6F"> Total Students </Typography>
                                <Typography variant="h5"> {data1?.fullStudentStats.totalStudents} </Typography>

                            </div>
                        }
                        {
                            data1 &&
                            <div style={textDivStyle}>
                                <Typography variant="subtitle2" color="#98D9C2"> Attached </Typography>
                                <Typography variant="h5"> {data1?.fullStudentStats.totalAttached} </Typography>

                            </div>
                        }
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        {data1 &&
                            <div style={textDivStyle}>
                                <Typography variant="subtitle2" color="#F2ED6F"> Residents </Typography>
                                <Typography
                                    variant="h5">  {data1?.fullStudentStats.totalResidents} </Typography>
                            </div>
                        }
                        {data1 &&
                            <div style={textDivStyle}>
                                <Typography variant="subtitle2" color="#98D9C2"> Temp Residents </Typography>
                                <Typography
                                    variant="h5"> {data1?.fullStudentStats.totalTempResidents} </Typography>
                            </div>
                        }
                    </div>
                </div>
                <PieChart_ colors={colors2} data={deptInfoData} dataKey="count" h={250} w={400} name='Resident'/>
            </div>
        </MyCard>
    )
}

export default StdInfoPieChart;