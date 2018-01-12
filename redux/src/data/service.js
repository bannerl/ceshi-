import 'whatwg-fetch'
import 'es6-promise'

export function getUserInfo () {
	fetch('/api/1').then(res=>{
		res.text()
	}).then(text=>{
		console.log('11111')
	})
}
