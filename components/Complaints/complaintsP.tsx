import useResidencyStatus from "../../hooks/useResidencyStatus";
import {useMutation, useQuery, useLazyQuery} from "@apollo/client";
import {GetComplaintsQuery, GetComplaintsByStudentQuery} from "../../graphql/__generated__/graphql";
import {useContext, useEffect, useState} from "react";
import {userContext} from "../../pages/_app";
import MyCard from "../card";
import {Button, DialogActions, DialogContent, TextField, Typography} from "@mui/material";
import {DateRangeIcon} from "@mui/x-date-pickers";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CampaignIcon from '@mui/icons-material/Campaign';
import CustomizedDialog from "../MUIDialog";
import {useRouter} from "next/router";
import MUIStyledTextarea from "../MUITextArea";
import {
    GET_COMPLAINTS,
    GET_COMPLAINT_BY_STD_ID,
    GET_INFO,
    GET_COMPLAINT_BY_TYPE,
    GET_COMPLAINT_FROM_DATE,
    ADD_COMPLAINT
} from "../../graphql/operations";
import {MyDatePicker} from "../DatePicker";
import {Dayjs} from "dayjs";
import {Filters} from "../Seat/ProvostSeat/ApplicationsList/filters";
import {SortBy} from "../Seat/ProvostSeat/ApplicationsList/sortby";
import styles from '../../styles/seatManagementIndex.module.scss'
import {GET_SELECTED_COMPLAINTS} from "../../graphql/operations";
import SingleComplaint, { SingleComplaint2 } from "./SingleComplaint";
import AddComplaintContent from "./AddComplaint";
import ComplaintTitle from "./ComplaintTitle";
import { Title } from "../Seat/ProvostSeat/AppDetailsTitle";
import { MyInput } from "../input";

const orderBy = 'createdAt';
const options = ['RESOURCE', 'STUFF', 'STUDENT']
const ComplaintsP = () => {

    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [order, setOrder] = useState<string>('asc');
    const [search, setSearch] = useState<string>('');
    const [searchGT3, setSearchGT3] = useState<string>('');
    const [page, setPage] = useState(1);
    const [fromDate, setFromDate] = useState<Dayjs | null>(null);


    let queryVars = {
        filters: {
            type: selectedTypes,
        },
        sort: {
            order: order,
            orderBy: orderBy
        },
        search: {
            searchBy: searchGT3
        },
        startDate: fromDate?.toISOString(),
        studentId: null
    }


    const {data, loading: loadingByType, error: errorByType, refetch} = useQuery(GET_SELECTED_COMPLAINTS, {
        variables: queryVars,
        onCompleted: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        }
    })


    function pageReset(s: (s: string[]) => void) {
        return (v: string[]) => {
            s(v);
            setPage(1);
        }
    }

    function setSearch_(s: string) {
        setSearch(s);
        if (s.trim().length >= 3) {
            setSearchGT3(s);
            setPage(1);
        } else {
            setSearchGT3('');
        }
    }

    function filterResetOnClick() {
        setSelectedTypes([]);
    }

    function sortResetOnClick() {
        setOrder('asc');
    }

    return (
        <div>
            <Title text="Complaints" />
            <div>

                <div className={styles.filterSortContainer} style={{marginLeft : 20}}>
                
                    <Filters
                        items={[options]}
                        setVals={[setSelectedTypes]}
                        placeHolders={['Complaint Type']}
                        vals={[selectedTypes]}
                        resetOnClick={filterResetOnClick}
                        cardStyle={{
                            width: 500
                        }}
                    />
                    <SortBy
                        items={[['createdAt'], ['asc', 'desc']]}
                        setVals={[()=>{}, setOrder]}
                        vals={[orderBy, order]}
                        resetOnClick={sortResetOnClick}
                        cardStyle={{
                            width: 500
                        }}
                    />
                </div>
                <MyCard title={'Search From/By'} style={{
                    width : 500, marginLeft : 28
                }}>
                    
                    <div style={{
                        display : 'flex',
                        justifyContent : 'space-between',
                        alignItems : 'center',
                        marginTop : 20
                    }}>
                        <span> Title </span>
                        <MyInput type="text" value={search} onChange={setSearch_} placeHolder="Search By Title" style={{
                            height : 40,
                            width : '70%'
                        }} />
                    </div>
                    <div style={{
                        display : 'flex',
                        justifyContent : 'space-between',
                        alignItems : 'center',
                        marginTop : 20
                    }}>
                        <span> Application From </span>
                        <MyDatePicker date={fromDate} handleDate={setFromDate}/>
                    </div>
                </MyCard>
            </div>
                    {/* <TextField
                        placeholder="Search"
                        style={{width: '100%', backgroundColor: '#000', color: '#fff'}}
                        onChange={(e) => setSearch_(e.target.value)}
                        value={search}
                    /> */}



            {
                <div style={{marginLeft : 15, marginTop : 30}}>

                    {
                        data && data.getSelectedComplaints.map((complaint, index) => {
                            return (
                                <div key={index} style={{margin: 15, display : "inline-block"}}>
                                    {/* <MyCard key={index} title={<ComplaintTitle complaint={complaint}/>} style={{width: '100%'}}> */}
                                        {<SingleComplaint2 complaint={complaint}/>}
                                    {/* </MyCard> */}
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default ComplaintsP;