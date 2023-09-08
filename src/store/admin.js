import axiosInstance1 from "../utils/axiosInstance1";

export const admin = {
  state: {
    adminregisterData: [],
  },
  reducers: {
    setadminRegister: (state, payload) => {
      return {
        ...state,
        adminregisterData: payload,
      };
    },
  },
  effects: (dispatch) => ({
    getadminRegisterAsync: async (payload1, rootState) => {
      try {
        console.log("test");
        let body = payload1;
        
        console.log(typeof(body));
        const url = "/adminsignup"; 
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        
        const response = await axiosInstance1.post(url, body, config);

        console.log(response);

        const { data = undefined } = response;

        if (data) {
          dispatch.admin.setadminRegister(data);
        }
      } catch (error) {
        console.log('Api > Error > Register >', error.response);
        throw error;
      }
    },
  }),
};
