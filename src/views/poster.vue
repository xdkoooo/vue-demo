<template>
  <div id="demo">
    <div
      class="video-wrapper"
      :style="videoBgStyle(item)"
      v-for="(item, index) in videoList"
      :key="index"
    >
      <span class="playBg">
        <span class="playIcon"></span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "poster",
  components: {},
  data: () => ({
    videoList: [
      {
        src:
          "http://lianzhong-dev-oss.oss-cn-shanghai.aliyuncs.com/record_file/yunke/20211123/2111151641290422.mp4?Expires=2268823077&OSSAccessKeyId=LTAI4GDciz9waSj9Z2qx2Zo7&Signature=mIaWcNoMW1f4qOppe1gOp4Z0a6U%3D",
      },
      {
        src:
          "http://v.xiaohongshu.com/8a7a631ef8123e87c29cfcfbf90fc93d6e7b601e_v1_ln?sign=1565f2d17847bdea7105eb7745e1fd26&t=5e6cff80",
      },
      {
        src:
          "http://v.xiaohongshu.com/204d85f824887c00878e90cbce168da3c4dc2565_v1_ln?sign=1b82f9f78976d3505ac9f460bfdeed2d&t=5e6cff80",
      },
      {
        src:
          "http://v.xiaohongshu.com/aaa3e9a2dfef3541ba58da45dac4e44cd572bc0c_v1_ln?sign=4271a721d45054108a7417c792de1714&t=5e6cff80",
      },
    ],
  }),
  created() {
    this.getVideoposter();
  },
  methods: {
    videoBgStyle(value) {
      console.log("value:", value);
      return (
        'background: #D8D8D8 url("' +
        value.poster +
        '") no-repeat top/' +
        value.width +
        "px " +
        value.height +
        "px;"
      );
    },
    getVideoposter() {
      let self = this;
      this.videoList.forEach((item) => {
        let video = document.createElement("video");
        video.setAttribute("crossOrigin", "Anonymous");
        video.src = item.src;
        //如果不设置currentTime，画出来的图片是空的
        video.currentTime = 0.001;
        video.onloadeddata = loadedmetadata;

        function loadedmetadata(e) {
          let canvas = document.createElement("canvas");
          let vWidth = e.path[0].videoWidth;
          let vHeight = e.path[0].videoHeight;
          //判断视频的高度和宽度
          //画布的大小，由设置的视频显示的大小决定，以免画布太大，画的图片太大，浪费资源，这里设置显示视频盒子为width:140px，height:140px;
          //设置倍数是rate，倍数越大画图的图片越大，加载速度越慢
          //https://www.w3school.com.cn/html5/canvas_drawimage.asp
          let rate = 4;
          canvas.width = 140 * 4;
          canvas.height = ((vHeight * 140) / vWidth) * 4;
          canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
          let url = canvas.toDataURL("image/png", 1);
          //显示背景图片的大小，保证在不压缩图片的情况下，背景图片能铺满
          let widthBg, heightBg;
          if (vWidth < vHeight) {
            widthBg = 140;
            heightBg = (vHeight * 140) / vWidth;
          } else {
            widthBg = (vWidth * 140) / vHeight;
            heightBg = 140;
          }
          self.$set(item, "poster", url);
          self.$set(item, "width", widthBg);
          self.$set(item, "height", heightBg);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#demo {
  margin-top: 200px;
  margin-left: 200px;
}
.video-wrapper {
  position: relative;
  float: left;
  width: 140px;
  height: 140px;
  margin-right: 30px;
  cursor: pointer;
  background: #d8d8d8;
  video {
    width: 100%;
  }
  //播放按钮的样式
  .playBg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border: 25px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    .playIcon {
      position: absolute;
      left: -3px;
      top: -8px;
      height: 0;
      width: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 12px solid #fff;
      border-right: 0 solid transparent;
    }
  }
}
</style>
