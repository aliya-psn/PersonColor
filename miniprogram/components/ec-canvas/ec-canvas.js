// ec-canvas 组件：接收 option，使用 ECharts 绘制（需配合 WxCanvas 包装器）
const WxCanvas = require('./wx-canvas')

let echarts = null
function getEcharts() {
  if (echarts) return echarts
  try {
    echarts = require('./echarts')
  } catch (e) {
    console.error('[ec-canvas] require echarts fail', e)
  }
  return echarts
}

Component({
  properties: {
    option: {
      type: Object,
      value: null,
      observer(n) {
        if (n && n.radar && n.series) {
          const that = this
          setTimeout(function () { that.draw() }, 150)
        }
      },
    },
    canvasId: {
      type: String,
      value: 'ec-default',
    },
  },

  data: {},

  lifetimes: {
    ready() {
      const that = this
      if (this.properties.option && this.properties.option.radar) {
        setTimeout(function () { that.draw() }, 400)
      }
    },
  },

  methods: {
    draw() {
      const option = this.properties.option
      if (!option || !option.radar || !option.series) return
      if (this._chart) {
        this._chart.setOption(option)
        return
      }
      const ec = getEcharts()
      if (!ec) return

      const that = this
      const query = wx.createSelectorQuery().in(this)
      query
        .select('.ec-canvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          const first = res && res[0]
          const node = first && first.node
          if (!node) {
            if (!that._drawRetryCount) that._drawRetryCount = 0
            that._drawRetryCount++
            if (that._drawRetryCount <= 10) {
              setTimeout(function () { that.draw() }, 250)
            }
            return
          }
          that._drawRetryCount = 0
          const sys = wx.getSystemInfoSync()
          const dpr = sys.pixelRatio || 2
          let width = first.width || 0
          let height = first.height || 0
          if (!width || !height) {
            width = (560 * sys.windowWidth) / 750
            height = width
          }
          node.width = width * dpr
          node.height = height * dpr
          const ctx = node.getContext('2d')
          const canvasId = that.properties.canvasId || 'ec-default'
          const canvas = new WxCanvas(ctx, canvasId, true, node)
          if (typeof ec.setPlatformAPI === 'function') {
            ec.setPlatformAPI({
              createCanvas: function () { return canvas },
              loadImage: function (src, onload, onerror) {
                if (node.createImage) {
                  const img = node.createImage()
                  img.onload = onload
                  img.onerror = onerror
                  img.src = src
                  return img
                }
                if (onerror) onerror()
              }
            })
          } else if (typeof ec.setCanvasCreator === 'function') {
            ec.setCanvasCreator(function () { return canvas })
          }
          const chart = ec.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr
          })
          canvas.setChart(chart)
          chart.setOption(option)
          that._chart = chart
        })
    },
  },
})
