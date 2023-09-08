import { SessionTypes } from "../utils/sessionUtils";
export const user = {
    state: {
      price:"false",
      total:"",
      quantity:"hhjj",
   pausesSession:false
,      paidSession: true,
      activeSessionType: SessionTypes.SELECT_DATE,
      date:"",
      scroll:"",
      navigation:""
    },
    reducers: {
     
      setPaidSession: (state, payload) => {
        return {
          ...state,
          paidSession: payload,
        };
      },
      setPrice: (state, payload) => {
        return {
          ...state,
        price: payload,
        };
      },
      setTotalSession: (state, payload) => {
        return {
          ...state,
          total: payload,
        };
      },
      setQuantitySession: (state, payload) => {
        return {
          ...state,
          quantity: payload,
        };
      },
      setPausesSession: (state, payload) => {
        return {
          ...state,
          pausesSession: payload,
        };
      },
      setNavigation: (state, payload) => {
        return {
          ...state,
         navigation: payload,
        };
      },
      setActiveSessionType: (state, payload) => {
        return {
          ...state,
          activeSessionType: payload,
        };
      },
      
      setScroll: (state, payload) => {
        return {
          ...state,
          scroll: payload,
        };

      },
      setDate: (state, payload) => {
        return {
          ...state,
          date: payload,
        };},
      
    },
    effects: (dispatch) => ({
        loginAsync: async (payload, rootState) => {
          //TODO
        },
      }),
}