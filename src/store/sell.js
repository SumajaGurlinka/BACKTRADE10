import axiosInstance1 from "../utils/axiosInstance1";

export const sell = {
  state: {
    sellData: [],
  },
  reducers: {
    setSell: (state, payload) => {
      return {
        ...state,
        sellData: payload,
      };
    },
  },
  effects: (dispatch) => ({
    getSellAsync: async ({ tick, Qty }, rootState) => {
      try {
        console.log(tick);
        const url = `http://localhost:9090/sellstocks?symbol=${tick}&quantity=${Qty}`;
        console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axiosInstance1.post(url,{}, config);
        console.log(response);

        const { data = undefined } = response;
        console.log(data);
        if (data) {
          localStorage.setItem('toast', data);
          dispatch.sell.setSell(data);

        }
      } catch (error) {
        console.log("Api > Error > Sell >", error.response);
        throw error;
      }
    },
  }),
};
