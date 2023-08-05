import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ApplicationDetailsQuery, VoteStatus} from "../../graphql/__generated__/graphql";

function createData(
    name: string,
    dept: string,
    batch: string,
    levelTerm: string,
    agreementStatus: string,
) {
    return { name, dept, batch, levelTerm, agreementStatus };
}

const rows = (seatChangeApp: ApplicationDetailsQuery['applicationDetails']['seatChangeApplication']) => {

    const residentsList: { name: string; dept: string; agreementStatus: string; }[] = [];

    seatChangeApp?.votes.forEach(vote => {
        const std = vote.student;
        residentsList.push(createData(std.name, std.department.shortName, std.batch.year, std.levelTerm.label, vote.status));
    })

    return residentsList;
}

export default function ResidentTable(props: {seatChangeApp: ApplicationDetailsQuery['applicationDetails']['seatChangeApplication']}) {
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
                    {rows(props.seatChangeApp).map((row) => (
                        <TableRow
                            key={row.name + Math.random().toString()}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.dept}</TableCell>
                            <TableCell align="right">
                                {row.agreementStatus == VoteStatus.Yes &&
                                    <span style={{color: '#00ff00'}}>{row.agreementStatus}</span>}
                                {row.agreementStatus == VoteStatus.No &&
                                    <span style={{color: 'red'}}>{row.agreementStatus}</span>}
                                {row.agreementStatus == VoteStatus.NotVoted &&
                                    <span style={{color: 'yellow'}}>{row.agreementStatus}</span>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
