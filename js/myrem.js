// 适配 1024~1920px 的屏幕
;(function () {
    // 1. 定义函数：用于修改屏幕 font-size
    const changeFontSize = function () {
        // 1.1 获取屏幕宽度
        let width = $(window).width()

        /* 设计稿是 1920px，约定 rem 基准值为 24px，则设备宽度与 rem 基准值比例为 80*/
        // 1.2 设定屏幕宽度，将宽度 / 80，并把值赋给 html 的 font-size 属性
        if (width < 1024) {
            width = 1024
        } else if (width > 1920) {
            width = 1920
        }

        let fontSize = width / 80
        $('html').css({ fontSize: fontSize + 'px' })
    }

    // 2. 首次打开页面调用一次函数
    changeFontSize()

    // 3. window 添加 resize 事件，屏幕大小改变时触发
    $(window).on('resize', changeFontSize)
})()
