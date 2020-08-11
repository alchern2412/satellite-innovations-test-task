import React, { useState, useRef, useEffect } from 'react';
import './App.scss';
import Circle from './components/Circle/Circle';
import Square from './components/Square/Square';

const App = () => {
  const canvasRef = useRef(null)
  // { id: '', type: 'circle', position: }
  const [figures, setFigures] = useState([
    {
      x: 0,
      y: 0,
      type: 'rect'
    },
    {
      x: 100,
      y: 0,
      type: 'rect'
    },
    {
      x: 0,
      y: 100,
      type: 'rect'
    },
    {
      x: 100,
      y: 100,
      type: 'rect'
    },
  ])

  const [mouse, setMouse] = useState({})

  const [selected, setSelected] = useState(false)

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
          figure.x = mouse.x
          figure.y = mouse.y
        }
        return figure
      }))
    }
  }

  const onMouseDown = e => {
    setMouse(prevMouse => ({ ...prevMouse, down: true }))
    figures.forEach(figure => {
      if (isCursorInFigure(mouse.x, mouse.y, figure)) {
        console.log('selected figure', figure)
        setSelected(figure)
      }
    })


  }
  const onMouseUp = e => {
    setMouse(prevMouse => ({ ...prevMouse, down: false }))
  }

  const isCursorInFigure = (x, y, figure) => {
    return x > figure.x && x < figure.x + 80
      && y > figure.y && y < figure.y + 50
  }

  // const onClick = e => {
  //   figures.forEach(figure => {
  //     if (isCursorInFigure(mouse.x, mouse.y, figure)) {
  //       console.log('selected figure', figure)
  //       setSelected(figure)
  //     }
  //   })
  // }

  const onDragStart = e => {
    console.log(e)

  }

  const drawFigure = (figure) => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.fillStyle = '#0F0'
    ctx.lineWidth = 1;
    ctx.fillRect(figure.x, figure.y, 80, 50)
    if (figure === selected) {
      ctx.lineWidth = 4
    }
    // 
    ctx.strokeStyle = '#000'
    ctx.stroke()
    ctx.strokeRect(figure.x, figure.y, 80, 50)

  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, 848, 615)
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
              <Circle /* onDragStart={ onDragStart } */ />
            </div>
            <div className="figures__figure">
              <Square />
            </div>

          </div>
          <div className="table__body-item">
            <canvas
              width="848px"
              height="615px"
              onMouseMove={ onMouseMove }
              onMouseDown={ onMouseDown }
              onMouseUp={ onMouseUp }
              // onClick={ onClick }
              onDragStart={ onDragStart }
              // onMouseUp= { onMouseOver}
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
