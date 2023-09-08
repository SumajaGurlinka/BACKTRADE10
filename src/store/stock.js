import axiosInstance1 from "../utils/axiosInstance1";

export const stock = {
  state: {
    stockData: [],

    isLoading: false,
  },

  reducers: {
    setStock: (state, payload) => {
      return {
        ...state,

        stockData: payload,

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
    getStockAsync: async ({ selectedSymbol, marketPattern }, rootState) => {
      try {
        dispatch.stock.setLoading(true);

        const url = `/getstock?symbol=${selectedSymbol}&function=${marketPattern}`;

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axiosInstance1.get(url, config);

        const { data = undefined } = response;

        console.log("stock", data);

        if (data) {
          dispatch.stock.setStock(data);
        }
      } catch (error) {
        console.log("Api > Error > Stock >", error.response);

        throw error;
      }
    },
  }),
};
