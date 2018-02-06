<?php
	header("Access-Control-Allow-Origin: *;");
	require("phpQuery/phpQuery.php");
	
	$filterUrlArr = ['xxbiquge.com','biqugex.com'];
	
	function receiveUrl($arr) {
		$arrurl = $arr[$_GET["number"]];
		$saddress = file_get_contents($arrurl);
		//获取百度加密前的网址
		$href;
		$arr1 = array();
		$arr1[0] = $arrurl;
		foreach ($arr1 as $url) {
		    stream_context_set_default(array('http' => array('method' => 'HEAD')));
		    $headers = get_headers(trim($url), 1);
		    $href = $headers['Location'];
		}
		
		$scontent = phpQuery::newDocumentHTML($saddress);
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
		//打印目录
		$j = 0;
		echo "<div id=\"mode\">".$mode."</div>";
		echo '<p>直达底部</p><div class="group">';
		foreach ($arrz as $key => $value) {
			echo "<dd><span index=".($mode)." name='".$value["href"]."' onclick=\"addcontent('".$value["href"]."','".$value["text"]."','".($j+1)."')\" >".$value["text"]."</span></dd>";
			$j++;
		}
		echo '</div>';
		
	}
	receiveUrl($arr);
?>