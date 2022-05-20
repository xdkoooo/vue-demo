<template>
  <div class="audio-container">
    <div>
      <input type="file" @change="onChange" />
      <audio id="audio" crossorigin="anonymous" controls></audio>

      <canvas id="myCanvas" width="600" height="600"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      canvas: null,
      ctx: null,
      audioContext: null,
      analyser: null,
      audio: null,
      audioSrc: null,

      dataArray: [],
      bufferLength: 1,

      globalID: "",

      het: 0,
      grd: null,
      grd2: null,
    };
  },
  created() {},
  mounted() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    // 兼容
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.audioContext = audioContext;
    let audio = document.getElementById("audio");
    // audio.crossOrigin = "anonymous";
    console.log("audio---", audio);

    // audio.src =
    //   "http://120.25.93.120/monitor/unitcc.btg.1.9/20220517/20220517-102153_N00000056493_21050931_913151201598_cc-ali-0-1652754113.2769.mp3";

    // audio.src =
    //   "https://fulian.zairui.net/voice/aiyunni_shangxian/20220518/4e67832cd22f46258842c360051ef33b_142641.wav";
    this.audio = audio;
    let audioSrc = audioContext.createMediaElementSource(audio);
    this.audioSrc = audioSrc;
    // 创建音频分析器，连接音频分析器
    const analyser = audioContext.createAnalyser();
    audioSrc.connect(analyser);
    this.analyser = analyser;
    analyser.fftSize = 256; // 表示单次数据的长度，只能是2的n次方
    analyser.connect(audioContext.destination);
    // this.audioBufferSourceNode.connect(audioContext.destination);
    // 设置好fftSize之后可以拿到frequencyBinCount
    const bufferLength = this.analyser.frequencyBinCount;
    // 使用frequencyBinCount来创建一个Uint8Array，用于装数据
    const dataArray = new Uint8Array(bufferLength);
    this.bufferLength = bufferLength;
    this.dataArray = dataArray;
    console.log("bufferLength", bufferLength);
    console.log("dataArray:", dataArray);
    this.ctx.lineWidth = 2;
    let grd = this.ctx.createLinearGradient(0, 0, 600, 0);
    grd.addColorStop(0, "#00d0ff");
    grd.addColorStop(1, "#eee");
    this.grd = grd;
    let grd2 = this.ctx.createLinearGradient(0, 0, 600, 0);
    grd2.addColorStop(0, "#fff");
    grd2.addColorStop(1, "#e720ee");
    this.grd2 = grd2;
    this.globalID = requestAnimationFrame(this.render);
  },
  watch: {},
  computed: {},
  methods: {
    onChange(e) {
      const _self = this;
      console.log(e);
      if (e.target.files[0]) {
        let playfile = URL.createObjectURL(e.target.files[0]);

        console.log("audio:", audio);

        // this.audio.src =
        //   "http://120.25.93.120/monitor/unitcc.btg.1.9/20220517/20220517-102153_N00000056493_21050931_913151201598_cc-ali-0-1652754113.2769.mp3";

        audio.src =
          "https://fulian.zairui.net/voice/aiyunni_shangxian/20220518/4e67832cd22f46258842c360051ef33b_142641.wav";

        // audio.src = playfile;

        audio.play();
      }
    },
    render() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(dataArray);
      this.ctx.beginPath();
      for (let i = 0; i < 200; i++) {
        let value = dataArray[6 * i];
        this.ctx.fillStyle = this.grd;
        this.ctx.fillRect(i * 5, 300, 2, -value + 1);
        this.ctx.fillRect(i * 5, 280 - value, 2, this.het);
        this.ctx.fillStyle = this.grd2;
        this.ctx.fillRect(i * 5, 300, 2, value + 1);
        this.ctx.fillRect(i * 5, 320 + value, 2, this.het);
      }
      this.globalID = requestAnimationFrame(this.render);
    },
  },
};
</script>

<style lang="scss" scoped>
.audio-container {
  background: pink;
}
</style>
