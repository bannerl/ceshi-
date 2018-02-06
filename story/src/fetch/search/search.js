import { get } from '../get'

export function getSearchResult(title) {
	
    const result = get('/api/story.php?title='+title)
    console.log(result)
    return result
}
