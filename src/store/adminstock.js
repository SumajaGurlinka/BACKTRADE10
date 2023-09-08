import axiosInstance1 from "../utils/axiosInstance1";

export const adminstock = {
  state: {
    adminstockData: [],
    isLoading: false, 
  },
  reducers: {
    setAdminstock: (state, payload) => {
      return {
        ...state,
        adminstockData: payload,
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
    getAdminstockAsync: async ( rootState) => {
      try {
       

        const url = "/getadmindata";
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axiosInstance1.get(url, config);
        const { data = undefined } = response;
console.log("adminstock",data);
        if (data) {
          dispatch.adminstock.setAdminstock(data);
        }
      } catch (error) {
        console.log("Api > Error > adminstock >", error.response);
        throw error;
      }
    },
  }),
};
