import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import JobsContainer from "../components/JobsContainer";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/JobsContainer">
                <JobsContainer/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
