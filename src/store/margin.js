import axiosInstance1 from "../utils/axiosInstance1";


export const margin = {
    state: {
      marginData: [],
      
    },
    reducers: {
      setMargin: (state, payload) => {
        return {
          ...state,
          marginData: payload,
        };
      },
     
    },
effects: (dispatch) => ({
getMarginAsync: async ( rootState) => {
try {

const url ="/dashboard";
console.log(url);
const config = {
headers: {
"Content-Type": "application/json",
},
};

const response = await axiosInstance1.post(url, config);
console.log(response);

const { data = undefined } = response;
console.log("margin",data);
if (data) {
dispatch.margin.setMargin(data);
}
} catch (error) {
console.log("Api > Error > margin >", error.response);
throw error;
}
},

}),
};