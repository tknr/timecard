<?php
$json = file_get_contents("php://input");
$contents = json_decode($json, true);

$record = [$contents['date'],$contents['lat'],$contents['lon']];
$file_path = __DIR__.'../../../data/timecard_'.date('Ym').'.tsv';
$handle = fopen($file_path, "ab");
fputcsv($handle, $record, "\t");
fclose($handle);

$res = ['ok'];
header("Access-Control-Allow-Origin: *");
echo json_encode($res);
?>
