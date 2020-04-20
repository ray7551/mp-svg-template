<template>
  <div class="rich_media_content">
    <svg
      :style="'margin-left:auto;margin-right:auto;vertical-align: top;background-position: 0% 0%;background-repeat: no-repeat;background-size: 100% 100%;background-attachment: scroll;-webkit-tap-highlight-color:transparent;margin-top: 0px; background-image: url(' + imgSrc + ');'"
      width="100%"
      height="100%"
      x="0px"
      y="0px"
      :view-box.camel="'0 0 ' + width + ' ' + height"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xlink="http://www.w3.org/1999/xlink"
      ref="svg"
    >
      <a
        target="_blank"
        :href="href"
        :textvalue="text"
        data-itemshowtype="0"
        tab="innerlink"
        data-linktype="2"
      >
        <rect width="100%" height="100%" x="0%" y="0%" :fill="fillColor" :opacity="opacity"></rect>
        <text
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          font-family="Arial, Helvetica, sans-serif"
          :font-size="textSize"
          fill="#ffffff"
        >{{text}}</text>
      </a>
    </svg>

    <form class="params" id="config">
      <fieldset>
        <legend>配置</legend>
        <label>
          链接文字
          <input type="text" v-model="text" placeholder="paste link text here">
        </label>
        <label>
          链接地址
          <input type="text" v-model="href" placeholder="paste link url here">
        </label>
        <label>
          文字大小
          <input type="number" step="1" v-model="textSize" placeholder="text size">
        </label>
        <label>
          半透明层
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            v-model="opacity"
            placeholder="opacity"
          >
        </label>
        <label style="border: 2px solid black; margin-left: -2px">图片
          <div class="dropbox">
            <input type="file" @change="onFileSelect($event)" accept="image/*" class="input-file">
            <p v-if="isInitial">暂未上传图片</p>
            <p v-if="!isInitial">图片已上传</p>
          </div>
        </label>
        <label>
          图片宽度
          <input type="number" v-model="width" placeholder="picture width">
        </label>
        <label>
          图片高度
          <input type="number" v-model="height" placeholder="picture height">
        </label>
        <label>
          <button type="button" @click="toClipBoard">复制代码到剪贴板</button>
          <br>
          <span v-if="copySuccess">复制成功，可以粘贴到公众号编辑器了</span>
        </label>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {},
  data() {
    return {
      text: "link text",
      textSize: 70,
      fillColor: "#000000",
      opacity: 0.2,
      width: 960,
      height: 518,
      isInitial: true,
      copySuccess: false,
      imgSrc: "https://img3.doubanio.com/view/photo/l/public/p2103193433.webp",
      href:
        "http://mp.weixin.qq.com/s?__biz=MjM5MTE0MzUyMQ==&amp;mid=2651618824&idx=1&sn=1c50da3dcab75517c486a978adfff037&chksm=bd42dd068a355410296603cbaa8788e9bad1387e3a2f8eb61e43b1a94458048457cc546b7204&scene=21#wechat_redirect"
    };
  },
  methods: {
    onFileSelect(evt) {
      this.isInitial = false;
      this.copySuccess = false;
      const files = evt.target.files; // FileList object
      console.log(files);
      var blob = window.URL.createObjectURL(files[0]);
      getDataUri(blob, (dataURL, img) => {
        this.width = img.width;
        this.height = img.height;
        this.imgSrc = dataURL;
      });

      function getDataUri(url, callback) {
        var image = new Image();
        image.onload = function() {
          var canvas = document.createElement("canvas");
          canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
          canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

          canvas.getContext("2d").drawImage(this, 0, 0);

          callback(canvas.toDataURL("image/png"), image);
        };
        image.src = url;
      }
    },
    toClipBoard() {
      console.log(this.$refs.svg.outerHTML);
      // copyToClipboard(this.$refs.svg.outerHTML);
      this.copySuccess = true;
    },
    downloadSVG() {
      const svgData = this.$refs.svg.outerHTML;
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8"
      });
      const svgUrl = URL.createObjectURL(svgBlob);

      this.$refs.dl.href = svgUrl;
      this.$refs.dl.download = "funtimes.svg";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
fieldset {
  margin: 0;
}
.params label {
  display: block;
  width: 100%;
  min-height: 2em;
  margin-bottom: 1em;
  position: relative;
  text-align: left;
}
.params input {
  position: relative;
  left: 3em;
}
</style>
