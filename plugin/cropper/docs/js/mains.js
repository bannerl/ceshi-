var $image = $('#image');

  var options = {
        aspectRatio: 9 / 9,
        preview: '.img-preview',
        crop: function (e) {
          
        }
      };
var defaultData;
var boo = true;
	$image.on({
    ready: function (e) {
    	
      //console.log(e.type);
    },
    cropstart: function (e) {
    	

    	$image.cropper('setCropBoxData',defaultData);
    },
    cropmove: function (e) {

    	$image.cropper('setCropBoxData',defaultData);
    },
    cropend: function (e) {

    	$image.cropper('setCropBoxData',defaultData);
    },
    crop: function (e) {
      if(boo){
    		defaultData = $image.cropper("getCropBoxData")
    		boo =false
    	}
    },
    zoom: function (e) {
      
    	//$image.cropper('setCropBoxData',defaultData);
    }
  }).cropper(options);
  
  function doa(){
  	
  	var result = $image.cropper("getCroppedCanvas", { width: 160, height: 90 })
  	var src = result.toDataURL('jpeg/image');
  	$('#preview').attr('src',src);
  }

$('.btn').click(function(){
	doa();
	
});

var left,
	stop,
	diffL,
	diffT,
	data,
	imageWidth = $(document).width()*0.8,
	currentWidth,
	currentHeight;
	//初始化
	
setTimeout(function(){
	console.log(defaultData)
	var style = "transform:translate3d("+defaultData.left+'px,'
	+defaultData.top+'px,0);width:'+defaultData.width+'px;'
	+'height:'+defaultData.height+'px;border:2px solid #fff;box-sizing:border-box;';
	$('.cropper-container').append('<div style="'+style+'"></div>');
	
	$image.cropper('setCanvasData',
	{
		width:defaultData.width,
		left:defaultData.left,
		top: defaultData.top
	});
	
},1000);
$('.img-container').bind('touchstart',function(e){
	
	data = $image.cropper('getCanvasData');
	data1 = $image.cropper('getImageData');
	currentWidth = data1.width;
	currentHeight = data1.height;
	//获取当前窗口的80%,然后判断是否小于80%,小于的话重置尺寸
	left = e.touches[0].pageX;
	stop = e.touches[0].pageY;
});

$('.img-container').bind('touchmove',function(e){
	var _left = e.touches[0].pageX;
	var _top = e.touches[0].pageY;
	diffL = _left - left+data.left;
	diffT = _top - stop+data.top;
	
	$image.cropper("setCanvasData", {top:diffT,left:diffL})
});

$('.img-container').bind('touchend',function(e){
	
	var a;
	if(currentWidth === imageWidth) {
		//初始位置
		diffT = defaultData.top
		diffL = defaultData.left
	}else if(currentWidth>imageWidth){
		// 放大后的位置
		
		//左移还是右移
		if(diffL<0){
			//左移
			
			if(currentWidth-(-diffL+defaultData.left)>defaultData.width) {	
				//左移没有移出边界	
			}else{
				diffL = -(currentWidth - (defaultData.left+defaultData.width));
				console.log(diffL)
			}
		} else {
			//右移
			if(diffL>defaultData.left){
				diffL = defaultData.left
			}
		}
		
		//判断y方向
		if(diffT<0){
			//上移
			
			if(currentHeight - (-diffT+defaultData.height)>defaultData.top) {	
			//上移移没有移出边界	
			}else{
				diffT = -(currentHeight - (defaultData.top+defaultData.height))
				console.log(diffL)
			}
		} else {
			//下移
			if(diffT<defaultData.top) {	
			//下移移没有移出边界	
			}else{
				diffT = defaultData.top
				console.log(diffL)
			}
		}
	}else{
		//缩小后的位置
		if(diffT<0){
			diffT = defaultData.left
		}
		
		if(diffL<0){
			diffL = defaultData.top
		}
		a = imageWidth;
		$image.cropper("setCanvasData", {width:a});
		
	}
	
	$image.cropper("setCanvasData", {top:diffT,left:diffL});
	
    	$image.cropper('setCropBoxData',defaultData);
    	
    	var data2 = $image.cropper('getImageData');
	if(data2.width<imageWidth){
	$image.cropper("setCanvasData", 
		{
			width:defaultData.width,
			left:defaultData.left,
			top: defaultData.top
		})
		
	}
});

setInterval(function(){
	var data2 = $image.cropper('getImageData');
	if(data2.width<imageWidth){
	$image.cropper("setCanvasData", 
	{
		width:defaultData.width,
		left:defaultData.left,
		top: defaultData.top
	})
		
	}
},500)



function Init() {
	
}

Init.proptotype = {
	constructor:Init,
	resetDefault: function() {
		
	},
	
}

