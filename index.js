// 关卡设置
window.onload = function(){
$("#qidong_page").remove();	
var setting = {
	1 : [200,80,4],//值一表示最大值（最大不超过255），值二表示最大值（最小不超过0），值三为方块个数
	2 : [200,90,4],
	3 : [200,100,4],
	4 : [200,110,9],
	5 : [200,120,9],
	6 : [200,130,9],
	7 : [200,140,9],
	8 : [200,150,9],
	9 : [200,160,9],
	10 : [200,150,16],
	11 : [200,155,16],
	12 : [200,160,16],
	13 : [200,165,16],
	14 : [200,170,16],
	15 : [200,171,16],
	16 : [200,173,16],
	17 : [200,175,16],
	18 : [200,177,16],
	19 : [200,181,16],
	20 : [200,183,16],
	21 : [200,185,16],
	22 : [200,187,16],
	23 : [200,188,16],
	24 : [200,176,25],
	25 : [200,178,25],
	26 : [200,180,25],
	27 : [200,182,25],
	28 : [200,184,25],
	29 : [200,186,25],
	30 : [200,188,25],
	31 : [200,188,36],
	32 : [200,189,36],
	33 : [200,190,36],
	34 : [200,192,36],
	35 : [200,194,36],
	36 : [200,196,36],
	37 : [200,197,36],
	38 : [200,198,36],
	39 : [200,199,36],
	40 : [200,200,36],

}
var audio = document.getElementById("music-audio");//主音乐
var game = {
	setNum : 1,//当前关卡数
	time : 60,//倒计时游戏时间
	isover : true,//游戏是否结束
	errTime : 3, //点错时减去的时间
	init : function(){ //初始化
		// 错误提示音
		var error_music = document.getElementById("error_music");
		// 游戏开始函数调用
		this.gameStart();
		// 第一次游戏界面渲染
		this.randomColor(setting[1]);
		// 点击事件
		$("#color_box").delegate("div","touchend",function(){
			// 判断点击的是否是特殊dom
			if(game.isover && $(this).hasClass("js_active")){
				game.setNum++;
				if(setting[game.setNum] == undefined){
					alert("恭喜您，通关啦");
					return ;
				}
				$("#header").html(game.setNum);
				// 渲染下一关
				game.randomColor(setting[game.setNum]);
			}else{
				// 减去秒数
				game.time -= game.errTime;
				error_music.play();
				if( game.time > 0 ){
					$("#time span").html(game.time);
				}else{
					$("#time span").html("0");
				}
			}
		})

	},
	//游戏开始界面方法
	gameStart : function(){
		$("#game_start").on("touchend",function(){
    		audio.play();
			$("#game_start").slideUp(500,function(){
				//游戏结束时有一个回掉的方法
				game.addTime(function(){
					//游戏结束执行
					game.gameEnd();
				});

			});
		})
	},
	//游戏结束界面方法
	gameEnd : function(){
		$("#game_end").slideDown(500);
		$("title").html("我已闯过"+(game.setNum-1)+"关，你敢挑战我吗");
		//再次游戏
		$("#game_play").on("touchend",function(){
			$("#game_end").slideUp(0);
			game.setNum = 1;
			game.time = 60;
			game.isover = true;
			game.randomColor(setting[1]);
			$("#time span").html("60");
			$("#header").html(game.setNum);
			game.addTime(function(){
				//游戏结束执行
				$("#game_end").slideDown(500);
			});
		})
		//分享提示
		$("#game_share").on("touchend",function(){
			$("#game_end").slideUp(200,function(){
				$("#game_share_img").slideDown(200);
			});
		})
		//关闭分享提示
		$("#game_share_img").on("touchend",function(){
			$("#game_share_img").slideUp(200,function(){
				$("#game_end").slideDown(200);
			});
		})
	},
	// 随机颜色函数
	randomColor : function(set){
		var random1 = Math.floor(Math.random()*255);
		var random2 = Math.floor(Math.random()*255);
		var commonColor = "rgb("+set[0]+", "+random1+", "+random2+")";
		var specialColor = "rgb("+set[1]+", "+random1+", "+random2+")";
		this.addDom(commonColor,specialColor,set[2])
	},
	// 动态添加dom
	addDom : function(common,special,row){
		var sqrt_row = Math.sqrt(row);
		var colorDom = "";
		var randomNumDom = Math.floor(Math.random()*row);
		for(var i = 0; i < row; i++){
			colorDom += "<div></div>";
		}
		//设置页面样式
		$("#color_box").html(colorDom);
		$("#color_box div").css({
			"background-color" : common,
			"width"      : parseInt($("#color_box").css("width"))/sqrt_row-1,
			"height"     : parseInt($("#color_box").css("width"))/sqrt_row-1
		})
		$("#color_box div").eq(randomNumDom).css({
			"background-color" : special,
		}).addClass("js_active")
	},
	// 倒计时游戏时间
	addTime : function(callback){
		var timer = setInterval(function(){
			game.time--;
			if(game.time <= 0){
				clearInterval(timer);
				game.isover = false;
				//结束时调用的方法
				if(typeof(callback) == "function"){
					callback();
				}
				$("#time span").html("0");
				$("#game_end_num").html("闯过<em class='guan_num'>"+(game.setNum-1)+"</em>关");
			}
			if(game.time <= 5){
				$(".time_icon").addClass("time_animate");
			}
			if(game.time <= 0){
				$(".time_icon").removeClass("time_animate");
			}
			$("#time span").html(game.time);
		},1000)
	}
}
// 游戏初始化
game.init();
music();
// 控制是否播放音乐
function music(){
	$("#music").on("touchend",function(){
		if($(this).hasClass("stopped")){
			$(this).removeClass("stopped")
			audio.play();
		}else{
			$(this).addClass("stopped");
			audio.pause()
		}
	})
}
}