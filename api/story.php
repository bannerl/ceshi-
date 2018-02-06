<?php
	header("Access-Control-Allow-Origin: *;");
	//引入phpQuery
	require("phpQuery/phpQuery.php");
	
	//筛选网址
	$filterUrlArr = ['xxbiquge.com','biqugex.com'];
	//搜索参数设置
	$search = "http://www.baidu.com/s?q=&ct=2097152&rn=1&cl=3&wd=";
	
	//是否传入小说名称	
	if($_SERVER["REQUEST_METHOD"] == "GET"){
		if(empty($_GET["title"])){
			echo '没有输入小说名称';
			exit;
		}
	}
	
	$contentArr = [];
	$i = 0;
	foreach ($filterUrlArr as $key => $value) {
		$url = $search.$_GET["title"]."&si=".$value;
		$fileContent = file_get_contents($url);
		$doc = phpQuery::newDocumentHTML($fileContent);
		
		//判断是否有搜索结果
		$noData = pq('.content_none')->html();
		if(!strlen($noData)){
			foreach(pq(".f13 a") as $key1=>$value1){
				//获取当前链接
				$baiduUrl = $value1->getAttribute("href");
				
				//描述
				$desc = $_GET["title"]."最新章节由网友提供";
				
				//判断链接中是否存在"/link"
				$num = strpos($baiduUrl,"/link");
				if($num>0){
					$resultUrl = $baiduUrl;
					$contentArr[$i]['url'] = $resultUrl;
					$contentArr[$i]['host'] = $value;
					$contentArr[$i]['desc'] = $desc;
					$contentArr[$i]['title'] = $desc;
					$i++;
				}
			}
		}
	}
	$data = json_encode($contentArr);
	echo $data;
?>