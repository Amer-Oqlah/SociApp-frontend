import * as api from '../api/index.js';

export const fetchUsers = () => async (dispatch) => {
   
    try {
      const { data } = await api.fetchUsers();
  
      dispatch({ type: 'FETCH_ALL_USERS', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const friendsReq = (id_f) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
      const { data } = await api.friendsReq(id_f, user?.token);
  
      dispatch({ type: "F_Req", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const friendsAcc = (id_f) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
      console.log("action accept ")
    try {
      const { data } = await api.friendsAcc(id_f, user?.token);
         console.log("Accept update changed")
      dispatch({ type: "F_Acc", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const friendsRef = (id_f) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
      console.log("actions refuss")
    try {
      const { data } = await api.friendsRef(id_f, user?.token);
         console.log("refused update success")
      dispatch({ type: "F_Ref", payload: data });
    } catch (error) {
      console.log(error);
    }
  };