import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.scss';
import Circle from './components/Circle/Circle';
import Square from './components/Square/Square';

const App = () => {
  const canvasRef = useRef(null)
  // { id: '', type: 'circle', position: }
  const [figures, setFigures] = useState([
    {
      id: uuidv4(),
      x: 0,
      y: 0,
      type: 'rect'
    },
    {
      id: uuidv4(),
      x: 100,
      y: 0,
      type: 'rect'
    },
    {
      id: uuidv4(),
      x: 0,
      y: 100,
      type: 'circle'
    },
    {
      id: uuidv4(),
      x: 100,
      y: 100,
      type: 'rect'
    },
  ])

  const [mouse, setMouse] = useState({})

  const [selected, setSelected] = useState(false)

  const onDragStart = (e, type) => {
    e.dataTransfer.setData("type", type);
  }

  const onMouseMove = e => {
    // console.log('x', e.pageX)

    const x = e.pageX - canvasRef.current.offsetLeft
    const y = e.pageY - canvasRef.current.offsetTop
    setMouse(prevMouse => ({
      ...prevMouse,
      x,
      y,
    }))

    if (selected && mouse.down) {
      setFigures(figures.map(figure => {
        if (figure === selected) {
          figure.x =  mouse.x - 80 / 2
          figure.y = mouse.y - 50 / 2
        }
        return figure
      }))
    }
  }

  const onMouseDown = e => {
    let isCursorOnAnyFigure = false
    setMouse(prevMouse => ({ ...prevMouse, down: true }))
    figures.forEach(figure => {
      if (isCursorInFigure(mouse.x, mouse.y, figure)) {
        // console.log('selected figure', figure)
        setSelected(figure)
        setFigures(prevFigures => ([...prevFigures, figure]))
        isCursorOnAnyFigure = true;
      }
    })

    if (!isCursorOnAnyFigure) {
      setSelected(false)
    }

  }

  const onMouseUp = e => {
    setMouse(prevMouse => ({ ...prevMouse, down: false }))
  }

  const isCursorInFigure = (x, y, figure) => {
    return x > figure.x && x < figure.x + 80
      && y > figure.y && y < figure.y + 50
  }

  const onDragOver = e => {
    e.preventDefault()
    const x = e.pageX - canvasRef.current.offsetLeft
    const y = e.pageY - canvasRef.current.offsetTop
    setMouse(prevMouse => ({
      ...prevMouse,
      x,
      y,
    }))
  }

  const onDrop = e => {
    let type = e.dataTransfer.getData("type");
    // console.log(e)
    const draggedFigure = {
      id: uuidv4(),
      x: mouse.x - 80 / 2,
      y: mouse.y - 50 / 2,
      type
    }
    console.log('dropped', draggedFigure)
    setFigures(prevFigures => {
      // console.log('prevFigures', prevFigures)
      return ([...prevFigures, draggedFigure])
    })
    setSelected(draggedFigure)
  }

  const drawFigure = (figure) => {
    const ctx = canvasRef.current.getContext('2d')
    // ctx.beginPath();

    ctx.lineWidth = 1;
    if (figure === selected) {
      ctx.lineWidth = 4
    }
    // 
    ctx.strokeStyle = '#000'
    ctx.stroke()
    switch (figure.type) {
      case 'rect':
        ctx.fillStyle = '#0F0'
        ctx.fillRect(figure.x, figure.y, 80, 50)
        ctx.strokeRect(figure.x, figure.y, 80, 50)
        break
      case 'circle':
        ctx.fillStyle = '#00F'
        ctx.ellipse(figure.x + 80/2, figure.y + 50/2, 40, 25, 0, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke();
        ctx.beginPath();
        break
    }

  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, 848, 615)
    ctx.beginPath();
    figures.forEach(figure => {
      drawFigure(figure)
    })

  }, [selected, figures, mouse])

  return (
    <div className="content">
      <div className="table">
        <div className="table__header">
          <div className="table__header-item">
            Figures
          </div>
          <div className="table__header-item">
            Canvas
          </div>
        </div>
        <div className="table__body">
          <div className="table__body-item figures">
            <div className="figures__figure">
              <Circle onDragStart={ onDragStart } />
            </div>
            <div className="figures__figure">
              <Square onDragStart={ onDragStart } />
            </div>

          </div>
          <div
            className="table__body-item">
            <canvas
              width="848px"
              height="615px"
              onMouseMove={ onMouseMove }
              onMouseDown={ onMouseDown }
              onMouseUp={ onMouseUp }
              // onClick={ onClick }
              onDragOver={ onDragOver }
              onDrop={ onDrop }
              ref={ canvasRef }
              className="canvas"
            ></canvas>


            {/* <div
              className="canvas"
              onDragOver={ e => onDragOver(e) }
              onDrop={ e => onDrop(e) }
              // onMouseMove={ onMouseMove }
              onClick={ onClick }
            >
              {
                figures.map((figure, id) => (
                  <Circle
                    x={ figure.x }
                    y={ figure.y }
                    id={ id }
                    onDragStart={ onDragStart }
                    
                  />
                ))
              }
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
