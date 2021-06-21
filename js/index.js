// 入口
$(function () {
    // 一个效果,一个自调用函数

    // 1. 监视模块 - 点击切换 tab 栏效果
    ;(function () {
        // 获取 a 标签 + 点击事件
        $('.monitor .tabs a').on('click', function () {
            // 排他 - a 标签排他 active 类
            $(this).addClass('active').siblings().removeClass('active')
            // 排他 - list 排他 active 类
            $('.monitor .content .list').eq($(this).index()).addClass('active').siblings().removeClass('active')
        })
    })()

    // 2. 点位模块 - 饼图
    // 五个步骤: 1. 引入  2. 容器  3. 初始化实例  4. 配置项和数据  5. 渲染
    ;(function () {
        // const mychart = echarts.init($('.site .chart .pie').get(0))

        let option = {
            // 系列列表(数据)
            series: [
                {
                    // 图表名字
                    name: '点位统计',
                    // 图表类型: pie
                    type: 'pie',
                    // 半径
                    radius: ['5%', '70%'],
                    // 居中放置
                    center: ['50%', '50%'],
                    // 'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
                    roseType: 'area',
                    itemStyle: {
                        // 饼图扇形区块的内外圆角半径
                        borderRadius: 1,
                    },
                    // 颜色
                    color: ['red', 'orange', 'yellow', 'green', 'skyblue', 'blue', 'indigo', 'purple', ''],
                    data: [
                        { value: 40, name: '北京' },
                        { value: 38, name: '上海' },
                        { value: 32, name: '广州' },
                        { value: 30, name: '深圳' },
                        { value: 28, name: '重庆' },
                        { value: 26, name: '香港' },
                        { value: 22, name: '澳门' },
                        { value: 18, name: '台湾' },
                    ],
                },
            ],
            tooltip: {
                // 鼠标放置到对应元素上触发:item
                trigger: 'item',
                // 修改提示信息
                formatter: '{a}<br>{b}: {c}({d}%)',
            },
        }

        // mychart.setOption(option)

        // 窗口变化时,图表自适应
        // $(window).on('resize', () => {
        //     mychart.resize()
        // })

        getMyEcharts($('.site .chart .pie').get(0), option)
    })()

    // 🔄 封装函数，优化 echarts 图表的创建
    function getMyEcharts(dom, option) {
        const mychart = echarts.init(dom)
        mychart.setOption(option)

        // 窗口变化时,图表自适应
        $(window).on('resize', () => {
            mychart.resize()
        })
    }

    // 3. 用户模块 - 柱形图
    ;(function () {
        let option = {
            xAxis: {
                type: 'category',
                data: ['北京', '上海', '广州', '', '...', '', '深圳', '重庆', '香港', '澳门'],
            },
            yAxis: {
                type: 'value',
                // 修改分割线颜色
                splitLine: {
                    lineStyle: {
                        color: ['#00fffb'],
                    },
                },
            },
            axisLabel: {
                color: 'rgb(0, 115, 211)',
            },
            series: [
                {
                    name: '用户数据',
                    data: [1900, 2400, 1650, 2180, 1700, 1920, 2130, 2100, 2020, 1890],
                    type: 'bar',
                    color: {
                        // 线性变化
                        type: 'linear',
                        // 起始位置&结束位置
                        x: 0,
                        x2: 0,
                        y: 0,
                        y2: 1,
                        // 颜色控制
                        colorStops: [
                            {
                                offset: 0,
                                color: '#00fffb',
                            },
                            {
                                offset: 1,
                                color: '#0061ce',
                            },
                        ],
                    },
                },
            ],
            grid: {
                // 边距控制
                left: '3%',
                right: '4%',
                top: '7%',
                bottom: '1%',
                // 显示数据
                containLabel: true,
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br>{b}：{c}',
            },
        }

        getMyEcharts($('.user .chart .bar').get(0), option)
    })()

    // 4. 订单模块
    ;(function () {
        const data = [
            { order: '1,345,678', amount: '85,345,678' },
            { order: '6,543', amount: '48,765' },
            { order: '2,543', amount: '18,765' },
            { order: '1,543', amount: '8,765' },
        ]

        let $orders = $('.order .data h4').eq(0)
        let $amount = $('.order .data h4').eq(1)

        let index = 0
        $orders.text(data[0].order)
        $amount.text(data[0].amount)
        // 设置定时器，修改订单量和销售额
        let timerId = setInterval(timerFn, 3000)

        // 函数功能：修改订单量和销售额
        function timerFn() {
            index++
            if (index === data.length) index = 0
            $('.order .tabs a').eq(index).addClass('active').siblings().removeClass('active')
            $orders.text(data[index].order)
            $amount.text(data[index].amount)
        }

        // 鼠标经过订单模块，暂停轮播，离开再打开轮播
        $('.order').hover(
            function () {
                clearInterval(timerId)
            },
            function () {
                timerId = setInterval(timerFn, 3000)
            }
        )

        // 给 tab 栏下每个 a 标签添加点击事件，添加 active 类，并修改对应数据
        $('.order .tabs').on('click', 'a', function () {
            $(this).addClass('active').siblings().removeClass('active')

            index = $(this).index()
            $orders.text(data[index].order)
            $amount.text(data[index].amount)
        })
    })()

    // 5. 销售模块
    ;(function () {
        // 定义数据
        let data = [
            {
                key1: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                key2: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
            },
            {
                key1: [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
                key2: [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34],
            },
            {
                key1: [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
                key2: [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98],
            },
            {
                key1: [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
                key2: [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24],
            },
        ]

        let option = {
            // 图例
            legend: {
                data: ['预期销售额', '实际销售额'],
                textStyle: {
                    color: '#33d9b2',
                    fontSize: 14,
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                },
            },
            // 网格，通过它可以设置图表的大小
            grid: {
                left: '3%',
                right: '4%',
                bottom: '4%',
                top: '25%',
                containLabel: true,
            },
            xAxis: {
                type: 'category', //类目数据类型
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: '#70a1ff', // 分割线样式
                    },
                },
            },
            // 设置 水平轴+竖直轴 标签文本的颜色
            axisLabel: {
                color: '#1e90ff',
                fontSize: 12,
            },
            series: [
                {
                    name: '预期销售额',
                    data: data[0].key1,
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        color: 'gold',
                    },
                },
                {
                    name: '实际销售额',
                    data: data[0].key2,
                    type: 'line',
                    smooth: true,

                    itemStyle: {
                        color: 'red',
                    },
                },
            ],
        }
        getMyEcharts($('.sales .line').get(0), option)

        // 添加定时器，自动切换数据
        let timerId = setInterval(timerFn, 3000)

        let index = 0
        // 函数功能：修改配置项数据，重新渲染图表
        function timerFn() {
            index++
            if (index === data.length) index = 0
            $('.sales .caption a').eq(index).addClass('active').siblings().removeClass('active')
            option.series[0].data = data[index].key1
            option.series[1].data = data[index].key2

            getMyEcharts($('.sales .line').get(0), option)
        }

        // 鼠标经过 sales，关闭定时器，离开再次打开定时器
        $('.sales').hover(
            function () {
                clearInterval(timerId)
            },
            function () {
                timerId = setInterval(timerFn, 3000)
            }
        )

        $('.sales .caption').on('click', 'a', function () {
            index = $(this).index() - 1
            $('.sales .caption a').eq(index).addClass('active').siblings().removeClass('active')
            option.series[0].data = data[index].key1
            option.series[1].data = data[index].key2
            getMyEcharts($('.sales .line').get(0), option)
        })
    })()
})
