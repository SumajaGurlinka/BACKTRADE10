import axiosInstance1 from "../utils/axiosInstance1";

export const autocomplete = {
  state: {
    autocompleteData: [],

    isLoading: false,
  },

  reducers: {
    setAutocomplete: (state, payload) => {
      return {
        ...state,

        autocompleteData: payload,

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
    getAutocompleteAsync: async ({symbol }, rootState) => {
      try {
       
console.log("DDD");
        const url = `/getsymbol?symbol=${symbol}`;
console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axiosInstance1.get(url, config);

        const { data = undefined } = response;

        console.log("autocomplete backend", data);

        if (data) {
          dispatch.autocomplete.setAutocomplete(data);
        }
      } catch (error) {
        console.log("Api > Error > Autocomplete>", error.response);

        throw error;
      }
    },
  }),
};
