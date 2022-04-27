
const initialState = {
  referral_link:"https://fingo.africa",
  company_name:"fingo.africa",
  id:"",
  name:"",
  email: "",
  phone: "",
  gender: "",
  created_at: ""
}

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case "update":
    return {
        ...state,
        ...action.data
      }
    default:
      return state;
  }
}

export default AppReducer;