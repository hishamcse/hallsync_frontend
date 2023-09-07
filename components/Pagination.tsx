import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

export default function PaginationControlled(props : {
    page : number,
    setPage : (v : number)=> void,
    count : number
}) {
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        props.setPage(value);
    };

    return (
        <Stack spacing={2}>
            <Pagination count={props.count} page={props.page} onChange={handleChange} />
        </Stack>
    );
}