import React, { Component } from 'react';

class Modal extends Component {

    static defaultProps = {
        isOpen: false,
    }

    render() {
        if (!this.props.isOpen) {
            return null;
        }

        return React.cloneElement(this.props.children, { ...this.props, key: 'modal' }, null);
    }
}

export default Modal;
