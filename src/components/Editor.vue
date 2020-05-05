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
          font-family="-apple-system, BlinkMacSystemFont, PingFang SC, Helvetica Neue, Helvetica, STHeiti, Microsoft Yahei, Arial, Tahoma, Simsun, sans-serif"
          :font-size="textSize"
          fill="#ffffff"
        >{{text}}</text>
      </a>
    </svg>

    <form class="master_wrapper params" id="config">
      <fieldset>
        <legend>链接配置</legend>
        <label class="text col col-full row bg-white">链接文字</label>
        <input type="text" v-model="text" placeholder="paste link text here">
        <label>链接地址</label>
        <input type="text" v-model="href" placeholder="paste link url here">

        <RangeSlider label="文字大小" :min="0" :max="200" :step="1" v-model="textSize"/>

        <RangeSlider label="半透明层" :min="0" :max="1" :step="0.05" v-model="opacity"/>
      </fieldset>
      <fieldset>
        <legend>图片配置</legend>
        <label style="border: 2px solid black; margin-left: -2px">图片上传
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
      </fieldset>
      <fieldset>
        <label v-if="!isInitial && isRendered">
          生成代码：
          <textarea v-model="fullHtml" cols="100%" rows="16"></textarea>
          <br>
          <button type="button" :disabled="isCopying" @click="toClipBoard($event)">复制代码到剪贴板</button>
          <span v-if="copySuccess">复制成功，可以粘贴到公众号编辑器了</span>
        </label>
      </fieldset>
    </form>
  </div>
</template>

<script>
import RangeSlider from "./RangeSlider";
import clip from "../utils/clipboard.js";
export default {
  components: {
    RangeSlider
  },
  name: "Editor",
  props: {},
  data() {
    return {
      text: "link text",
      textSize: 60,
      fillColor: "#000000",
      opacity: 0.2,
      width: 600,
      height: 200,
      isInitial: true,
      isRendered: false,
      fullHtml: "",
      isCopying: false,
      copySuccess: false,
      imgSrc: "https://dummyimage.com/600x200/ffffff/000000.png&text=++",
      href:
        "http://mp.weixin.qq.com/s?__biz=MjM5MTE0MzUyMQ==&amp;mid=2651618824&idx=1&sn=1c50da3dcab75517c486a978adfff037&chksm=bd42dd068a355410296603cbaa8788e9bad1387e3a2f8eb61e43b1a94458048457cc546b7204&scene=21#wechat_redirect"
    };
  },
  methods: {
    onFileSelect(evt) {
      this.isRendered = false;
      this.isInitial = false;
      this.copySuccess = false;
      const files = evt.target.files; // FileList object
      if (files[0].size > 2048000) {
        alert("图片太大了，请先压缩一下图片");
        evt.target.files = [];
        return;
      }
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          var image = new Image();
          image.src = reader.result;
          image.onload = () => {
            this.width = image.naturalWidth;
            this.height = image.naturalHeight;
            this.textSize = Math.floor(image.naturalHeight * 0.3);
          };

          this.imgSrc = reader.result;
          this.$nextTick(() => {
            this.fullHtml = this.$refs.svg.outerHTML;
            this.isRendered = true;
          });
        },
        false
      );
      reader.readAsDataURL(files[0]);
    },
    toClipBoard(evt) {
      this.isCopying = true;
      this.fullHtml = this.$refs.svg.outerHTML;
      clip(
        this.$refs.svg.outerHTML,
        evt,
        () => {
          this.isCopying = false;
          this.copySuccess = true;
        },
        () => {
          this.isCopying = false;
          this.copySuccess = false;
        }
      );
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
