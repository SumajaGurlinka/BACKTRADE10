import axiosInstance1 from "../utils/axiosInstance1";

export const symbol1 = {
  state: {
    symbol1Data: [],

    isLoading: false,
  },

  reducers: {
    setSymbol1: (state, payload) => {
      return {
        ...state,

        symbol1Data: payload,

        isLoading: false,
      };
    },

    setLoading: (state, payload) => {
      return {
        ...state,

        isLoading: payload,
      };
    },
  },

  effects: (dispatch) => ({
    getSymbolAsync1: async ({Symbol1}, rootState) => {
      try {
       

        const url = `/getsymbol1?symbol1=${Symbol1}`;
console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axiosInstance1.get(url, config);

        const { data = undefined } = response;

        console.log("symbol1", data);

        if (data) {
          dispatch.symbol1.setSymbol1(data);
        }
      } catch (error) {
        console.log("Api > Error > Symbol1 >", error.response);

        throw error;
      }
    },
  }),
};
