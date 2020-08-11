import React, { useRef } from 'react'
import Circle from './Circle/Circle';

const DragAndDrop = () => {

    const ballRef = useRef(null)

    const handleDown = (e) => {
        ballRef.current.style.position = 'absolute';
        moveAt(e);
        // переместим в body, чтобы мяч был точно не внутри position:relative
        document.body.appendChild(ballRef.current);

        ballRef.current.style.zIndex = 1000; // показывать мяч над другими элементами

        // передвинуть мяч под координаты курсора
        // и сдвинуть на половину ширины/высоты для центрирования
        function moveAt(e) {
            ballRef.current.style.left = e.pageX - ballRef.current.offsetWidth / 2 + 'px';
            ballRef.current.style.top = e.pageY - ballRef.current.offsetHeight / 2 + 'px';
        }

        // 3, перемещать по экрану
        document.onmousemove = function (e) {
            moveAt(e);
        }

        // 4. отследить окончание переноса
        ballRef.current.onmouseup = function () {
            document.onmousemove = null;
            ballRef.current.onmouseup = null;
        }
        // 5. Чтоб не обрабатывался как картинка браузером
        ballRef.current.ondragstart = function () {
            return false;
        };
    }

    return (
        <Circle ref={ ballRef }
            onMouseDown={ handleDown } />
        // <img ref={ ballRef }
        //     onMouseDown={ handleDown }
        //     src="https://js.cx/clipart/ball.svg" alt="" width={ 50 } height={ 50 } />
    )
}

export default DragAndDrop