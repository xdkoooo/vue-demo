<template>
  <div class="audio-container">
    <div>
      <button @click="play">播放</button>

      <canvas id="myCanvas" width="450" height="450"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      canvas: null,
      canvasCtx: null,
      audioContext: null,
      audioBufferSourceNode: null,
      analyser: null,

      dataArray: [],
      bufferLength: 1,
    };
  },
  created() {},
  mounted() {
    // canvas
    this.canvas = document.getElementById("myCanvas");
    this.canvasCtx = this.canvas.getContext("2d");

    // 兼容
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // 创建音频播放节点
    this.audioBufferSourceNode = audioContext.createBufferSource();
    this.audioBufferSourceNode.connect(audioContext.destination);
    // 连接到AudioContext对象
    this.audioContext = audioContext;

    // 创建音频分析器，连接音频分析器
    const analyser = audioContext.createAnalyser();
    this.audioBufferSourceNode.connect(analyser);
    this.analyser = analyser;
    analyser.fftSize = 2048; // 表示单次数据的长度，只能是2的n次方

    // analyser.connect(audioContext.destination);

    // 设置好fftSize之后可以拿到frequencyBinCount
    const bufferLength = this.analyser.frequencyBinCount;
    // 使用frequencyBinCount来创建一个Uint8Array，用于装数据
    const dataArray = new Uint8Array(bufferLength);

    this.bufferLength = bufferLength;
    this.dataArray = dataArray;

    console.log("bufferLength", bufferLength);
    console.log("dataArray:", dataArray);

    this.init();
    this.draw();
  },
  watch: {},
  computed: {},
  methods: {
    // 弄个函数，方便异步编程
    async init() {
      const arrayBuffer = await this.loadSound(
        "https://yun.duiba.com.cn/aurora/assets/3457521d415e67cd2311a0df0ac4152439e75de7.mp3"
      );
      console.log("arrayBuffer:", arrayBuffer);

      // 把arrayBuffer转换成audioBuffer
      const audioBuffer = await this.bufferToAudio(arrayBuffer);
      this.audioBufferSourceNode.buffer = audioBuffer;
    },

    // 加载音频文件
    loadSound(url) {
      return new Promise((resolve) => {
        const request = new XMLHttpRequest(); //建立一个请求
        request.open("GET", url, true); //配置好请求类型，文件路径等
        request.responseType = "arraybuffer"; //配置数据返回类型
        // 一旦获取完成，对音频进行进一步操作，比如解码
        request.onload = () => {
          resolve(request.response);
        };
        request.send();
      });
    },

    /**
     * ArrayBuffer 转 AudioBuffer
     * @param arrayBuffer
     * @returns {Promise}
     */
    bufferToAudio(arrayBuffer) {
      return new Promise((resolve, reject) => {
        this.audioContext.decodeAudioData(
          arrayBuffer,
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      });
    },

    play() {
      if (this.audioBufferSourceNode.isStart) {
        this.audioBufferSourceNode.isStart = false;
        this.audioBufferSourceNode.stop(); // 暂停音频
      } else {
        this.audioBufferSourceNode.isStart = true;
        this.audioBufferSourceNode.start(0); // 从0开始播放音频
      }
    },

    draw() {
      requestAnimationFrame(this.draw);

      this.analyser.getByteTimeDomainData(this.dataArray); // 将当前数据填充在dataArray中

      this.canvasCtx.fillStyle = "rgb(200, 200, 200)";
      this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvasCtx.lineWidth = 2;
      this.canvasCtx.strokeStyle = "rgb(0, 0, 0)";
      this.canvasCtx.beginPath();

      const sliceWidth = (this.canvas.width * 1.0) / this.bufferLength;
      let x = 0;

      for (let i = 0; i < this.bufferLength; i++) {
        const v = this.dataArray[i] / 128.0;
        const y = (v * this.canvas.height) / 2;

        if (i === 0) {
          this.canvasCtx.moveTo(x, y);
        } else {
          this.canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      this.canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
      this.canvasCtx.stroke();
    },
  },
};
</script>

<style lang="scss" scoped>
.audio-container {
  background: pink;
}
</style>
