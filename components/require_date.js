import React, { Component } from 'react';
import { render } from 'react-dom';

const GetTime = () => {
    var date = new Date();
    return (
        console.log(date.toLocaleDateString('en-US'))
    )
}

export default GetTime;