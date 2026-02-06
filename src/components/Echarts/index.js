//首页有三个不同的ECharts，同样的数据要配置三份，在home.js里面写会造成代码的冗余，
//复用性的逻辑要进行组件的封装，逻辑具备共性的优先考虑封装成组件，通过传入配置的方式实现这个功能
import React,{useEffect, useRef} from 'react'
import * as echarts from 'echarts'

//echarts的配置数据
const axisOption = {
    // 图例文字颜色
    textStyle: {
      color: "#333",
    },
    // 提示框
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category", // 类目轴
      data: [],
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
      axisLabel: {
        interval: 0,
        color: "#333",
      },
    },
    yAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
      },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: [],
  }
  
  const normalOption = {
    tooltip: {
      trigger: "item",
    },
    color: [
      "#0f78f4",
      "#dd536b",
      "#9462e5",
      "#a6a6a6",
      "#e1bb22",
      "#39c362",
      "#3ed1cf",
    ],
    series: [],
  }

//函数式的组件编写
const Echarts = ({style,chartData,isAxisChart=true})=>{
    //动态获取dom实例
    const echartRef = useRef()
    let echartObj = useRef(null)
    useEffect(()=>{
        let options
        //echarts初始化
        echartObj.current = echarts.init(echartRef.current)
        //设置option,配置项的数据组装
        if(isAxisChart){
            //设置x轴
            axisOption.xAxis.data = chartData.xData
            axisOption.series = chartData.series
            options = axisOption
        }else{
            normalOption.series = chartData.series
            options = normalOption
        }
        //给echarts实例添加配置对象
        echartObj.current.setOption(options)
    },[chartData])
    return(
        <div style={style} ref={echartRef}></div>
    )
} 

export default Echarts