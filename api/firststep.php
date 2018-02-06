<?php 

	header("Content-Type:text/html;charset=utf-8;");
	//引入phpQuery
	require("phpQuery/phpQuery.php");
	echo "<pre>";
	//筛选网址
	$filterUrlArr = ['xxbiquge.com','biqugex.com'];
	//搜索参数设置
	$search = "http://www.baidu.com/s?q=&ct=2097152&rn=1&cl=3&wd=";
	
	//是否传入小说名称	
//	if($_SERVER["REQUEST_METHOD"] == "GET"){
//		if(empty($_GET["title"])){
//			echo '没有输入小说名称';
//			//exit;
//		}
//	}
//	
//	//$url = "http://www.baidu.com/s?wd=尊上";
//	$kd="尊上";
//	$contentArr = [];
//	$i = 0;
//	foreach ($filterUrlArr as $key => $value) {
//		$url = $search.$kd."&si=".$value;
//		$fileContent = file_get_contents($url);
//		$doc = phpQuery::newDocumentHTML($fileContent);
//		
//		//判断是否有搜索结果
//		$noData = pq('.content_none')->html();
//		if(!strlen($noData)){
//			$resultUrl = '';
//			foreach(pq(".f13 a") as $key1=>$value1){
//				//获取当前链接
//				$baiduUrl = $value1->getAttribute("href");
//				//描述
//				$desc = $kd."最新章节由网友提供";
//				
//				//判断链接中是否存在"/link"
//				$num = strpos($baiduUrl,"/link");
//				if($num>0){
//					$resultUrl = $baiduUrl;
//					$contentArr[$i]['url'] = $resultUrl;
//					$contentArr[$i]['host'] = $value;
//					$contentArr[$i]['desc'] = $desc;
//					$i++;
//				}
//			}
//		}
//	}
	
?>
<?php 
					function receiveUrl() {
						$arrurl = 'http://www.baidu.com/link?url=S1mBay0qmv0JU7Hf8XrGie4ZkpcpBAHDke9b4MiT8P5LMkHJiUKJbcUgzJbuJwtw';
						$storyIndex = file_get_contents($arrurl);
						
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
						//打印目录
						//$j = 0;
						
						echo json_encode($arrz);
//						echo "<div id=\"mode\">".$mode."</div>";
//						echo '<p>直达底部</p><div class="group">';
//						foreach ($arrz as $key => $value) {
//							echo "<dd><span index=".($mode)." name='".$value["href"]."' onclick=\"addcontent('".$value["href"]."','".$value["text"]."','".($j+1)."')\" >".$value["text"]."</span></dd>";
//							$j++;
//						}
//						echo '</div>';
						
					}
			   		receiveUrl();
				?>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="style/public.css" />
		<link href="//at.alicdn.com/t/font_ah1h288zi42njyvi.css" />
		<link rel="stylesheet" type="text/css" href="style/main.css"/>
	</head>
	<body>
		<div id="contianer">
			<div id="box">
				
				<script>
				setTimeout(function(){
					addcontent($("dd span").eq(0).attr("name"),$("dd span").eq(0).text());
				},240)
				</script>
			</div>
			<div class="top">
				<i class="icon iconfont">&#xe623;</i>
				<a class="top-return" href="http://localhost/xampp/story-6/one/story.html">返回书架</a>
			</div>
			<div id="content">
				<div class="c-main">
					<h3></h3>
					<div class="content">
					</div>
					<div class="jump">
						<span class="prev"></span>
						<span class="next"></span>
					</div>
				</div>
			</div>
			<ul class="bottom">
				<li class="directory"><i class="icon iconfont">&#xe646;</i><span>目录</span></li>
				<li class="fontsize"><i class="icon iconfont">&#xe617;</i><span>字体</span></li>
				<li class="nightmode"><i class="icon iconfont">&#xe614;</i><span>夜间</span></li>
			</ul>
			<div class="control-font">
				<div class="c-fontsize">
					<span>A+</span>
					<span>A-</span>
				</div>
				<ul class="c-color">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</div>	
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
		<script>
			function addcontent(urls,title,index){
				//url地址效验
				if(urls === "undefined"){
					$(".content").html("错误的地址");
					return ;
				}
				//上一章下一章html片段
				if(index>1){
					var p_href = $("dd span").eq(index-1).attr("name");
					var n_href = $("dd span").eq(index+1).attr("name");
					var html = "<span index="+(index-1)+" name="+p_href+" onclick=\"addcontent('"+p_href+"','"+$("dd span").eq(index-2).html()+"',"+(index-1)+")\">上一章</span>";
					html = html + "<span index="+(index-0+1)+" name="+n_href+" onclick=\"addcontent('"+n_href+"','"+$("dd span").eq(index).html()+"',"+(index-0+1)+")\">下一章</span>"
				}
				$(".jump").html(html);
				//判断编码格式
				var code = $("#mode").html();
				var xhr = new XMLHttpRequest();
				xhr.open("GET","load.php?url="+urls+"&code="+code);
				xhr.send();
				//隐藏top和bottom选项
				$(".top").animate({
					"top":"-100px"
				},500);
				$(".bottom").animate({
					"bottom":"-100px"
				},500);
				xhr.onreadystatechange = function() {
					if (xhr.readyState===4) {
						if (xhr.status===200) { 
							$(".content").html(xhr.responseText) ;
							$("#content h3").html(title);
						} else {
							alert("发生错误：" + xhr.status);
						}
					} 
				}
				$("#content").scrollTop("0");
				if($("#box").css("left") === "0px") {
					$("#box").animate({
						"left":"11140px"
					},300)
				}
			};
			
		
			$(function(){
				//目录
				$(".directory").click(function(){
					$("#box").animate({"left":"0"},200);
				});
				
				//字体
				$("li.fontsize").click(function(){
					$(".control-font").animate({
							"bottom":"0px"
						},1);
				});
				$(".c-fontsize span").eq(0).click(function(){
					if($("#content").css("fontSize") === "22px"){
						return false;
					}else{
						size1 = $("#content").css("fontSize").slice(0,-2)-0+1; 
						$("#content").css("fontSize",size1+"px");
					}
				});
				$(".c-fontsize span").eq(1).click(function(){
					if($("#content").css("fontSize") === "18px"){
						return false;
					}else{
						size2 = $("#content").css("fontSize").slice(0,-2)-0-1; 
						$("#content").css("fontSize",size2+"px");
					}
				});
				//颜色设置
				var i = 0;
				var color = $(".c-color li");
				for(;i<color.length;i++){
					color.eq(i).click(function(){
						var nowcolor = $(this).css("background");
						$("#content").css("background",nowcolor);
						var j = $(this).index();
						if(j === 4){
							$(".c-main").css("color","#999");
						}else if(j === 5) {
							$(".c-main").css("color","#000");
						}else if(j === 3){
							$(".c-main").css("color","#f5f5f5");
						}
					});
				}
				//夜间模式
				$(".nightmode").click(function(){
					$("#content").css({"background":"#111","color":"#555"});
				});
				//关闭返回和设置
				$("#content").click(function(){
					if($(".top").css("top") === "-100px"){
						$(".top").animate({
							"top":"0px"
						},500);
						$(".bottom").animate({
							"bottom":"0px"
						},500);
					}else{
						$(".top").animate({
							"top":"-100px"
						},500);
						$(".bottom").animate({
							"bottom":"-100px"
						},500);
						$(".control-font").animate({
							"bottom":"-150px"
						},500);
					}
					
				});
				//直达底部
				$("#box p").click(function(){
					$("#box div").scrollTop("120000000");
				});
			});
		</script>
	</body>
</html>