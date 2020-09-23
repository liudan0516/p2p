$(function () {
    $("#user-login .btn").click(function () {
        var userVal = $("#username").val()
        var pwdVal = $("#pwd").val()
        $.ajax({
            url: "http://139.9.177.51:3331/login.php",
            type: "post",
            data: {
                username:userVal,
                pwd:pwdVal
            },
           success:function(data){
               if(data!="fail"){
                 alert("登录成功");
                 sessionStorage.setItem("username",$('#username').val())
                 sessionStorage.setItem("userid",data)
                 location.href="./index.html"
               }else{
                 alert("登录失败");
               }
           }
        })
    })











})