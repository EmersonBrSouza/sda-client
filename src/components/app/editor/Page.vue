<template>
  <div :id="index" class="page mt-15" :class="{'selected':selected}" :ref="`quill${index}`" @keydown.delete.prevent="deleteBlank">
  </div>
</template>

<script>
import IQuill from 'quill'
import Delta from 'quill-delta/lib/delta'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

const Quill = IQuill
var Size = Quill.import('attributors/style/size')
var Font = Quill.import('formats/font')
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
    ...mapGetters(['pages', 'selectedFontFamily', 'selectedFontSize', 'selectedColor', 'bold', 'italic', 'underline', 'selectedAlign', 'getUser'])
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
    selectedFontFamily () {
      if (Font.whitelist.indexOf(this.selectedFontFamily) === -1) {
        Font.whitelist.push(this.selectedFontFamily)
        Quill.register(Font, true)
      }
      this.innerQuill.format('font', this.selectedFontFamily)
    },
    selectedAlign () {
      this.innerQuill.format('align', this.selectedAlign)
    }
  },
  methods: {
    initialize () {
      var options = { formats: ['color', 'bold', 'underline', 'italic', 'font', 'size', 'align'] }

      this.configureWhitelists()
      this.innerQuill = new Quill(this.$refs[`quill${this.index}`], options)
      this.innerQuill.enable(true)
      this.configureListeners()
    },
    configureListeners () {
      let quill = this.innerQuill
      let vm = this

      quill.on('text-change', function (delta, oldDelta, source) {
        if (source === 'user') {
          console.log(delta)
          vm.sendRefresh(delta, oldDelta)
        }
      })
    },
    configureWhitelists () {
      Size.whitelist = ['7px', '8px', '10px', '12px', '14px', '16px', '20px', '24px', '32px', '36px', '48px', '72px']
      Quill.register(Size, true)

      Font.whitelist = ['arial', 'bitter', 'catamaran', 'courgette', 'indieflower', 'nunito', 'raleway', 'roboto']
      Quill.register(Font, true)
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
        this.innerQuill.format('font', this.selectedFontFamily)
      }
    },
    sendRefresh (delta, oldDelta) {
      this.$socket.emit('commit', { content: delta, documentID: 'KYwpm2MMRKbkS4ysChSQ', userID: this.getUser.uid })
    },
    getRefresh () {
      this.$socket.emit('pull', '')
    },
    ...mapActions(['deletePage', 'setColor'])
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
      let vm = this
      let credentials = { documentID: 'KYwpm2MMRKbkS4ysChSQ', userID: this.getUser.uid }

      axios.post('http://localhost:3000/join', credentials)
        .then(function (response) {
          vm.$socket.emit('join', credentials)
        })
        .catch(function (e) {
          console.log(e)
        })
    },
    customEmit: function (val) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
    execute: function (val) {
      let fetch = []
      val.forEach(item => {
        if (!item.hasOwnProperty('retain')) fetch.push(item)
      })
      let delta = new Delta(fetch)
      console.log(delta)
      this.innerQuill.setContents(delta)
    }
  },
  timers: {
    getRefresh: {
      time: 20000,
      autostart: true,
      repeat: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss">
  .page{
    max-width: 794px;
    // min-height: 1123px;
    // max-height: 1123px;
    border: none;
    margin-left: auto;
    margin-right: auto;
    resize: none;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.35);
    background: white;
    white-space: pre-wrap;
  }
  .ql-editor{
    min-height: 1123px;
  }
  .ql-font-arial { font-family: 'Arial', sans-serif; }
  .ql-font-bitter  { font-family: 'Bitter', serif; }
  .ql-font-catamaran  { font-family: 'Catamaran', sans-serif; }
  .ql-font-courgette  { font-family: 'Courgette', cursive; }
  .ql-font-indieflower  { font-family: 'Indie Flower', cursive; }
  .ql-font-nunito  { font-family: 'Nunito', sans-serif; }
  .ql-font-raleway  { font-family: 'Raleway', sans-serif; }
  .ql-font-roboto  { font-family: 'Roboto', sans-serif; }
</style>
