(function(window,$){		
	var $image = $('#image'),
		left, //手指滑动距离左侧的距离
		stop,   //手指滑动距离右侧的距离
		diffL,  //手指滑动左右间的差值
		diffT,  //手指滑动上下间的差值
		data,   //获取画布初始位置
		data1,  //获取图片初始尺寸
		currentWidth, //图片当前的尺寸
		currentHeight, //图片当前的尺寸
		defaultData, //裁剪框默认尺寸
		boo = true; //初始化界定
	
	var options = {
		aspectRatio: 9 / 9,
		preview: '.img-preview',
		crop: function(e) {
	
		}
	};
	
	$image.on({
		ready: function(e) {
		},
		cropstart: function(e) {
		},
		cropmove: function(e) {
		},
		cropend: function(e) {
			$image.cropper('setCropBoxData', defaultData);
		},
		crop: function(e) {
			if(boo) {
				defaultData = $image.cropper("getCropBoxData");
				boo = false;
				//自定义初始化
				var style = "transform:translate3d(" + defaultData.left + 'px,' +
					defaultData.top + 'px,0);width:' + defaultData.width + 'px;' +
					'height:' + defaultData.height + 'px;border:2px solid #fff;box-sizing:border-box;';
				$('.cropper-container').append('<div style="' + style + '"></div>');
			
				$image.cropper('setCanvasData', {
					width: defaultData.width,
					left: defaultData.left,
					top: defaultData.top
				});
			}
		}
	}).cropper(options);
	
	$('.img-container').bind('touchstart', function(e) {
		data = $image.cropper('getCanvasData');
		data1 = $image.cropper('getImageData');
		currentWidth = data1.width;
		currentHeight = data1.height;
		left = e.touches[0].pageX;
		stop = e.touches[0].pageY;
	});
	
	$('.img-container').bind('touchmove', function(e) {
		var _left = e.touches[0].pageX;
		var _top = e.touches[0].pageY;
		diffL = _left - left + data.left;
		diffT = _top - stop + data.top;
		//如果有两个手指的时候不执行移动操作
		if(e.touches.length > 1) {
			return;
		}
		
		$image.cropper("setCanvasData", {
			top: diffT,
			left: diffL
		})
	});
	
	$('.img-container').bind('touchend', function(e) {
		data1 = $image.cropper('getImageData');
		currentWidth = data1.width;
		currentHeight = data1.height;
		if(currentWidth === defaultData.width) {
			//初始位置
			diffL = defaultData.left
			//上移
			//判断y方向
			if(diffT < 0) {
				//上移
				if(currentHeight - (-diffT + defaultData.height) > defaultData.top) {
					//上移移没有移出边界	
				} else {
					diffT = -(currentHeight - (defaultData.top + defaultData.height))
					console.log(diffL)
				}
			} else {
				//下移
				if(diffT < defaultData.top) {
					//下移移没有移出边界	
				} else {
					diffT = defaultData.top
					console.log(diffL)
				}
			}
		} else if(currentWidth > defaultData.width) {
			// 放大后的位置
	
			//左移还是右移
			if(diffL < 0) {
				//左移
				if(currentWidth - (-diffL + defaultData.left) > defaultData.width) {
					//左移没有移出边界	
				} else {
					diffL = -(currentWidth - (defaultData.left + defaultData.width));
					console.log(diffL)
				}
			} else {
				//右移
				if(diffL > defaultData.left) {
					diffL = defaultData.left
				}
			}
	
			//判断y方向
			if(diffT < 0) {
				//上移
	
				if(currentHeight - (-diffT + defaultData.height) > defaultData.top) {
					//上移移没有移出边界	
				} else {
					diffT = -(currentHeight - (defaultData.top + defaultData.height))
					console.log(diffL)
				}
			} else {
				//下移
				if(diffT < defaultData.top) {
					//下移移没有移出边界	
				} else {
					diffT = defaultData.top
					console.log(diffL)
				}
			}
		} else {
			//缩小后的位置
			if(diffT < 0) {
				diffT = defaultData.left
			}
	
			if(diffL < 0) {
				diffL = defaultData.top
			}
			$image.cropper("setCanvasData", {
				width: defaultData.width
			});
	
		}
	
		$image.cropper("setCanvasData", {
			top: diffT,
			left: diffL
		});
	
		$image.cropper('setCropBoxData', defaultData);
		//重新获取图片放大缩小后的值
		var data2 = $image.cropper('getImageData');
		if(data2.width < defaultData.width) {
			$image.cropper("setCanvasData", {
				width: defaultData.width,
				left: defaultData.left,
				top: defaultData.top
			})
		}
	});
	
	//上传图片预览
	
	//生成base64字符串
	$('.btns').click(function() {
		var result = $image.cropper("getCroppedCanvas", {
			width: 160,
			height: 90
		})
		var src = result.toDataURL('jpeg/image');
		$('#preview').attr('src', src);
	});
})(window,jQuery)
