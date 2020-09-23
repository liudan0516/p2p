$(function () {
    $("#username").change(usernameValidate);
    function usernameValidate() {
        let flag = false;
        // 用户输入的值
        var userVal = $("#username").val();
        var reg = /^([a-zA-Z0-9_\u4e00-\u9fa5]{4,16})$/;
        if (reg.test(userVal)) {
            // 请求
            $.ajax({
                url: "http://139.9.177.51:3331/accrepeat.php",
                type: "get",
                data: {
                    username: userVal
                },
                async: false,
                success: function (data) {
                    if (data == "ok") {
                        flag = true;
                        $("#usermsg").html("");
                        $("#username").addClass("success");
                    }else{
                        flag = false;
                        $("#usermsg").html("用户名已存在");
                        $("#username").removeClass("success");
                    }
                }
            });
        } else {
            flag = false;
            $("#usermsg").html("4-16位字母,数字,汉字,下划线");
            $("#username").removeClass("success");
        }
        return flag

    }
    $("#pwd").change(pwdValidate);
    function pwdValidate() {
        let flag = false;
        // 用户输入的密码值
        var pwdVal = $("#pwd").val();
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (reg.test(pwdVal)) {
            $("#pwdmsg").html("");
            $("#pwd").addClass("success");
            flag = true;
        } else {
            flag = false;
            $("#pwdmsg").html("密码至少包含 数字和英文，长度6-20");
            $("#pwd").removeClass("success");
        }
        return flag
    }
    $("#psd").change(psdValidate);
    function psdValidate() {
        // 用户重新输入的密码值
        var psdVal = $("#psd").val();
        let flag = false;
        if (psdVal == $("#pwd").val()) {
            flag = true;
            $("#psdmsg").html("");
            $("#psd").addClass("success");

        } else {
            flag = false;
            $("#psdmsg").html("再次填写密码");
            $("#psd").addClass("success");
        }
        return flag

    }
    $("#email").change(emailValidate);
    function emailValidate() {
        let flag = false;
        // 用户输入的密码值
        var emailVal = $("#email").val();
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    //    console.log(reg.test(emailVal));
        if (reg.test(emailVal)) {
            $("#emailmsg").html("");
            $("#email").addClass("success");
            flag = true;
        } else {
            flag = false;
            $("#emailmsg").html("邮箱格式不正确，请重新输入！");
            $("#email").removeClass("success");
        }
        return flag
    }
    $("#nickname").change(nicknameValidate);
    function nicknameValidate() {
        let flag = false;
        // 用户输入的密码值
        var nicknameVal = $("#nickname").val();
        var reg = /^([a-zA-Z0-9_\u4e00-\u9fa5]{4,16})$/;
        if (reg.test(nicknameVal)) {
            $("#nicknamemsg").html("");
            $("#nickname").addClass("success");
            flag = true;
        } else {
            flag = false;
            $("#nicknamemsg").html("4-16位字母,数字,汉字,下划线");
            $("#nickname").removeClass("success");
        }
        return flag
    }
    // 注册
    $(".register .btn").click(function () {
        if (usernameValidate() && psdValidate() && pwdValidate()&&emailValidate()&&nicknameValidate()) {
            // 验证通过 调用注册接口
            $.ajax({
                url:"http://139.9.177.51:3331/reg.php",
                type:"post",
                data:{
                    username:$("#username").val(),
                    pwd:$("#pwd").val(),
                    email:$("#email").val(),
                    nickname:$("nickname").val()
                },
                success:function(data){
                    if(data=="ok"){
                        alert("注册成功")
                        location.href="./login.html"
                    }else{
                        alert("注册失败")
                    }
                }
            })
            
        } else {
            alert("失败")
        }
    })



















})