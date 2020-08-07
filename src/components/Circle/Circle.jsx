import React from 'react'
import PropTypes from 'prop-types'
import './Circle.scss'

const Circle = ({
    color,
    selected
}) => {
    return (
        <div className="circle">       
        </div>
    )
}

Circle.propTypes = {
    color: PropTypes.string.isRequired,
    selected: PropTypes.bool,
}

export default Circle
