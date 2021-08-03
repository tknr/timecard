function setLocation(pos){

	// 緯度・経度を取得
	lat = pos.coords.latitude;
	lon = pos.coords.longitude;
	d = getNowYMDhmsStr();

	console.log('lat:'+lat);
	console.log('lon:'+lon);
	console.log('d:'+d);

	document.getElementById("lat").innerHTML = lat;
	document.getElementById("lon").innerHTML = lon;
	document.getElementById("date").innerHTML = d;

	var json_asocc = {
		'date':d,
		'lat':lat,
		'lon':lon
	};
	var json_text = JSON.stringify(json_asocc);
	console.log('json_text:'+json_text);

	//データを送信
	xhr = new XMLHttpRequest;       //インスタンス作成
	xhr.onload = function(){        //レスポンスを受け取った時の処理（非同期）
		var res = xhr.responseText;
		if (res.length>0){
			console.log(res);
			document.getElementById("result").innerHTML = res;
		}
	};
	xhr.onerror = function(){       //エラーが起きた時の処理（非同期）
		alert("error!");
	}
	xhr.open('post', "api/", true);    //(1)
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(json_text);  
}

// エラー時に呼び出される関数
function showErr(err){
	switch(err.code){
		case 1 : alert("位置情報の利用が許可されていません"); break;
		case 2 : alert("デバイスの位置が判定できません"); break;
		case 3 : alert("タイムアウトしました"); break;
		default : alert(err.message);
	}
}

function postApi() {
	// geolocation に対応しているか否かを確認
	if("geolocation" in navigator){
		var opt = {
			"enableHighAccuracy": true,
			"timeout": 10000,
			"maximumAge": 0,
		};
		navigator.geolocation.getCurrentPosition(setLocation, showErr, opt);
	}else{
		alert("ブラウザが位置情報取得に対応していません");
	}
}

/*
window.onload=function(){
	postApi();
}
*/

function getNowYMDhmsStr(){
	const date = new Date();
	const Y = date.getFullYear();
	const M = ("00" + (date.getMonth()+1)).slice(-2);
	const D = ("00" + date.getDate()).slice(-2);
	const h = ("00" + date.getHours()).slice(-2);
	const m = ("00" + date.getMinutes()).slice(-2);
	const s = ("00" + date.getSeconds()).slice(-2);

	return Y +'/'+ M +'/'+ D +' ' +h +':'+ m +':'+ s;
}
