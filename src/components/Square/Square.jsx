import React from 'react'
import PropTypes from 'prop-types'
import './Square.scss'

const Square = ({
    selected
}) => {
    return (
        <div
            draggable
            className="square"
        >
        </div>
    )
}

Square.propTypes = {
    selected: PropTypes.bool,
}

export default Square
