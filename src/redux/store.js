import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { JobReducerVerified, jobReducerDelete, loadJobReducer, loadSingleJobReducer, loadallJobReducer } from "./reducers/jobReducer";
import { allUserReducer, userReducerDelete, userReducerLogout, userReducerSignIn, userReducerSignUp } from "./reducers/UserReducer";
import { RecruiterJob, RecruiterProfile } from "./reducers/recruiterReducer";

//combine reducers
const reducer = combineReducers({
  loadJobs: loadJobReducer,
  loadAllJobs: loadallJobReducer,
  signIn: userReducerSignIn,
  logOut: userReducerLogout,
  job: RecruiterJob,
  profiles: RecruiterProfile,
  singleJob: loadSingleJobReducer,
  allusers: allUserReducer,
  signUp: userReducerSignUp,
  deleteuser: userReducerDelete ,
  jobverif: JobReducerVerified,
  deletejob:jobReducerDelete,
});

//initial state
let initialState = {
  signIn: {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
