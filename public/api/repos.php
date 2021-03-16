<?php
$config = require_once('./config.php');
$size = filesize('./data.json');
if ($size === 0) {
  $contents = '{}';
} else {
  $contents = file_get_contents('./data.json');
}
$data = json_decode($contents);
$token = $config['GH_ACCESS_TOKEN'];
$page = $_GET['page'] ?: 1;
header("Content-Type: application/json");
if (!empty($data->{$page}) && !empty($data->{$page}->{'data'}) && $data->{$page}->{'expiresAt'} > time()) {
  echo $exp;
  echo $data->{$page}->{'data'};
  return;
}
$c = curl_init();
curl_setopt($c, CURLOPT_HTTPHEADER, ["Content-Type: application/json", "Authorization: token $token"]);
curl_setopt($c, CURLOPT_URL, "https://api.github.com/user/repos?per_page=100&page=$page");
curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($c, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
$out = curl_exec($c);
curl_close($c);
$pd = [
  'data' => $out,
  'expiresAt' => time() + 1800, // 30 minutes
];
$data->{$page} = $pd;
file_put_contents('./data.json', json_encode($data));
echo $out;
