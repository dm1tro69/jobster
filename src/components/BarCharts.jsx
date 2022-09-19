import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";

const BarCharts = ({data}) => {
    return (
        <ResponsiveContainer width={'100%'} height={300}>
            <BarChart data={data} margin={{top: 50}}>
                <CartesianGrid strokeDasharray={'10 10'}/>
                <XAxis dataKey={'date'}/>
                <YAxis allowDecimals={false}/>
                <Tooltip/>
                <Bar dataKey={'count'} fill={'#2cb1bc'} barSize={75} stroke={'#2cb1bc'}/>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarCharts;
