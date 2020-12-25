<?php
$config = require_once('./config.php');
$token = $config['GH_ACCESS_TOKEN'];
$page = $_GET['page'];
header("Content-Type: application/json");
$c = curl_init();
curl_setopt($c, CURLOPT_HTTPHEADER, ["Content-Type: application/json", "Authorization: token $token"]);
curl_setopt($c, CURLOPT_URL, "https://api.github.com/user/repos?per_page=100&page=$page");
curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($c, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
$out = curl_exec($c);
curl_close($c);
echo $out;
