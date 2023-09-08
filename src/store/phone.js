import axiosInstance1 from "../utils/axiosInstance1";

export const phonr = {
  state: {
    phoneData: [],

   
  },

  reducers: {
    setPhone: (state, payload) => {
      return {
        ...state,

        phoneData: payload,

      
      };
    },

   
  },

  effects: (dispatch) => ({
    getPhoneAsync: async ({phone}, rootState) => {
        console.log("dddddddd");
      try {
       

        const url = `/editPhone?phone=${phone}`;
console.log(url);

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axiosInstance1.put(url, config);

        const { data = undefined } = response;

        console.log("phone", data);

        if (data) {
          localStorage.setItem('token', data.tokenValue);
       
         
        }
      } catch (error) {
        console.log("Api > Error > Phone>", error.response);

        throw error;
      }
    },
  }),
};
