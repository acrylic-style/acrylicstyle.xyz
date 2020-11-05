<?php
$config = require_once('./config.php');
$token = $config['GH_ACCESS_TOKEN'];
$page = $_GET['page'];
header("Content-Type: application/json");
echo(file_get_contents("https://api.github.com/user/repos?per_page=100&page=$page&access_token=$token"));
