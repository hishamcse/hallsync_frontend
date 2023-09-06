import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';

dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  selected : boolean;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'selectedDay',
})<CustomPickerDayProps>(({ theme, selected }) => ({
  ...(selected && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
    backgroundColor: 'crimson'
  })
})) as React.ComponentType<CustomPickerDayProps>;

function Day(props: PickersDayProps<Dayjs> & { selectedDay?: Dayjs[] }) {
  const { day, selectedDay, ...other } = props;

  if (selectedDay == null) {
    return <PickersDay day={day} {...other} />;
  }

  const selected = selectedDay.some((selectedDate) => dayjs(selectedDate).isSame(day, 'day'));

  return (
    <CustomPickersDay
      {...other}
      day={day}
      selected={selected}
    />
  );
}

function CustomDay() {
  const [value, setValue] = React.useState<Dayjs[]>([dayjs('2023-09-17'), dayjs('2023-09-18')]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        slots={{ day: Day }}
        slotProps={{
          day: {
            selectedDay: value,
          } as any,
        }}
      />
    </LocalizationProvider>
  );
}

export default function CustomDayExample() {
  return (
    <div className='contentRoot' style={{
      color : "white"
    }}>
      <CustomDay />
    </div>
  )
}
