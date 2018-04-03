import { post } from '../post';

export function getDetail(data) {
	
    const result = post('/api/detail.php',{
    	url:data.url,
    	host:data.host
    })

    return result
}
