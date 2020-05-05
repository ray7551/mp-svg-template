<template>
  <div class="col range bg-white main_margin_slider">
    <label for="white-space">{{label}}</label>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model="v"
      @input="$emit('input', $event.target.value) && updateProgress()"
    >
    <span class="value">{{v}}</span>
    <div class="range-progress" :style="'left: ' + progress + '%;'"></div>
  </div>
</template>

<script>
export default {
  name: "RangeSlider",
  props: {
    label: {
      type: String,
      default: "Range"
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10
    },
    step: {
      type: Number,
      default: 0.1
    }
  },
  data: function() {
    return {
      v: 0,
      progress: 0
    };
  },
  methods: {
    updateProgress() {
      this.progress = (this.v / (this.$props.max - this.$props.min)) * 100;
    }
  }
};
</script>

<style scoped>
/** nice theme from cargo.site design page */
.range {
  padding: 0.75rem 1.5rem;
  position: relative;
  overflow: hidden;
}
.range label {
  pointer-events: none;
  position: relative;
  z-index: 2;
}
.range input[type="range"] {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100%;
}
input[type="range"] {
  padding: 0;
  position: relative;
  z-index: 2;
  cursor: ew-resize;
  -webkit-appearance: none;
  width: 100%;
  height: 4rem;
  background: #dddddd;
  overflow: hidden;
  margin: 0;
}
input[type="range"]::-moz-range-track {
  padding: 0;
  position: relative;
  z-index: 2;
  cursor: ew-resize;
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
  background: #dddddd;
  overflow: hidden;
  margin: 0;
}
input[type="range"]::-ms-track {
  padding: 0;
  position: relative;
  z-index: 2;
  cursor: ew-resize;
  width: 100%;
  height: 4rem;
  background: transparent;
  overflow: hidden;
  margin: 0;
  border: 0;
  color: transparent;
}
input[type="range"][disabled] {
  cursor: default;
  opacity: 0.33;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border-right: 2px solid transparent;
  width: 2px;
  height: 4rem;
  background: none;
  position: relative;
  pointer-events: none;
  z-index: 9;
}
input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  border-right: 2px solid #0099ff;
  border-left: 0;
  border-bottom: 0;
  border-top: 0;
  width: 0px;
  height: 100%;
  background: none;
  position: relative;
  pointer-events: none;
  z-index: 3;
  border-radius: 0;
}
input[type="range"]::-ms-thumb {
  background-color: #0099ff;
  border: 0;
  width: 2px;
  height: 4rem;
  position: relative;
  pointer-events: none;
  z-index: 3;
  border-radius: 0;
}
input[type="range"]:active::-webkit-slider-thumb:after {
  content: " ";
  width: 1000px;
  height: 4rem;
  position: absolute;
  z-index: 1;
  right: 0;
  top: 0;
  background: #fff;
  pointer-events: none;
}
.range-progress {
  position: absolute;
  pointer-events: none;
  top: 0;
  bottom: 0;
  /*left: 0;*/
  background: #fff;
  z-index: 1;
  width: 1000px;
}
.range-progress:after {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 2px;
  content: "";
  background: #09f;
}
input[type="range"]::-moz-range-progress {
  background: #fff;
  pointer-events: none;
  height: 100%;
  width: 100%;
}
input[type="range"]::-ms-fill-lower {
  background: #fff;
  pointer-events: none;
  height: 100%;
  width: 100%;
  border-radius: 0;
}
input[type="range"]::-moz-focus-outer {
  border: 0;
}

.value {
  pointer-events: none;
  padding: 0.75rem 1.5rem 0.75rem 0.75rem;
  position: absolute;
  top: 0rem;
  right: 0;
  z-index: 2;
  font-size: 1.4rem;
  line-height: 1.7;
  font-weight: normal;
  color: #777777;
}
</style>
