<template>
  <!-- WIP - Equalizer -->
  <div class="sliders-wrapper">
    <div v-for="(band, index) in bands" :key="index" class="slider-group">
      <div class="value-display">{{ band.gain }}dB</div>
      <input
        type="range"
        orient="vertical"
        min="-12"
        max="12"
        step="1"
        v-model.number="band.gain"
        @input="updateFilter(index)" />
      <div class="freq-label">{{ band.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/systems/stores/player"
import { onMounted, ref } from "vue"

const player = usePlayerStore()

interface Band {
  freq: number
  label: string
  gain: number
  filterNode: BiquadFilterNode | null
}

// --- 状态定义 ---

// 定义 10 个常用频段 (ISO Standard)
// 频率单位: Hz
const bands = ref<Band[]>([
  { freq: 32, label: "32", gain: 0, filterNode: null },
  { freq: 64, label: "64", gain: 0, filterNode: null },
  { freq: 125, label: "125", gain: 0, filterNode: null },
  { freq: 250, label: "250", gain: 0, filterNode: null },
  { freq: 500, label: "500", gain: 0, filterNode: null },
  { freq: 1000, label: "1k", gain: 0, filterNode: null },
  { freq: 2000, label: "2k", gain: 0, filterNode: null },
  { freq: 4000, label: "4k", gain: 0, filterNode: null },
  { freq: 8000, label: "8k", gain: 0, filterNode: null },
  { freq: 16000, label: "16k", gain: 0, filterNode: null },
])

// --- Web Audio API 初始化逻辑 ---

onMounted(() => {
  let previousNode = player.sourceNode
  if (!previousNode) return

  previousNode.disconnect()

  bands.value.forEach((band) => {
    if (!previousNode) return
    // 创建 BiquadFilterNode (Peaking 类型最适合 EQ)
    const filter = player.audioCtx.createBiquadFilter()
    filter.type = "peaking" // 峰值滤波器，增强或衰减特定频率
    filter.frequency.value = band.freq // 设置中心频率
    filter.Q.value = 1.4 // 品质因数，控制带宽 (Q值越高，影响范围越窄)
    filter.gain.value = band.gain // 初始增益

    // 保存节点引用以便后续更新
    band.filterNode = filter

    // 链接节点: Previous -> Current
    previousNode.connect(filter)
    previousNode = filter
  })

  // add compressor to prevent distortion
  const compressor = player.audioCtx.createDynamicsCompressor() // 阈值：设置在音轨最大电平附近
  compressor.threshold.value = -0.9

  // 压缩比：高比率使其接近限制器
  compressor.ratio.value = 20 // 12:1

  // 拐点：使压缩平稳过渡
  compressor.knee.value = 10 // 10 dB

  // 启动时间：极快，以便立即捕获和衰减峰值
  compressor.attack.value = 0.003 // 5 毫秒

  // 释放时间：相对较快，但要足以防止泵浦效应
  compressor.release.value = 0.25 // 250 毫秒

  // 链接最后一个节点到压缩器
  previousNode.connect(compressor)

  // 3. 链接最后一个节点到输出 (扬声器)
  previousNode.connect(player.audioCtx.destination)
})

// 浏览器策略要求用户交互后才能 Resume AudioContext
const resumeContext = async () => {}

// 更新滤波器增益
const updateFilter = (index: number) => {
  const band = bands.value[index]
  if (band.filterNode) {
    // 平滑过渡增益值，避免爆音
    band.filterNode.gain.setTargetAtTime(band.gain, player.audioCtx.currentTime, 0.01)
  }
}

// 重置所有推子
const resetEQ = () => {
  bands.value.forEach((band, index) => {
    band.gain = 0
    updateFilter(index)
  })
}
</script>

<style scoped>
.sliders-wrapper {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 10px 0;
}

.sliders-wrapper.disabled {
  opacity: 0.3;
  pointer-events: none;
}

.slider-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 40px;
}

/* 垂直滑块样式 trick */
input[type="range"][orient="vertical"] {
  writing-mode: bt-lr; /* IE/Edge */
  -webkit-appearance: slider-vertical; /* Webkit */
  width: 8px;
  height: 150px;
  padding: 0 5px;
  background: transparent;
}

/* 自定义滑块轨道 (Firefox/Webkit 通用美化较难，这里使用基础样式以保证兼容性) */
input[type="range"] {
  cursor: pointer;
}

.freq-label {
  font-size: 0.75rem;
  color: #aaa;
  font-weight: bold;
}

.value-display {
  font-size: 0.7rem;
  color: #42b983;
  height: 1rem;
}

.overlay-msg {
  text-align: center;
  margin-top: 10px;
  color: #f39c12;
  font-size: 0.9rem;
}
</style>
