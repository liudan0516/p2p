$(function(){
   //   $(".tab-recharge li").click(function(){
   //      let index=$(this).index()
   //      $(this).addClass("on").siblings().removeClass("on")
   //      $(".tab-content div").eq(index).show().siblings().hide()
   //      $(".tab-recharge li").eq(index).attr("class","on")
   //      $(".tab-content>div").eq(index).show().siblings().hide()
   //   })

        $(".tab-recharge li").click(function(){
            $(this).addClass("cur").siblings().removeClass("cur")
            $(".tab-content>div").eq($(this).index()).addClass("cur").siblings().removeClass("cur")
        })

   $(".form-group button").click(function(){
    $.ajax({
        url:"http://139.9.177.51:3331/charge.php",
        trpe:"get",
        data:{
         id:sessionStorage.getItem("userid") ,
        //  bankcode:$("#bankcode option").val(),
         chargemoney:$(".input-chargemoney").val(),
         },
         success:function(data){
            if(data=="ok"){
                alert("充值成功")
              }else{
                 alert("充值失败")  
              }
         }
     })

    
 
 
   
   })


  
})