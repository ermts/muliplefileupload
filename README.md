# MultipleFileUploader

## a fileupload for uploading multiple file using xhr(XMLHttpRequest) & FormData

_MultipleFileUploader_ is a simple demonstration of using the upload event of xhr object to calculate the progress and uploading more then one file at once without reloading the page like we see in many mejor websites. you can see a simple example below or in code

For example

    HTML Form
    
    <form action="lib/upload.php" method="post" enctype="multipart/form-data" id="frmUpload">
      <p>
        <label for="files">Files: </label>
        <input type="File" name="file[]" id="files" multiple required />
      </p>
      <p>
        <label for="files">percentage: </label>
        <span class="pr">0%</span>
      </p>
      <p>
        <input type="submit" name="upload" class="btnUpload">
      </p>
    </form>
    
    JS Code
    
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
    
    upload.php
    
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
    
And this returns:
    
    {
      "success": [
        "file.png",
        "file.mp4"
      ],
      "failed": [
        "failedfile.png",
        "failedfile.mp4"
      ]
    }


## Usage

    see the example above.
    
   You can restrict the type of file to be uploded, just by going into the /lib/upload.php and uncomment the $allowed array and simply enter the extension of file types which you want to upload and don't forget to uncomment the if condition in the same(lib/upload.php) file for restricting the type of file to upload.
   
   If you have any query, please email me at er.mts1993@gmail.com

## Contribution Guidelines
Tell me how I can help out including wanted features and code standards

## License
MIT
