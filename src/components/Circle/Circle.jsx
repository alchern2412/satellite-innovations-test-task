import React from 'react'
import PropTypes from 'prop-types'
import './Circle.scss'

const Circle = ({
    id,
    selected,
    onDragStart,
    x,
    y
}) => {
    
    return (
        <div
            onDragStart={ e => onDragStart(e, 'circle') }
            draggable
            className="circle">
            
        </div>
    )
}

Circle.propTypes = {
    selected: PropTypes.bool,
}

export default Circle
