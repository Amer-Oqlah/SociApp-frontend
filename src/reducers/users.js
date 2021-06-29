
export default (users = [], action) => {
    switch (action.type) {
      case 'FETCH_ALL_USERS':
        return action.payload;
      case 'F_Req':
        return users.map((user)=>user._id==action.payload._id?action.payload:user)
      case 'F_Acc':
         
        localStorage.setItem('profile', JSON.stringify({result:action.payload.updatedSender,token:JSON.parse(localStorage.getItem('profile')).token}));
         return action.payload.users
      case 'F_Ref':
        const token =JSON.parse(localStorage.getItem('profile')).token
      
        localStorage.setItem('profile', JSON.stringify({result:action.payload,token}));
         return users.map((user)=>user._id==action.payload._id?action.payload:user)
      default:
        return users;
    }
  };