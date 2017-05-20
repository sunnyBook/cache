<?php
$js = '';
$js = $js . 'window.APP={}; (function (APP) {';
$js = $js . file_get_contents('../../source/controller/mainCon.js');
$js = $js . file_get_contents('../../source/controller/secondCon.js');
$js = $js . file_get_contents('../../source/model/modelArticle.js');
$js = $js . file_get_contents('../../source/model/base.js');
$js = $js . file_get_contents('../../source/view/viewArticle.js');
$js = $js . '}(APP));';
$output['js'] = $js;

$css = '';
$css = $css . file_get_contents('../../css/index.css');
$output['css'] = $css;

echo json_encode($output);


