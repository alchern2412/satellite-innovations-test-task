import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.scss';
import Circle from './components/Circle/Circle';
import Square from './components/Square/Square';

const App = () => {
  const canvasRef = useRef(null)
  const circleRef = useRef(null)
  const rectRef = useRef(null)
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

  const isCursorInCanvas = (x, y) => {
    console.log('x', x)
    console.log('canvasRef.current.left', canvasRef.current.left)
    return x >= canvasRef.current.offsetLeft && x <= canvasRef.current.offsetLeft + canvasRef.current.width
      && y >= canvasRef.current.offsetTop && y <= canvasRef.current.offsetTop + canvasRef.current.height
  }

  const onMouseMoveContent = (e) => {
    // console.log('mouse.Out', mouse.out)
    // console.log('selected', selected)
    if (mouse.out && selected && !isCursorInCanvas(e.pageX, e.pageY)) {
      switch (selected.type) {
        case 'circle':
          circleRef.current.style.top = `${e.pageY - 25}px`
          circleRef.current.style.left = `${e.pageX - 40}px`
          break
        case 'rect':
          rectRef.current.style.top = `${e.pageY - 25}px`
          rectRef.current.style.left = `${e.pageX - 40}px`
          break
      }

    } else {
      setMouse(prevMouse => ({
        ...prevMouse,
        out: false
      }))
    }

  }

  const onKeyPressContent = (e) => {
    console.log(e.key)
    if (e.key === 'Delete' && selected) {
      setFigures(prevFigures => prevFigures.filter(figure => figure !== selected))
      setSelected(false)
    }
  }

  const onDragStart = (e, type) => {
    console.log(e)
    e.dataTransfer.setData("type", type);
  }

  const onDrag = e => {
    // e.preventDefault()
    console.log('onDrag', e)
  }

  const onMouseMove = e => {
    e.stopPropagation()
    // console.log('x', e.pageX)

    const x = e.pageX - canvasRef.current.offsetLeft
    const y = e.pageY - canvasRef.current.offsetTop
    setMouse(prevMouse => ({
      ...prevMouse,
      x,
      y,
      out: false
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
    e.stopPropagation()
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
      // out: false
    }))
  }

  const onMouseOver = e => {
    console.log('onMouseOver')
    e.stopPropagation()
    if (selected && mouse.down) {
      setFigures(prevFigures => {
        return ([...prevFigures, selected])
      })
      setMouse(prevMouse => ({
        ...prevMouse,
        out: false
      }))

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

      setMouse(prevMouse => ({
        ...prevMouse,
        out: true
      }))

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

    document.onkeydown = e => {
      console.log(e.key)
      if (e.key === 'Delete' && selected) {
        setFigures(prevFigures => prevFigures.filter(figure => figure !== selected))
        setSelected(false)
      }
    }
  }, [selected, figures, mouse])

  return (
    <div className="content" onMouseDown={ onMouseDownContent } onMouseUp={ onMouseUpContent } onMouseMove={ onMouseMoveContent }>
      <div
        ref={ circleRef }
        className={ `circle drag-out ${mouse.out && selected.type === 'circle' ? 'active' : ''}` }
      />
      <div
        ref={ rectRef }
        className={ `square drag-out ${mouse.out && selected.type === 'rect' ? 'active' : ''}` }
      />
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
            // onKeyDown={onKeyPressContent}
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
