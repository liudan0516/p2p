$(function () {
    getAccountInfo()

    function getAccountInfo() {
        $.ajax({
            url: "http://139.9.177.51:3331/getuserinfo.php",
            type: "get",
            data: {
                id: sessionStorage.getItem("userid")
            },
            dataType: "json",
            success: function (data) {
                for (var key in data) {
                    $(`#${key}`).html(data[key]);
                }
                draw(data)
            }
        })
    }
    $(".update-account").click(function () {
        $.ajax({
            url: "http://139.9.177.51:3331/updateuser.php",
            type: "get",
            data: {
                id: sessionStorage.getItem("userid"),
                nickname: $("#input-nickname").val(),
                email: $("#input-email").val()
            },
            success: function (data) {
                if (data == "ok") {
                    alert("修改成功")
                    getAccountInfo()
                    $('#exampleModal').modal('hide')
                } else {
                    alert("修改失败，请重新输入")
                }
            }
        })
    })

    function draw(data) {
        //1.初始化
        var myChart = echarts.init(document.getElementById('echarts'))
        // 2.写配置
        var option = {
            title: {
                text: '个人资金分布',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['总金额', '可用金额', '冻结金额']
            },
            //核心数据
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [{
                        value: data.totalmoney,
                        name: '总金额'
                    },
                    {
                        value: data.usablemoney,
                        name: '可用金额'
                    },
                    {
                        value: data.blockedmoney,
                        name: '冻结金额'
                    },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };;

        //3.应用配置
        myChart.setOption(option);
    }

})