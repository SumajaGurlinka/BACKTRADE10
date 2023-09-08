import axiosInstance1 from "../utils/axiosInstance1";


export const buy = {
    state: {
      buyData: [],
      
    },
    reducers: {
      setBuy: (state, payload) => {
        return {
          ...state,
          buyData: payload,
        };
      },
     
    },
effects: (dispatch) => ({
getBuyAsync: async ({ tick, Qty ,Price}, rootState) => {
try {
console.log(tick);
const url = `http://localhost:9090/buy?symbol=${tick}&quantity=${Qty}&price=${Price}`;
console.log(url);
const config = {
headers: {
"Content-Type": "application/json",
},
};

const response = await axiosInstance1.post(url, config);
console.log(response);

const { data = undefined } = response;
console.log("buy",data);
if (data) {
 
                 
  console.log("data",data);
  
    dispatch.buy.setBuy(data)
   
  }
;

} catch (error) {
console.log("Api > Error > buy>", error.response);
throw error;
}
},

}),
};