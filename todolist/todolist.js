$(function () {
    load();
    //1按下回车键 把完整数据 存储到本地存储里面
    $("#title").on("keydown", function (e) {
            if (e.keyCode === 13) {
                //先读取本地存储的原来数据
                if($(this).val()==""){
                    alert("输入内容为空！");
                }else{
                    var local = getDate();
                    // console.log(local);
                    //更新local数组数据
                    local.push({ title: $(this).val(), done: false });
                    //把这个数组local存储给本地存储
                    saveDate(local);
                    //2本地存储数据渲染加载到页面
                    load();
                    $(this).val("");
                }
                
            }
        
    })
    //3删除操作
    $("ol,ul").on("click","a",function(){
        var data = getDate();
        // console.log(data);
        var index = $(this).attr("id");
        // console.log(index);
        data.splice(index,1);
        saveDate(data);
        load();
    })
    //4正在进行和已完成选项操作
    $("ol,ul").on("click","input",function(){
        var data = getDate();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        // console.log(data);
        saveDate(data);
        load();
    })
    //读取本地存储的数据 封装成一个函数
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    //保存本地存储
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    //渲染加载数据
    function load() {
        var data = getDate();
        // console.log(data);
        //遍历之前先要清空ol里的内容
        $("ol,ul").empty();
        var ingCount = 0;
        var doneCount =0;
        $.each(data, function (i, n) {
            // console.log(n);
            if(n.done){
                $("ul").prepend("<li><input type='checkbox' checked> <p>"+n.title+"</p><a href='javascript:;' id="+i+"></a></li>");
                doneCount++;
            }else{
                $("ol").prepend("<li><input type='checkbox'> <p>"+n.title+"</p><a href='javascript:;' id="+i+"></a></li>");
                ingCount++;
            }
            
        })
        $("#todocount").text(ingCount);
        $("#donecount").text(doneCount);
    }

})//入口函数结尾