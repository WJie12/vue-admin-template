<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize.js'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'Graph.vue.vue.vue'
    },
    id: {
      type: String,
      default: 'Graph.vue.vue.vue'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    json: {
      type: Array,
      nodes: [{ name: '徐贱云', draggable: true }, { name: '冯可梁', category: 1, draggable: true }],
      edges: [{ source: 0, target: 1, category: 0, value: '夫妻' }, { source: 0, target: 2, value: '子女' }]
    }

  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const json = this.json
      this.chart.setOption({
        title: {
          text: 'NPM Dependencies'
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            // progressiveThreshold: 700,
            data: json.data,
            edges: json.edges,
            label: {
              emphasis: {
                position: 'right',
                show: true
              }
            },
            roam: true,
            focusNodeAdjacency: true,
            lineStyle: {
              normal: {
                width: 0.5,
                curveness: 0.3,
                opacity: 0.7
              }
            }
          }
        ]
      }, true)
    }
  }
}
</script>
