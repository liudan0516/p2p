$(function(){
    var row=5
    // var page=1;
    // row=5
    // var totalPage=10
    // getBorrowList(page)
    getBorrowList(1)
    function getBorrowList(pageIndex){
        $.ajax({
            url:"http://139.9.177.51:3331/getborrow.php",
            type:"get",
            data:{
                page:pageIndex,
                row:row
            },
            dataType:"json",
            success:function(data){
                // console.log(data);
                // 定义一个空字符串
                rst="";
                data.list.forEach(function(item,index,arr){
                    rst+=`
                    <tr>
                    <th scope="row">${item.userid}</th>
                    <td>${item.title}</td>
                    <td class="count">${parseInt(item.interest).toFixed(2)}%</td>
                    <td class="count">${item.borrowmoney}</td>
                    <td>${item.repaytype=="0"?"按月分期":"按月到期"}</td>
                    <td>${parseFloat(item.ownmoney*100/item.borrowmoney).toFixed(2)}%</td>
                    <td>
                        <a href="?borrowid=${item.id}#borrow-info">查看</a>
                    </td>
                   </tr>
                    `
                });
                // 渲染页面
                $(".borrow-list tbody").html(rst)
                var totalPage=Math.ceil(data.total/row)
                $("#page").paging({
                    nowPage: pageIndex, // 当前页码,默认为1
                    pageNum: totalPage, // 总页码
                    buttonNum: 7, //要展示的页码数量，默认为7，若小于5则为5
                    canJump: 1,// 是否能跳转。0=不显示（默认），1=显示
                    showOne: 0,//只有一页时，是否显示。0=不显示,1=显示（默认）
                    callback: function (num) { //回调函数,num为当前页码
                        console.log(num);
                        getBorrowList(num)
                    }
                });
            }
        
           })
    }


   
//    $(".prev").click(function(){
//     page--;  
//    page=page<1?1:page;
//    $(".current-page").html(page)
//    getBorrowList(page)
//    })
//    $(".next").click(function(){
//     page++;  
//    page=page>totalPage?totalPage:page;
//    $(".current-page").html(page)
//    getBorrowList(page)
//    })

})