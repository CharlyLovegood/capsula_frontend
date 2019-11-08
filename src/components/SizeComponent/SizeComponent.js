import React from 'react';


class SizeComponent extends React.Component {
    constructor() {
        super();
        this.state = { 
            width: window.innerWidth,
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        this.setState({
            width: window.innerWidth
        });
    }

    render() {
        let width = this.state.width;
        return this.props.children(width)
    }
}

export default SizeComponent;