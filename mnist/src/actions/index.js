import axios from 'axios'

export const predict = img_data => async dispatch => {
    const res = await axios.post('/api/predict', {img_data});
    console.log(res.data);

    dispatch({ type: 'result', payload: res.data.result });
 };


 export const logout = () => {
     return {
         type: 'logout',
         payload: null
     }
 }