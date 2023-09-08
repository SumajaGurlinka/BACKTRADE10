import axiosInstance1 from "../utils/axiosInstance1";

export const orders = {
  state: {
    ordersData: [],
    isLoading: false, 
  },
  reducers: {
    setOrders: (state, payload) => {
      return {
        ...state,
        ordersData: payload,
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
    getOrdersAsync: async ( rootState) => {
      try {
        dispatch.orders.setLoading(true); 

        const url = "/getorders";
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axiosInstance1.get(url, config);
        const { data = undefined } = response;
console.log("orders",data);
        if (data) {
          dispatch.orders.setOrders(data);
        }
      } catch (error) {
        console.log("Api > Error > orders >", error.response);
        throw error;
      }
    },
  }),
};
