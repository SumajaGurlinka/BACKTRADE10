import axiosInstance1 from "../utils/axiosInstance1";

export const symbol = {
  state: {
    symbolData: [],

    isLoading: false,
  },

  reducers: {
    setSymbol: (state, payload) => {
      return {
        ...state,

        symbolData: payload,

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
    getSymbolAsync: async ({Symbol }, rootState) => {
      try {
       

        const url = `/getsymbol?symbol=${Symbol}`;

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axiosInstance1.get(url, config);

        const { data = undefined } = response;

        console.log("symbol", data);

        if (data) {
          dispatch.symbol.setSymbol(data);
        }
      } catch (error) {
        console.log("Api > Error > Symbol >", error.response);

        throw error;
      }
    },
  }),
};
