import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

export function MyDatePicker(
    props : {
        date : Dayjs | null,
        handleDate : (newValue: Dayjs | null) => void,
        width? : number
}
){

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker sx={{
                width : props.width ?? 160,
            }} value={props.date} 
                            onChange={props.handleDate}/>
        </LocalizationProvider>
    )
}