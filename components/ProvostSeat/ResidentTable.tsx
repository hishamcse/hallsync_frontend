import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {RoomResident} from "./RoomChangeP";
import Card from "@mui/material/Card";

function createData(
    name: string,
    dept: string,
    agreementStatus: string,
) {
    return { name, dept, agreementStatus };
}

const rows = (residents: RoomResident[]) => {
    const residentsList: { name: string; dept: string; agreementStatus: string; }[] = [];

    residents.forEach(resident => {
        residentsList.push(createData(resident.name, resident.dept, resident.agreementStatus));
    })

    return residentsList;
}

export default function ResidentTable(props: {residents: RoomResident[]}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: 480, border: '1px solid white', borderRadius: '20px', margin: 'auto' }}
                   aria-label="simple table">
                <TableHead>
                    <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Dept</TableCell>
                            <TableCell align="right">Status&nbsp;</TableCell>
                        </TableRow>
                </TableHead>
                <TableBody>
                    {rows(props.residents).map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.dept}</TableCell>
                            <TableCell align="right">
                                {
                                    row.agreementStatus == 'Agreed' ?
                                    <span style={{color: '#00ff00'}}>{row.agreementStatus}</span> :
                                    <span style={{color: 'yellow'}}>{row.agreementStatus}</span>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
