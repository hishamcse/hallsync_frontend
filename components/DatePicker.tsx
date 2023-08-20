import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

export function MyDatePicker(
    props : {
        date : Dayjs | null,
        handleDate : (newValue: Dayjs | null) => void,
        width? : number,
        label? : string
}
){

    return (
        <div style={{
            display : "inline-flex",
            alignItems : "center"
        }}>
            <span style = {{
                marginRight : 10
            }} >{props.label}</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{
                    width : props.width ?? 180,
                    backgroundColor : "black",
                    '& input' : {
                        padding : '9px'
                    }
                }} value={props.date} 
                                onChange={props.handleDate}/>
            </LocalizationProvider>
        </div>
    )
}