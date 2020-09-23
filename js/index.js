    $(function () {
        loadPage();
        window.onhashchange = loadPage;

        function loadPage() {
            var hash = location.hash;
            switch (hash) {
                case "#home":
                    $("#main").load("./pages/home.html")
                    break;
                case "#invest":
                    $("#main").load("./pages/invest.html")
                    break;
                case "#borrow-info":
                    // debugger
                    $("#main").load("./pages/borrow-info.html")
                    break;
                case "#borrow":
                    $("#main").load("./pages/borrow.html")
                    break;
                    // 个人中心
                case "#personal":
                    // $("#main").load("./pages/personal.html", function () {
                    //     $("#main").load("./pages/personal.html", function () {
                    //         //加载完个人中心一级页面后，再加载二级页面
                    //         $(".info-content").load("./pages/personal/account.html");
                    //     })
                    // })
                    loadPersonalPage("#personal/account")
                    break;
                case "#personal/account":
                    // $("#main").load("./pages/personal.html", function () {
                    //     //加载完个人中心一级页面后，再加载二级页面
                    //     $(".info-content").load("./pages/personal/account.html");
                    // })
                    loadPersonalPage("#personal/account")
                    // $("#main").load("./pages/recharge.html")
                    break;
                case "#recharge":
                    $("#main").load("./pages/recharge.html")
                    break;
                case "#personal/userInfo":
                    // $("#main").load("./pages/personal.html", function () {
                    //     //加载完个人中心一级页面后，再加载二级页面
                    //     $(".info-content").load("./pages/personal/userInfo.html");
                    // })
                    // debugger
                    loadPersonalPage("#personal/userInfo")
                    break;
                case "#personal/borrow-apply":
                    loadPersonalPage("#personal/borrow-apply")
                    break;
                default:
                    //如果匹配不到，默认加载首页
                    $("#main").load("./pages/home.html");
                    hash = "#home";
            }
            activePageNav(hash)
        }

        //激活一级导航
        function activePageNav(hash) {
            hash = hash.split("/")[0]
            //把之前的active去掉
            $(`#page-nav .nav-item .active`).removeClass("active");
            //根据属性选择器 找到和hash对应的a标签，给父级加上active
            $(`#page-nav .nav-item a[href="${hash}"]`).parent().addClass("active").siblings().removeClass("active");
        }
        // 加载借款页面
        function loadInvestPage(hash) {
            var arr = hash.split("/");
            var page = arr[arr.length - 1];
            // 判断是否在借款页面
            var isInvest = !!$(".page-invest").length;
            if (isInvest) {
                $(".page-invest").load(`pages/invest/${page}.html`);
            } else {
                $("#main").load("./pages/invest.html", function () {
                    $(".page-invest").load(`pages/invest/${page}.html`);
                })
            }

        }
        // 加载个人中心页面
        function loadPersonalPage(hash) {
            var arr = hash.split("/");
            var page = arr[arr.length - 1];
            // 判断是否在个人中心页
            var isPersonal = !!$(".page-personal").length;
            // console.log(isPersonal);
            if (isPersonal) {
                // 如果在个人中心页，只加载二级页面
                $(".page-personal .info-content").load(`pages/personal/${page}.html`);
                activeSecondNav(hash)
            } else {
                //如果不在个人中心页，先加载个人中心页，再加载二级页面
                $("#main").load("./pages/personal.html", function () {
                    //加载完个人中心一级页面后，再加载二级页面
                    $(".page-personal .info-content").load(`pages/personal/${page}.html`);
                    activeSecondNav(hash)

                })
            }

        }
        //   激活二级导航
        function activeSecondNav(hash) {
            // 把之前的active去掉
            $(`.page-personal .list-group-item .active`).removeClass("active");
            //根据属性选择器 找到和hash对应的a标签，给父级加上active
            $(`.page-personal .list-group-item a[href="${hash}"]`).parent().addClass("active").siblings().removeClass("active")
        }

        changeLoginStatus()

        function changeLoginStatus() {
            var username = sessionStorage.getItem("username");
            // 如果username有值，说明已经登录
            if (username) {
                $(".login-status:eq(0)").html(`<a class="nav-link" href="#personal">${username}</a>`)
                $(".login-status:eq(1)").html(`<a class="nav-link">注销</a>`)
            }
        }
        //  注销
        $(".login-status:eq(1)").click(function () {
            //   删除sessionStorage数据
            sessionStorage.clear()
            // 操作dom改变视图
            $(".login-status:eq(0)").html('<a class="nav-link" href="./register.html">注册</a>')
            $(".login-status:eq(1)").html('<a class="nav-link" href="./login.html">登录</a>')
        })





    })