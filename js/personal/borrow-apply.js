$(function () {
    // 获取上个页面传过来的参数
    var type = location.search.split("=")[1]
    var btnClass = null;
    btnText = null;
    switch (type) {
        case "1":
            btnClass = "btn-success";
            btnText = "信易贷";
            
            break;
        case "2":
            btnClass = "btn-warning";
            btnText = "车易贷";
            // debugger
            break;
        case "3":
            btnClass = "btn-primary";
            btnText = "房易贷";
            // debugger
            break;
    }
    $(".borrow-type").html(btnText).addClass(btnClass)















    $("#borrow-btn").click(function () {
        $.ajax({
            url: "http://139.9.177.51:3331/borrow.php",
            type: "get",
            data: {
                acc: sessionStorage.getItem("username"),
                interest: $("#interest").val(),
                borrowtime: $("#borrowtime").val(),
                repaytype: $("input[name='repaytype']:checked").val(),
                borrowmoney: $("#borrowmoney").val(),
                minbid: $("#minbid").val(),
                bouns: $("#bouns").val(),
                days: $("#days").val(),
                title: $("#title").val(),
                info: $("#info").val(),
            },
            success: function (data) {
                console.log(data);
                if (data == "ok") {
                    alert("申请成功")
                    location.hash = "#home"
                } else {
                    alert("申请失败，请重新输入")
                }
            }


        })
    })






















})