<?php 
	//$arrurl = 'http://www.baidu.com/link?url=S1mBay0qmv0JU7Hf8XrGie4ZkpcpBAHDke9b4MiT8P5LMkHJiUKJbcUgzJbuJwtw';
	$storyIndex = file_get_contents($_GET["url"]));
	
	//获取百度加密前的网址
	$href;
	$arr1 = array();

    stream_context_set_default(array('http' => array('method' => 'HEAD')));
    $headers = get_headers(trim($arrurl), 1);
    $href = $headers['Location'];
	
	$content = phpQuery::newDocumentHTML($storyIndex);
	
	$type = pq("meta[http-equiv=Content-Type]")->attr("content");
	$mode = 0;
	if(strpos($type, "8")){
		$mode = 1;
	}
	//获取标题
	$title = mb_convert_encoding(pq("body h1")->html(),"UTF-8","GBK"); 
	//章节链接重复处理措施
	$arrz =  array();
	$i = 0;
	
	if(strlen(pq("dt:eq(1)")->html())>1){
		$dd = pq("dt:eq(1)")->nextAll("dd");
	}else{
		$dd = pq("dt")->nextAll("dd");
	}
	
	foreach ($dd["a"] as $key => $value) {
		$num1 = stripos($value->getAttribute("href"), "www");
		//判断是否存在www，存在的话找出重复的部分替换掉
		$num2 = stripos($href,"www");
		$href1 = substr($href, $num2);
		//找出www之后的"/"位置
		$num3 = stripos($href1, "/");
		$href2 = substr($href1, $num3);
		$subNum = strpos($href,"/");
		$chapterUrl = $value->getAttribute("href");
		//将url重复部分替换掉
		$chapterUrl1 = str_replace($href2, "", $chapterUrl);
		if($num1>0){//链接是否含有www,含有$num将会大于0
			//将链接保存到数组中
			$arrz[$i]["href"] = $chapterUrl;
			$arrz[$i]["text"] = $value->nodeValue;
		}else{
			$arrz[$i]["href"] = $href.$chapterUrl1;
			$arrz[$i]["text"] = $value->nodeValue;
		}
		$i++;
	}
	
	echo json_encode($arrz);
?>