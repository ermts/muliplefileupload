<?php

header('Content-Type: application/json');

$success = [];
$failed = [];

/* Enter type of file to allow for uploading */
// $allowed = ['mp4'];

if(!empty($_FILES['file'])) {
	foreach ($_FILES['file']['name'] as $key => $value) {
		$ext = end(explode('.', $_FILES['file']['name'][$key]));
		$filename = $_FILES['file']['name'][$key];
		$path = $_FILES['file']['tmp_name'][$key];

		/* Uncomment below line for type restriction for files */
		// if(in_array($ext, $allowed) && ($_FILES['file']['error'][$key] === 0)){
		if($_FILES['file']['error'][$key] === 0){

			if(move_uploaded_file($path, "../uploads/{$filename}")){
				$success[] = $filename;
			}else{
				$failed[] = $filename;
			}
		}else{
			$failed[] = $filename;
		}
	}
}

echo json_encode([
	'success' => $success,
	'failed' => $failed
]);
die;

?>