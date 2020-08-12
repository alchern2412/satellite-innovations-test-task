import React from 'react'
import PropTypes from 'prop-types'
import './Square.scss'

const Square = ({
    selected,
    onDragStart
}) => {
    return (
        <div
            draggable
            onDragStart={e => onDragStart(e, 'rect')}
            className="square"
        >
        </div>
    )
}

Square.propTypes = {
    selected: PropTypes.bool,
}

export default Square
