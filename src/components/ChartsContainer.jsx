import React, {useState} from 'react';
import Wrapper from "../assets/wrappers/ChartsContainer";
import {useSelector} from "react-redux";
import BarCharts from "./BarCharts";
import AreaCharts from "./AreaCharts";

const ChartsContainer = () => {
    const [barChart, setBarchart] = useState(false)
    const {monthlyApplications: data} = useSelector(state => state.allJobs)
    return (
        <Wrapper>
            <h4>Monthly Application</h4>
            <button
                type={'button'}
                onClick={() => setBarchart(!barChart)}
            >
                {barChart? 'Area Chart': 'Bar Chart'}
            </button>
            {barChart? <BarCharts data={data}/>: <AreaCharts data={data}/>}
        </Wrapper>
    );
};

export default ChartsContainer;
