$(function () {

    var canClick = true
    getBorrowInfo()

    function getBorrowInfo() {
        $.ajax({
            url: "http://139.9.177.51:3331/getborrowinfo.php",
            type: "get",
            data: {
                borrowid: location.search.split("=")[1]
            },
            dataType: "json",
            success: function (data) {
                data.repaytype = data.repaytype == "0" ? "按月分期" : "按月到期";
                for (var key in data) {
                    $(`#${key}`).html(data[key]);

                }
                // 进度条
                var ratio = parseFloat(data.ownmoney * 100 / data.borrowmoney).toFixed(2) + "%"
                $(".progress-bar").css("width", ratio)
            }

        });
    }


    $(".invest-borrow").click(function () {
        if (canClick) {
            canClick = false;
            $.ajax({
                url: "http://139.9.177.51:3331/invest.php",
                type: "get",
                data: {
                    id: sessionStorage.getItem("userid"),
                    borrowid: location.search.split("=")[1],
                    chargemoney: $("#invest").val()
                },
                // dataType:"json",
                success: function (data) {
                    canClick = true;
                    if (data == "ok") {
                        alert("投资成功")
                        $("#invest").val("");
                        getBorrowInfo()
                    } else {
                        alert("投资失败")
                    }

                }
            });

        }


    })


})