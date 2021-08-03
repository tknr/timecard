<?php
$json = file_get_contents("php://input");
$contents = json_decode($json, true);

header("Access-Control-Allow-Origin: *");header("Access-Control-Allow-Origin: *");
echo json_encode('ok');
?>
