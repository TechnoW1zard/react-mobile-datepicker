import React, { Component } from 'react';

class Modal extends Component {

    static defaultProps = {
        isOpen: false,
        animationDuration: 300,
    }

    constructor(props) {
        super(props);
        this.state = {
            shouldRender: props.isOpen,
            isVisible: props.isOpen,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            if (this.props.isOpen) {
                // Показываем модальное окно
                this.setState({ shouldRender: true }, () => {
                    // Небольшая задержка для triggering CSS transition
                    setTimeout(() => {
                        this.setState({ isVisible: true });
                    }, 10);
                });
            } else {
                // Скрываем модальное окно
                this.setState({ isVisible: false });
                // Удаляем из DOM после завершения анимации
                setTimeout(() => {
                    this.setState({ shouldRender: false });
                }, this.props.animationDuration);
            }
        }
    }

    render() {
        if (!this.state.shouldRender) {
            return null;
        }

        const modalStyle = {
            opacity: this.state.isVisible ? 1 : 0,
            transform: this.state.isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity ${this.props.animationDuration}ms ease-in-out, transform ${this.props.animationDuration}ms ease-in-out`,
        };

        const childrenWithProps = React.cloneElement(
            this.props.children, 
            { 
                ...this.props, 
                key: 'modal',
                style: {
                    ...this.props.children.props.style,
                    ...modalStyle,
                }
            }, 
            null
        );

        return childrenWithProps;
    }
}

export default Modal;
