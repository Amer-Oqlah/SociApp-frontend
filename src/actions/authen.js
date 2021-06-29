import * as api from '../api/index.js';

export const signin = (bodyData,history)=> async (dispatch) => {

    try {
        const {data} = await api.signIn(bodyData);
        dispatch({type:"AUTH",data});
    
      history.push('/');
    } catch (error) {
      console.log(error)
    }
}
export const signup = (bodyData,history) => async (dispatch) => {
        console.log(bodyData)
    try {
        const {data} = await api.signUp(bodyData);
         
        dispatch({type:"AUTH",data});
       history.push('/');
      } catch (error) {
        console.log(error)
      }
}