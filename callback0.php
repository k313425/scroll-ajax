<?php
header('Content-type:text/html');

$date=[
	"code"=>"200",
	"msg"=>"成功",
	"imgPhoto"=>["img/tmp/photo06.jpg","img/tmp/photo06.jpg","img/tmp/photo06.jpg","img/tmp/photo06.jpg","img/tmp/photo06.jpg","img/tmp/photo06.jpg","img/tmp/photo06.jpg","img/tmp/photo06.jpg","img/tmp/photo06.jpg","img/tmp/photo06.jpg"],
	"data"=>[]
];

echo json_encode($date,true);
