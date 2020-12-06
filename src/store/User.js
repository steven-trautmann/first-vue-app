export const UserModule = {
    namespaced: true,
    state: {
        user: null
      },
      //directly changes the state
      mutations: {
        SET_USER(state, user){
          state.user = user;
        }
      },
      //calling mutations
      actions: {
        setUser({commit}, user){
          commit('SET_USER', user);
        }
      },
      modules: {
      }
    }