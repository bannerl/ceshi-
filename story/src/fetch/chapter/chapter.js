import { get } from '../get'

export function getChapter(url,code) {
    const result = get('/api/chapter.php?url='+url+'&code='+code)
    return result
}
