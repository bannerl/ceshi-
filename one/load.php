<?php 

	header("Content-Type:text/html;charset=utf-8;");
   	require("phpQuery/phpQuery.php");
   	if($_SERVER["REQUEST_METHOD"] == "GET") {
   		if(empty($_GET["url"])){
   			echo "出错了";
   		}else{
			$url = $_GET["url"];
			$code = $_GET["code"];
			$fileContent = file_get_contents($url);
			$doc = phpQuery::newDocumentHTML($fileContent);
			if($code == "0"||$code == 'undefined'){
				$title = mb_convert_encoding(pq("body h1")->html(),"UTF-8","GBK"); 
   				$content = mb_convert_encoding(pq("#content")->html(),"UTF-8","GBK");
			}else{
				$title = pq("body h1")->html(); 
   				$content = pq("#content")->html();
			}
   			$content = str_ireplace("<br>&#160;", "", $content);
   			$content = str_ireplace("<br/>", "", $content);
   			$num1 = stripos($content, "http");
			$num2 = stripos($content, "html");
			if($num1-$num2<50){
				$content = substr_replace($content, "", $num1,($num2-$num1));
			}
			$pattern = array("/http/","/\/\//","/网址/","/www/","/biquge/","/biqugex/","/html/","/.com/","/book/","/手机版阅读/","/笔趣阁/","/本站地址/","/天才一秒记住/");
			$replacement = array("");
			$content = preg_replace($pattern, $replacement, $content);
 			echo $content;
   		}	
	}	
	
?>