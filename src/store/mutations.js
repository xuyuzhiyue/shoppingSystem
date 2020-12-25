import {ADD} from './mutation-types'
export default {
    //   addAllGoods(state,payload){
    //     state.AllGoods = []
    //       state.AllGoods.push(payload)
    //   }
      [ADD](state,payload){
        state.AllGoods = []
          state.AllGoods.push(payload)
      }
    }