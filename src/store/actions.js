import { ADD} from './mutation-types'
export default {
    addAllGoods(context,payload){
        // context.state.AllGoods.push(payload)
        context.commit(ADD,payload)
    }
}