import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Input } from 'antd'
import store from './store'
import { List, Button, notification ,Icon} from 'antd'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()

    store.subscribe(this.changeState)
  }

  changeVal = (e) => {
    const action = {
      type: 'change_value',
      value: e.target.value
    }
    // 将 input 的 value 传递给 store
    store.dispatch(action)
  }

  changeState = () => {
    this.setState(store.getState())
  }

  add = () => {
    console.log('点击 le')
    if (this.state.val) {
      const action = {
        type: 'change_list',
      }
      store.dispatch(action)
    } else {
      notification.open({
        message: '温馨提示',
        description: '输入不能为空',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    }
    
  }
  del = (val) => {
    console.log(val)
    const delAction = {
      type: 'del_list',
      i: val
    }
    store.dispatch(delAction)
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          <Input 
            placeholder = "todo list" 
            value = {this.state.val}
            onChange = {this.changeVal}
            onPressEnter = {this.add}
          />
          <Button type="primary" onClick={this.add}>添加</Button>
        </div>
        <div className="list">
          <List
            header={<div>todo list</div>}
            footer={<div className="len">{ this.state.list.length }</div>}
            bordered
            dataSource={store.getState().list}
            avatar="hh"
            renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar = {
                  <Icon type = "close-circle"
                  theme = "twoTone"
                  onClick = {this.del.bind(this, item.i)}
                  />
                }
              />
              <div>{item.content}</div>
            </List.Item>)}
          />
        </div>
      </div>
    );
  }
}

export default App;
