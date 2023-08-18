import { useQuery } from "@apollo/client"
import { PREV_CALLS } from "../graphql/operations"
import { PrevCallQueryQuery } from "../graphql/__generated__/graphql"
import MyCard from "./card"
import { getDayAndMonthAndYearString } from "./utilities"
import styles from '../styles/components.module.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material"
const fontSize = 16;

function MessManagerApplication(props : {
    applications : PrevCallQueryQuery['prevCalls'][0]['applications']
}){

    
    return (
        <TableContainer component={Paper} sx={{overflow: "hidden", marginTop : "15px"}}>
            <Table stickyHeader sx={{ width: '100%', border: '1px solid black', borderRadius: '20px', margin: 'auto',
                height: "max-content", overflowY: "scroll"}} aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: fontSize }}>
                            <b><i>Name</i></b> <br/>
                            <b><i>Roll</i></b>
                        </TableCell>
                        <TableCell align="left" sx={{ fontSize: fontSize }}>
                            <b><i>Level/Term</i></b> <br/>
                            <b><i>Date</i></b>
                        </TableCell>
                        <TableCell align="left" sx={{ fontSize: fontSize }}>
                            <b><i>Batch</i></b> <br/>
                            {/* <b><i></i></b> */}
                        </TableCell>
                        <TableCell align="left" sx={{ fontSize: fontSize }}>
                            <b><i>Current Manager?</i></b> <br/>
                            <b><i>Previous Times</i></b>
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: fontSize }}>
                            <b><i>Action</i></b> <br/>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props?.applications?.map((row) => (
                        <TableRow
                            key={row.residency.residencyId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component='th' sx={{ fontSize: fontSize }}>
                                {row.residency.student.name} <br />
                                {row.residency.student.student9DigitId}
                            </TableCell>

                            <TableCell align="left" sx={{ fontSize: fontSize }}>
                                {row.residency.student.department.shortName} <br />
                                {row.residency.student.levelTerm.label}

                                {/* {new Date(row.appliedAt).toLocaleDateString()} */}
                            </TableCell>

                            <TableCell align="left" sx={{ fontSize: fontSize }}>
                                {row.residency.student.batch.year} <br />
                            </TableCell>

                            <TableCell align="left" sx={{ fontSize: fontSize }}>
                                {row.residency.isCurrentMessManager? "Yes" : "No"} <br/>
                                {row.residency.messManagerTimes}

                            </TableCell>

                            <TableCell align="center" sx={{ fontSize: fontSize }}>
                                <Button variant='outlined' color='inherit'
                                        onClick={()=>{}}>
                                    Approve
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function Call(props : {
    call : PrevCallQueryQuery['prevCalls'][0]
}){
    return (
        <div className={styles.callRoot}>
            <div className={styles.callTimeCountsContainer}>
                <div>
                    <div>
                        Total Applications : <span className={styles.totalApp}>{props.call.applicationsCount}</span> 
                    </div>
                    <div>
                        Accepted Applications : <span className={styles.acceptedApp}>{props.call.accepted}</span> 
                    </div>
                </div>
                <div>
                    <div>
                        From: &nbsp;
                        <span className={styles.rangeSpan}>
                            {getDayAndMonthAndYearString(props.call.from)}
                        </span>
                    </div>
                    <div>
                        To: &nbsp;
                        <span className={styles.rangeSpan}>
                        {getDayAndMonthAndYearString(props.call.to)}
                        </span>
                    </div>
                </div>
                
            </div>
            <div>
                <details>
                    <summary> Applcations </summary>
                    <MessManagerApplication applications={props.call.applications} />
                </details>
            </div>
        </div>
    )
}

export function PrevCalls(){
 

    let {data, loading, error} = useQuery(
        PREV_CALLS
    )



    return (
        <div>
            <MyCard title={"Previous Calls"} content={
                <div>
                    {
                        data?.prevCalls.map(d =>(
                            <Call call={d} />
                        ))
                    }
                </div>
            } style={{
                display : "block",
                marginRight : 10,
            }} />
        </div>
    )
}