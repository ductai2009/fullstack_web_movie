import './GlobalStyle.css';
import React from 'react';
import PropTypes from 'prop-types';
function GlobalStyle({ children }) {
    return React.Children.only(children);
}

GlobalStyle.prototype = {
    children: PropTypes.node.isRequired,
};

export default GlobalStyle;
