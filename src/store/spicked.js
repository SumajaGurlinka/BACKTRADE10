import axiosInstance1 from "../utils/axiosInstance1";

export const spicked = {
  state: {
    spickedData: [],
    isLoading: false, 
  },
  reducers: {
    setSpicked: (state, payload) => {
      return {
        ...state,
        spickedData: payload,
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
    getSpickedAsync: async ({ selectedSymbol} ,rootState) => {
      try {
        dispatch.spicked.setLoading(true); 

        const url = `/getupdatedstock?symbol=${ selectedSymbol}`;
        console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axiosInstance1.get(url, config);
        const { data = undefined } = response;
console.log("spicked",data);
        if (data) {
          dispatch.spicked.setSpicked(data);
        }
      } catch (error) {
        console.log("Api > Error > Spicked >", error.response);
        throw error;
      }
    },
  }),
};
