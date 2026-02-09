//创建reducer--这是数据的管理员   tab.js数据仓库
import {createSlice} from '@reduxjs/toolkit'

const tabSlice = createSlice({
    name:'tab',
    initialState:{
        isCollapse:false,
        tabList:[
            {
                path: '/',
                name: 'home',
                label: '首页'
            }
        ]
    },
    reducers:{
        collapseMenu: state =>{
            state.isCollapse = !state.isCollapse
        },
        // 设置菜单时，需要调用相应的reducer来设置数据
        //默认情况下拿到state，如果拿到数据，还有第二个参数，pyload起别名解构出来叫val
        selectMenuList: (state , { payload: val}) =>{
            if(val.name !== 'home'){
                //去除掉已经存在的tag
                const ressult = state.tabList.findIndex(item => item.name === val.name)
                if(ressult ===-1){
                    state.tabList.push(val)
                }
            }
        }
    }
})

export const {collapseMenu, selectMenuList} = tabSlice.actions
export default tabSlice.reducer


// // 购物清单的初始状态
// const 初始清单 = ['鸡蛋', '面包']

// // 处理中心（reducer）
// function 处理中心(当前清单, 信件) {
//   if (信件.type === 'ADD_ITEM') {
//     // 复制当前清单，添加新东西
//     return [...当前清单, 信件.item]
//   }
//   return 当前清单
// }

// // 创建信箱系统（store）
// const 信箱 = {
//   当前清单: 初始清单,
//   dispatch: function(信件) {
//     // 1. 把信送到处理中心，更新清单
//     this.当前清单 = 处理中心(this.当前清单, 信件)
    
//     // 2. 通知所有人清单更新了
//     console.log('清单更新了！', this.当前清单)
//   }
// }

// // 使用它！
// 信箱.dispatch({ type: 'ADD_ITEM', item: '牛奶' })
// // 输出：清单更新了！ ['鸡蛋', '面包', '牛奶']

// 信箱.dispatch({ type: 'ADD_ITEM', item: '咖啡' })
// // 输出：清单更新了！ ['鸡蛋', '面包', '牛奶', '咖啡']


// function 购物清单组件() {
//     // 从信箱获取当前清单
//     const 清单 = useSelector(state => state.清单)
    
//     // 获取投递员（dispatch）
//     const 投递员 = useDispatch()
    
//     const 添加商品 = (商品名) => {
//       // 写信并让投递员送出去
//       投递员({
//         type: 'ADD_ITEM',
//         item: 商品名
//       })
//     }
    
//     return (
//       <div>
//         <h3>购物清单：</h3>
//         <ul>
//           {清单.map(item => <li>{item}</li>)}
//         </ul>
//         <button onClick={() => 添加商品('牛奶')}>
//           添加牛奶
//         </button>
//       </div>
//     )
//   }