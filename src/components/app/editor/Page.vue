<template>
  <div class="page mt-15" :class="{'selected':selected}" :ref="`quill${index}`" @keydown.delete="deleteBlank">
  </div>
</template>

<script>
import IQuill from 'quill'
import { mapActions, mapGetters } from 'vuex'
const Quill = IQuill

export default {
  props: {
    selected: {
      default: false,
      type: Boolean
    },
    index: {
      default: 1,
      type: Number
    }
  },
  mounted () {
    this.initialize()
  },
  computed: {
    bottomLimit () {
      return 1123
    },
    ...mapGetters(['pages', 'selectedFontSize'])
  },
  watch: {
    selectedFontSize () {
      console.log('oi')
      this.innerQuill.format('italic', true)
      this.innerQuill.format('color', 'red')
      this.innerQuill.format('size', '32px')
    }
  },
  methods: {
    initialize () {
      var options = {
        formats: [
          'color', 'bold', 'underline', 'italic', 'font', 'size'
        ]
      }

      this.configureWhitelists()
      this.innerQuill = new Quill(this.$refs[`quill${this.index}`], options)
      this.innerQuill.enable(true)
      this.configureListeners()
      this.updatePage({index: this.index, selected: this.selected})
    },
    configureListeners () {
      let quill = this.innerQuill
      let vm = this
      quill.on('text-change', function (delta, oldDelta, source) {
        if (quill.getBounds(quill.getLength()).bottom > vm.bottomLimit) {
          vm.$parent.$emit('fullPage', { index: this.index })
        }
        // console.log(quill.getBounds(quill.getLength()))
        // console.log(quill.getBounds(quill.getLength()).bottom > vm.bottomLimit)
      })
    },
    configureWhitelists () {
      var Size = Quill.import('attributors/style/size')
      Size.whitelist = ['12px', '16px', '32px']
      Quill.register(Size, true)
    },
    deleteBlank () {
      if (this.innerQuill.getLength() === 1) {
        this.deletePage(this.index)
      }
    },
    ...mapActions(['deletePage', 'updatePage'])
  }
}
</script>

<style lang="scss">
  .page{
    max-width: 794px;
    min-height: 1123px;
    max-height: 1123px;
    border: none;
    margin-left: auto;
    margin-right: auto;
    resize: none;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.35);
    background: white;
    white-space: pre-wrap;
  }
  .ql-editor{
    min-height: inherit;
    &.ql-blank::before {
      color: rgba(0,0,0,0.6);
      content: attr(data-placeholder);
      font-style: italic;
      left: 15px;
      pointer-events: none;
      position: relative;
      right: 15px;
    }
  }
</style>
