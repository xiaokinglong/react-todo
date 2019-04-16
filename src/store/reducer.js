import { Action } from "rxjs/internal/scheduler/Action";

// 基础的数据
const defaultsVlaue = {
  val: '',
  list: [],
}
// reducer中的数据是不能修改
export default (state= defaultsVlaue, action) => {
  if (action.type === 'change_value') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.val = action.value
    return newState
  }

  if (action.type === 'change_list') {
    const newState = JSON.parse(JSON.stringify(state))
    let item = {
      i: state.list.length,
      content: newState.val
    }
    newState.list.push(item)
    newState.val = ''
    return newState
  }

  // 删除某一项
  if (action.type === 'del_list') {
     const newState = JSON.parse(JSON.stringify(state))
     console.log(action)
     newState.list.forEach((item, index) => {
      if (item.i === action.i) {
          newState.list.splice(index, 1)
      }
     })
     return newState
  }
  return state
}