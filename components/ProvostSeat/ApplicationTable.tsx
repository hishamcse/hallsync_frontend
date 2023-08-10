import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {application} from "../../pages/seatManagement";
import {ApplicationsQuery} from "../../graphql/__generated__/graphql";
import styles from "../../styles/seatManagementIndex.module.scss";
import {Button} from "@mui/material";

function getApplicationType(application: application) {
    if (application.newApplication)
        return 'new seat';
    else if (application.seatChangeApplication) {
        return 'room change';
    }
    return 'temp seat';
}

export default function ApplicationTable(props: {
    applications : ApplicationsQuery['applications']['applications'],
    onClick : (a : application)=>void
}) {

    let statusClassMap: any = {
        'PENDING': styles.pending,
        'ACCEPTED': styles.accepted,
        'REJECTED': styles.rejected,
    }

    return (
        <TableContainer component={Paper} sx={{overflow: "hidden"}}>
            <Table stickyHeader sx={{ width: '100%', border: '1px solid black', borderRadius: '20px', margin: 'auto',
                height: "max-content", overflowY: "scroll"}} aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <b><i>Name</i></b> <br/>
                            <b><i>Roll</i></b>
                        </TableCell>
                        <TableCell align="right" >
                            <b><i>Dept</i></b> <br/>
                            <b><i>Date</i></b>
                        </TableCell>
                        <TableCell align="right" >
                            <b><i>Batch</i></b> <br/>
                            <b><i>Application Type</i></b>
                        </TableCell>
                        <TableCell align="right" >
                            <b><i>Level/Term</i></b> <br/>
                            <b><i>Status</i></b>
                        </TableCell>
                        <TableCell align="right" >
                            <b><i>Action</i></b> <br/>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props?.applications?.map((row) => (
                        <TableRow
                            key={row.student.name + Math.random().toString()}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component='th'>
                                {row.student.name} <br />
                                {row.student.student9DigitId}
                            </TableCell>

                            <TableCell align="right">
                                {row.student.department.shortName} <br />
                                {new Date(row.createdAt).toLocaleDateString()}
                            </TableCell>

                            <TableCell align="right">
                                {row.student.batch.year} <br />
                                {getApplicationType(row)}
                            </TableCell>

                            <TableCell align="right">
                                {row.student.levelTerm.label} <br/>
                                <span className={statusClassMap[row.status]}>{row.status}</span>
                            </TableCell>

                            <TableCell align="right">
                                <Button variant='outlined' color='inherit'
                                        onClick={_=>props.onClick(row)}>
                                    View Details
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}