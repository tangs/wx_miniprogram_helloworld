import cax from '../cax/index'

Page({
  onLoad: function () {
    //比 web 里使用 cax 多传递 this，this 代表 Page 或 Component 的实例
    const stage = new cax.Stage(300, 360, 'myCanvas', this)
    const rect = new cax.Rect(100, 100, {
      fillStyle: 'black'
    })

    const moveable = (view) => {
      view.on('drag', (e) => {
        view.x += e.dx
        view.y += e.dy
        stage.update()
      })
    }
    
    rect.originX = 50
    rect.originY = 50
    rect.x = 100
    rect.y = 100
    // rect.rotation = 30

    rect.on('tap', () => {
      console.log('tap')
    })

    const bitmap = new cax.Bitmap('../../image/icon_cloud.png', ()=>{
      stage.update()
    })
    bitmap.scale = 2
    // bitmap.rotation = 45

    moveable(rect)
    moveable(bitmap)

    stage.add(rect)
    stage.add(bitmap)
    stage.update()

    this.stage = stage;
    this.rect = rect;
  },
  onMove: function() {
    const easing = cax.To.easing.elasticInOut
    const rect = this.rect
    cax.To.get(rect)
      .to({ x: 150, rotation: 90 }, 2000)
      .begin(() => {
        // console.log('move begin.')
      })
      .progress((v) => {
        // console.log(v)
        this.stage.update()
      })
      .end(() => {
        // console.log('move end.')
      })
      // .wait(1000)
      .to({ y: 150}, 2000)
      .begin(() => {
        // console.log('move begin1.')
      })
      .progress((v) => {
        // console.log(v)
        this.stage.update()
      })
      .end(() => {
        // console.log('move end1.')
      })
      .start()
  },
  onReset: function() {
    this.rect.x = 100
    this.rect.y = 100
    this.rect.rotation = 0
    this.stage.update()
  }
})