document.querySelector('#frmUpload .btnUpload').addEventListener('click', function(e){
	e.preventDefault();

	var formdata = new FormData();

	var files = document.getElementById('files').files;

	for(var i=0; i<files.length; i++){
		formdata.append('file[]', files[i]);
	}

	var xhr = new XMLHttpRequest();

	xhr.open('post', 'lib/upload.php', true);

	xhr.addEventListener('readystatechange', function(){
		if(this.readyState === 4){
			if(this.status === 200){
				// console.log('response', JSON.parse(this.response));
				document.getElementById("result").innerHTML = this.response;
			}
		}
	});

	xhr.upload.addEventListener('progress', function(e){
		var per;

		if(e.lengthComputable){
			per = Math.round((e.loaded / e.total) * 100) + ' %';
			document.querySelector('#frmUpload .pr').innerHTML = per;
		}
		
	});

	xhr.send(formdata);

});

document.querySelector('#files').addEventListener('change', function(){
	document.querySelector('#frmUpload .pr').innerHTML = '0%';
});