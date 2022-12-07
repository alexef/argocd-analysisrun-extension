import React from "react"
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts"

const greenColor = "#1abe94";
const redColor = "#ea6d76";
const grayColor = "#6d7f8b";
const lightGrayColor = "#dde6eb";
const barColors = [lightGrayColor, grayColor];

function formatDate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
}

const CustomizedDot = (props: any) => {
    const { cx, cy, payload, value } = props;

    if (isNaN(value)) {
        return <></>;
    }
    var color = grayColor;

    if (payload.phase == 'Successful') {
        color = greenColor;
    } else if (payload.phase == 'Failed') {
        color = redColor;
    }   
    return (
        <svg x={cx - 10} y={cy - 10} width={20} height={20} fill={color} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="20" />
        </svg>
    );
};

export const TimeSeriesChart = (props: { data: Array<{ date: string }>, series: string[] }) => {

    return <LineChart width={500} height={300} data={props.data}>
        <XAxis dataKey="date" tickFormatter={formatDate} />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        {props.series.map((s, index) =>
            <Line connectNulls type="monotone" dataKey={s} stroke={barColors[index % barColors.length]} strokeWidth={3} dot={<CustomizedDot />} />
        )}
    </LineChart>
}