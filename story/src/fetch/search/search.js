import { get } from '../get'

export function getSearchResult(title) {
	
    const result = get('/api/story.php?title='+title)
   
    return result
}
