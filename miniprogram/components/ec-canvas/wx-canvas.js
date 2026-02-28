/**
 * 微信小程序 canvas 包装器，供 ECharts 使用（来自 echarts-for-weixin）
 * 提供 attachEvent 等接口，避免 echarts 报错
 */
function WxCanvas(ctx, canvasId, isNew, canvasNode) {
  this.ctx = ctx
  this.canvasId = canvasId
  this.chart = null
  this.isNew = isNew
  if (isNew) {
    this.canvasNode = canvasNode
  } else {
    this._initStyle(ctx)
  }
  this._initEvent()
}

WxCanvas.prototype.getContext = function (contextType) {
  if (contextType === '2d') {
    return this.ctx
  }
}

WxCanvas.prototype.setChart = function (chart) {
  this.chart = chart
}

WxCanvas.prototype.addEventListener = function () {}

WxCanvas.prototype.attachEvent = function () {}

WxCanvas.prototype.detachEvent = function () {}

WxCanvas.prototype._initStyle = function (ctx) {
  if (ctx.createRadialGradient && !ctx.createCircularGradient) return
  ctx.createRadialGradient = function () {
    return ctx.createCircularGradient ? ctx.createCircularGradient.apply(ctx, arguments) : null
  }
}

WxCanvas.prototype._initEvent = function () {
  this.event = {}
}

Object.defineProperty(WxCanvas.prototype, 'width', {
  get: function () {
    return this.canvasNode ? this.canvasNode.width : 0
  },
  set: function (w) {
    if (this.canvasNode) this.canvasNode.width = w
  }
})

Object.defineProperty(WxCanvas.prototype, 'height', {
  get: function () {
    return this.canvasNode ? this.canvasNode.height : 0
  },
  set: function (h) {
    if (this.canvasNode) this.canvasNode.height = h
  }
})

module.exports = WxCanvas
