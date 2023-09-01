import {Cell, Label, Legend, Pie, PieChart} from "recharts";

export function PieChart_(
    props : {
        w : number,
        h : number,
        data : any[],
        dataKey : string,
        colors : string[],
        ir? : number,
        or? : number,
        name? : string
    }
) {

    return (
        <PieChart width={props.w} height={props.h}>
            <Pie data={props.data} dataKey={props.dataKey}
                 cx="50%" cy="50%" innerRadius={props.ir ?? 70} outerRadius={props.or ?? 90}
                 label paddingAngle={5} >
                {
                    props.data.map((d, i) =>(
                        <Cell key={d.name} fill={props.colors[i]} />
                    ))
                }
                {
                    props.name &&
                    <Label value={props.name} position="center" fill='#F4DBD8'/>
                }
            </Pie>
            <Legend  layout='vertical' align='right' verticalAlign='middle' />
            <Label>asdlfjsladfj sladkfj</Label>
        </PieChart>
    );
}