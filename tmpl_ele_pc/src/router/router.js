import App from '../App'
const index = r => require.ensure([], () => r(require('../page/index/index')), 'index')
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
const user = r => require.ensure([], () => r(require('../page/user/user')), 'user')

export default [
    { path: '/',
      component: App,
      children: [
        { 
          path: '/',
          component:index,
          name:'index'
        },
        { 
          path: '/index',
          component:index,
          name:'index'
        },
        {	
           path: '/order',
           component:order,
           name:'order'
        },
        {   
           path: '/user',
           component:user,
           name:'user'
        }]
    }     
        
]