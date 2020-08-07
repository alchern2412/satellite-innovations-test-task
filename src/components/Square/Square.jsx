import React from 'react'
import PropTypes from 'prop-types'
import './Square'

const Square = ({
    color,
    selected
}) => {
    return (
        <div className="square"> 
        </div>
    )
}

Square.propTypes = {
    color: PropTypes.string.isRequired,
    selected: PropTypes.bool,
}

export default Square
