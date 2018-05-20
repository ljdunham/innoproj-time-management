import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class Task extends Component {
    constructor() {
        super();
        this.state = { title: '', description: '', start: '', end: '', complete: false }
    }

    render() {
        return (
            <div>
                <p>{this.state.title}</p>
                <p>{this.state.description}</p>
                <p>{this.state.start}</p>
                <p>{this.state.end}</p>
                <p>{this.state.complete}</p>
            </div>
        )

    }
};

export default Task;