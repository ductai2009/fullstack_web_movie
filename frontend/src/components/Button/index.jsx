import className from 'classnames/bind';
import style from './Button.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
let cx = className.bind(style);
import { forwardRef } from 'react';

const Button = forwardRef(
    (
        {
            to,
            href,
            primary = false,
            outline = false,
            small = false,
            large = false,
            rounded = false,
            text = false,
            disable = false,
            state,
            leftIcon,
            rightIcon,
            className,
            clsTitle,
            children,
            onClick,
            preProps,
        },
        ref,
    ) => {
        let Comp = 'button';
        const props = {
            onClick,
            ...preProps,
        };
        if (disable) {
            Object.keys(props).forEach((key) => {
                if (key.startsWith('on')) {
                    delete props.key;
                }
            });
        }
        if (to) {
            props.to = to;
            props.state = state;
            Comp = Link;
        } else if (href) {
            props.href = href;
            Comp = 'a';
        }

        let classes = cx('wrapper', {
            [className]: className,
            primary,
            outline,
            small,
            large,
            rounded,
            text,
            disable,
        });
        let classTitle = cx('title', {
            [clsTitle]: clsTitle,
        });
        return (
            <Comp className={classes} {...props} ref={ref}>
                {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                <span className={classTitle}>{children}</span>
                {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
            </Comp>
        );
    },
);

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    rounded: PropTypes.bool,
    text: PropTypes.bool,
    disable: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    preProps: PropTypes.string,
};
Button.displayName = 'Button';

export default Button;
