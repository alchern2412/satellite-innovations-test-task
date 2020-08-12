import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.scss';
import Circle from './components/Circle/Circle';
import Square from './components/Square/Square';

const App = () => {
  const canvasRef = useRef(null)
  const circleRef = useRef(null)
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
    console.log(e)
    e.dataTransfer.setData("type", type);
  }

  const onDrag = e => {
    // e.preventDefault()
    console.log('onDrag', e)
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
          figure.x = mouse.x - 80 / 2
          figure.y = mouse.y - 50 / 2
        }
        return figure
      }))
    }
  }

  const onMouseDown = e => {
    e.stopPropagation()
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

  const onMouseDownContent = e => {
    console.log('onMouseDownContent')
  }

  const onMouseUp = e => {
    console.log('onMouseUp')
    setMouse(prevMouse => ({ ...prevMouse, down: false }))
  }

  const onMouseUpContent = e => {
    console.log('onMouseUpContent')
    if (selected && mouse.down) {
      setSelected(false)
    }
    // setMouse(prevMouse => ({ ...prevMouse, down: false }))
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

  const onMouseOver = e => {
    if (selected && mouse.down) {
      setFigures(prevFigures => {
        return ([...prevFigures, selected])
      })
    }
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

  const onMouseOut = e => {
    if (mouse.down && selected) {
      setFigures(prevFigures => (prevFigures.filter(figure => figure !== selected)))
      
      // circleRef.current.drag()

      // const event = document.createEvent("CustomEvent");
      // event.initCustomEvent("dragstart", true, true, null);
      // event.clientX = circleRef.current.top;
      // event.clientY = circleRef.current.left;
      // circleRef.current.dispatchEvent(event);

      // const dataTransfer = new DataTransfer;
      // dataTransfer.setData("type", 'circle');
      // circleRef.current.dispatchEvent(new DragEvent('dragstart', { dataTransfer: dataTransfer }));

      // const event = document.createEvent('MouseEvents')
      // event.initEvent('dragstart', true, false)
      // circleRef.current.dispatchEvent(event)

    }
  }

  const onClick = e => {
    console.log('onClick')
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

    switch (figure.type) {
      case 'rect':
        ctx.fillStyle = '#0F0'
        ctx.fillRect(figure.x, figure.y, 80, 50)
        ctx.strokeRect(figure.x, figure.y, 80, 50)
        ctx.stroke()
        break
      case 'circle':
        ctx.fillStyle = '#00F'
        ctx.ellipse(figure.x + 80 / 2, figure.y + 50 / 2, 40, 25, 0, 0, 2 * Math.PI)
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
    <div className="content" onMouseDown={onMouseDownContent} onMouseUp={onMouseUpContent}>
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
              {/* <Circle onDragStart={ onDragStart } /> */ }
              <div
                onDragStart={ e => onDragStart(e, 'circle') }
                onDrag={ onDrag }
                draggable
                className="circle"
                ref={ circleRef }
                onClick={ onClick }
              >

              </div>
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
              onMouseOut={ onMouseOut }
              onMouseOver={ onMouseOver }
              // onClick={ onClick }
              onDragOver={ onDragOver }
              // onDrag={ onDragOver }
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
