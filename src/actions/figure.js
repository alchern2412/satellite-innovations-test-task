// import axios from 'axios'
import {
    ADD_FIGURE,
    DELETE_FIGURE,
    SELECT_FIGURE,
    SET_FIGURES
} from './types'

/* Action creators */
const deleteFigureActionCreator = (figure) => ({
    type: DELETE_FIGURE,
    payload: figure
})

const addFigureActionCreator = (figure) => ({
    type: ADD_FIGURE,
    payload: figure
})

const setFiguresActionCreator = (figures) => ({
    type: SET_FIGURES,
    payload: figures
})
// const getJogActionCreator = (jog) => ({
//     type: GET_JOG,
//     payload: jog
// })

// const jogErrorActionCreator = (msg, status) => ({
//     type: JOG_ERROR,
//     payload: {
//         msg,
//         status
//     }
// })

// const setFilterActionCreator = (name, value) => ({
//     type: SET_FILTER,
//     payload: {
//         name,
//         value
//     }
// })
// const setJogActionCreator = (jog) => ({
//     type: SET_JOG,
//     payload: jog
// })

/* Actions */
export const deleteFigure = (figure) => dispatch => {
    dispatch(deleteFigureActionCreator(figure))
}

export const addFigure = (figure) => dispatch => {
    dispatch(addFigureActionCreator(figure))
}

export const setFigures = (figures) => dispatch => {
    dispatch(setFiguresActionCreator(figures))
}

// export const getJog = (jogId) => async dispatch => {
//     try {
//         const res = await axios.get('https://jogtracker.herokuapp.com/api/v1/data/sync')
//         dispatch(getJogActionCreator(res.data.response.jogs.find(jog => jog.id.toString() === jogId.toString())))
//     } catch (err) {
//         dispatch(jogErrorActionCreator(err.response.statusText, err.response.status))
//     }
// }

// export const setJog = (jog) => dispatch => {
//     dispatch(setJogActionCreator(jog))
// }

// // Add jog
// export const addJog = (formData, history) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }

//     try {
//         dispatch(setJogsLoading(true))
//         await axios.post(`https://jogtracker.herokuapp.com/api/v1/data/jog`, formData, config)

//         history.push('/jogs')
//     } catch (err) {
//         dispatch(jogErrorActionCreator(err.response.statusText, err.response.status))
//         dispatch(setJogsLoading(false))
//     }
// }

// export const editJog = (formData, history) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }

//     try {
//         dispatch(setJogsLoading(true))
//         await axios.put(`https://jogtracker.herokuapp.com/api/v1/data/jog`, formData, config)
//         history.push('/jogs')
//     } catch (err) {
//         dispatch(jogErrorActionCreator(err.response.statusText, err.response.status))
//         dispatch(setJogsLoading(false))
//     }
// }

// export const setJogsLoading = loading => dispatch => {
//     dispatch({
//         type: SET_JOGS_LOADING,
//         payload: loading
//     })
// }

// export const setFilter = (name, value) => async dispatch => {
//     dispatch(setFilterActionCreator(name, value))
//     dispatch(getJogs())
// }