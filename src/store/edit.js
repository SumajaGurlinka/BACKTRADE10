import axiosInstance1 from "../utils/axiosInstance1";

export const edit = {
  state: {
    editData: [],

    isLoading: false,
  },

  reducers: {
    setEdit: (state, payload) => {
      return {
        ...state,

        editData: payload,

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
    getEditAsync: async ({email}, rootState) => {
        console.log("dddddddd");
      try {
       

        const url = `/editEmail?email=${email}`;
console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axiosInstance1.put(url, config);

        const { data = undefined } = response;

        console.log("edit", data);

        if (data) {
          dispatch.edit.setEdit(data);
        }
      } catch (error) {
        console.log("Api > Error > Edit>", error.response);

        throw error;
      }
    },
  }),
};
