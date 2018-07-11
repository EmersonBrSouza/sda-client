<template>
  <div :id="index" class="page mt-15" :class="{'selected':selected}" :ref="`quill${index}`" @keydown.delete.prevent="deleteBlank">
  </div>
</template>

<script>
import IQuill from 'quill'
import { mapActions, mapGetters } from 'vuex'

const Quill = IQuill
var Size = Quill.import('attributors/style/size')

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
    ...mapGetters(['pages', 'selectedFontSize', 'selectedColor', 'bold', 'italic', 'underline', 'selectedAlign'])
  },
  watch: {
    bold () {
      this.innerQuill.format('bold', this.bold)
    },
    italic () {
      this.innerQuill.format('italic', this.italic)
    },
    underline () {
      this.innerQuill.format('underline', this.underline)
    },
    selectedColor () {
      this.innerQuill.format('color', this.selectedColor)
    },
    selectedFontSize () {
      if (Size.whitelist.indexOf(this.selectedFontSize) === -1) {
        Size.whitelist.push(this.selectedFontSize)
        Quill.register(Size, true)
      }
      this.innerQuill.format('size', this.selectedFontSize)
    },
    selectedAlign () {
      console.log(this.selectedAlign)
      this.innerQuill.format('align', this.selectedAlign)
    }
  },
  methods: {
    initialize () {
      var options = {
        formats: [
          'color', 'bold', 'underline', 'italic', 'font', 'size', 'align'
        ]
      }

      this.configureWhitelists()
      this.innerQuill = new Quill(this.$refs[`quill${this.index}`], options)
      this.innerQuill.enable(true)
      this.configureListeners()
    },
    configureListeners () {
      let quill = this.innerQuill
      let vm = this
      quill.on('text-change', function (delta, oldDelta, source) {
        if (quill.getBounds(quill.getLength()).bottom > vm.bottomLimit) {
          vm.$parent.$emit('fullPage', { index: this.index })
        }
        // console.log(quill.getBounds(quill.getLength()).top - 50)
        // window.scrollTo(0, quill.getBounds(quill.getLength()).top - 50)
      })
    },
    configureWhitelists () {
      Size.whitelist = ['12px']
      Quill.register(Size, true)
    },
    deleteBlank (evt) {
      this.preventCursor()
      if (this.innerQuill.getLength() === 1) {
        this.deletePage(this.index)
        if (this.pages.length > 1) {
          this.innerQuill = null
        }
      }
    },
    preventCursor () {
      if (this.innerQuill.getLine(this.innerQuill.getSelection().index)[1] === 0) {
        this.innerQuill.format('color', this.selectedColor)
        this.innerQuill.format('size', this.selectedFontSize)
        this.innerQuill.format('bold', this.bold)
        this.innerQuill.format('italic', this.italic)
        this.innerQuill.format('underline', this.underline)
      }
    },
    ...mapActions(['deletePage', 'setColor'])
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
  }
</style>
