import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ResidencyStatus, RetrieveStudentsQuery, SelectedRoomStudentsQuery} from "../../graphql/__generated__/graphql";

const fontSize = 16;

type ResidentRow = {
    name: string,
    student9DigitId: string,
    dept: string,
    batch: string,
    levelTerm: string,
    residencyStatus: string
}

function createData(
    name: string,
    student9DigitId: string,
    dept: string,
    batch: string,
    levelTerm: string,
    residencyStatus: string
) {
    return { name, student9DigitId, dept, batch, levelTerm, residencyStatus };
}

const rows = (residents: SelectedRoomStudentsQuery['selectedRoomStudents']) => {

    const residentsList: ResidentRow[] = [];

    residents.forEach(resident => {
        residentsList.push(
            createData(
                resident.name, resident.student9DigitId, resident.department.shortName, resident.batch.year,
                resident.levelTerm.label, resident.residencyStatus.toString()
            )
        )
    });

    return residentsList;
}

const InfoTable = (props: {
    students: SelectedRoomStudentsQuery['selectedRoomStudents'] | RetrieveStudentsQuery['retrieveStudents']['students']
}) => {
    return (
        <TableContainer component={Paper} sx={{overflow: "hidden"}}>
            <Table stickyHeader sx={{ width: '100%', border: '1px solid black', borderRadius: '20px', margin: 'auto', marginTop: 2,
                height: "max-content", overflowY: "scroll"}} aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: fontSize }}>Name</TableCell>
                        <TableCell align="left" sx={{ fontSize: fontSize }}>StudentId</TableCell>
                        <TableCell align="left" sx={{ fontSize: fontSize }}>Dept</TableCell>
                        <TableCell align="left" sx={{ fontSize: fontSize }}>Batch</TableCell>
                        <TableCell align="left" sx={{ fontSize: fontSize }}>Level-Term</TableCell>
                        <TableCell align="left" sx={{ fontSize: fontSize }}>Residency Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows(props.students).map((row) => (
                        <TableRow
                            key={row.name + Math.random().toString()}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" sx={{ fontSize: fontSize }}>
                                {row.name}
                            </TableCell>
                            <TableCell align="left" sx={{ fontSize: fontSize }}>{row.student9DigitId}</TableCell>
                            <TableCell align="left" sx={{ fontSize: fontSize }}>{row.dept}</TableCell>
                            <TableCell align="left" sx={{ fontSize: fontSize }}>{row.batch}</TableCell>
                            <TableCell align="left" sx={{ fontSize: fontSize }}>{row.levelTerm}</TableCell>
                            <TableCell align="left" sx={{ fontSize: fontSize }}>
                                {row.residencyStatus == ResidencyStatus.Attached &&
                                    <span style={{color: '#EFF1F3'}}>{row.residencyStatus}</span>}
                                {row.residencyStatus == ResidencyStatus.Resident &&
                                    <span style={{color: '#00ff00'}}>{row.residencyStatus}</span>}
                                {row.residencyStatus == ResidencyStatus.TempResident &&
                                    <span style={{color: '#00eee0'}}>{row.residencyStatus}</span>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default InfoTable;
