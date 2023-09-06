import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { useQuery } from '@apollo/client';
import { GET_MEALPLANS_CALENDER } from '../../graphql/operations';

dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
    selected: boolean;
    isSelectedVal : boolean;

}

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
        prop !== 'selectedDay' && prop !== 'isSelectedVal',
})<CustomPickerDayProps>(({ theme, selected, isSelectedVal }) => ({
    ...(selected && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
        backgroundColor: '#00868D !important',
        color : "white !important"
    }),
    ...(isSelectedVal && {
        backgroundColor: '#FF6B00 !important',
        
    })
})) as React.ComponentType<CustomPickerDayProps>;

function Day(props: PickersDayProps<Dayjs> & { addedDays?: Dayjs[], value : Dayjs | null, selectedVal : Dayjs | null }) {
    const { day, addedDays, ...other } = props;

    if (addedDays == null) {
        return <PickersDay day={day} {...other} />;
    }
    let isSelectedVal = false;
    if(props.selectedVal){
        isSelectedVal = dayjs(props.selectedVal).isSame(day, 'day');
    }

    const selected = addedDays.some((selectedDate) => dayjs(selectedDate).isSame(day, 'day'));

    return (
        <CustomPickersDay
            {...other}
            day={day}
            selected={selected}
            isSelectedVal={isSelectedVal}
        />
    );
}

export function CustomDay(
    props: {
        mealTime: string,
        date : Dayjs | null,
        setDate : (e : Dayjs | null)=>void
    }
) {
    let {data, error} = useQuery(GET_MEALPLANS_CALENDER, {
        variables : {
            mealTime : props.mealTime
        },
        onError : (err) => console.log(err)
    })

    let days : Dayjs[] = []
    if(data){
        days = data.getAddedMealPlansByDateTime.map(d => dayjs(d.day))
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                slots={{ day: Day  as any }}
                slotProps={{
                    day: {
                        addedDays: days,
                        selectedVal : props.date
                    } as any,
                }}
                value={props.date}
                onChange={props.setDate}
            />
        </LocalizationProvider>
    );
}
