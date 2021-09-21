'use strict'

const ocrAppMainPage=
`<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OCR-App</title>
        <link rel="icon" type="image/x-icon" href="https://ih1.redbubble.net/image.411337841.8779/aps,504x498,small,transparent-pad,600x600,f8f8f8.u3.jpg">
        <style>
            body{
                background:#181818;
                color: white;
                display:flex;
                justify-content:center;
                align-items:center;
            }
            .content{
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                width:90%;
                margin: auto;
                text-align: center;
            }
            img{
                width:20%;
                min-width:200px;
                margin-top:30px;
            }
            a{
                text-decoration:none;
                color: yellowgreen;
            }
        </style>
    </head>
    <body>
        <div class="content">
            <h1 style='color: white;'>Welcome!! This is the API Rest from The OCR Angular APP</h1>
            <h2>You can visit the site here: <a href="https://ulisesvil.github.io/OCR-Angular-TesseractJS" target="_blank">OCR Angular APP</a></h2>
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif">
            </div>
    </body>
</html>`;

module.exports = ocrAppMainPage;