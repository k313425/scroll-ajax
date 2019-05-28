<?php
header('Content-type:text/html');

$date=[
	"code"=>200,
	"msg"=>"成功",
	"imgPhoto"=>["img/tmp/photo06.jpg","img/tmp/photo06.jpg","img/tmp/photo06.jpg","img/tmp/photo06.jpg","img/tmp/photo06.jpg","img/tmp/photo06.jpg","img/tmp/photo06.jpg","img/tmp/photo06.jpg","img/tmp/photo06.jpg","img/tmp/photo06.jpg"],
	"data"=>[
		[
    		"albumUrl"=>"album-detail.html", // 相册链接
    		"id"=>"1",
    		"renz"=>true,
    		"anli"=>"4", // 设计案例
    		"zixun"=>"46", // 咨询人数
    		"name"=>"慧华影楼装修",
    		"logoUrl"=>"img/tmp/logo.jpg", // 商家logo
    		"imgUrl"=>["img/tmp/photo02.jpg","img/tmp/photo03.jpg","img/tmp/photo04.jpg"],
    		"photoUrl"=>"img/tmp/photo05.jpg", // 相册封面
    		"photoName"=>"慧华影楼22", // 相册名字
    		"num"=>"6", // 相册张数
    	],
    	[
			"albumUrl"=>"album-detail.html",
			"id"=>"2",
			"renz"=>true,
			"anli"=>"44",
			"zixun"=>"426",
			"name"=>"慧华影楼装修1",
			"logoUrl"=>"img/tmp/logo.jpg",
			"imgUrl"=>["img/tmp/photo02.jpg","img/tmp/photo03.jpg","img/tmp/photo04.jpg"],
			"photoUrl"=>"img/tmp/photo05.jpg",
			"photoName"=>"慧华影楼22",
			"num"=>"6",
		],
		[
			"albumUrl"=>"album-detail.html",
			"id"=>"2",
			"renz"=>false,
			"anli"=>"4",
			"zixun"=>"46",
			"name"=>"慧华影楼装修2",
			"logoUrl"=>"img/tmp/logo.jpg",
			"imgUrl"=>["img/tmp/photo02.jpg","img/tmp/photo03.jpg","img/tmp/photo04.jpg"],
			"photoUrl"=>"img/tmp/photo05.jpg",
			"photoName"=>"慧华影楼22",
			"num"=>"6",
		],
		[
			"albumUrl"=>"album-detail.html",
			"id"=>"2",
			"renz"=>false,
			"anli"=>"4",
			"zixun"=>"46",
			"name"=>"慧华影楼装修2",
			"logoUrl"=>"img/tmp/logo.jpg",
			"imgUrl"=>["img/tmp/photo02.jpg","img/tmp/photo03.jpg","img/tmp/photo04.jpg"],
			"photoUrl"=>"img/tmp/photo05.jpg",
			"photoName"=>"慧华影楼22",
			"num"=>"6",
		]
	]
];

echo json_encode($date,true);
