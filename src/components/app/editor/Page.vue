<template>
  <div class="page mt-15" :class="{'selected':selected}" ref="editor">
  </div>
</template>

<script>
import IQuill from 'quill'
const Quill = IQuill

export default {
  props: {
    // quillRef: {
    //   type: String,
    //   required: true,
    //   default: 'editor'
    // }
    selected: {
      default: true,
      type: Boolean
    }
  },
  mounted () {
    this.$emit('page_cre')
    this.initialize()
    this.$emit('page_created', {
      quill: this.quill,
      ref: this.quillRef
    })
  },
  methods: {
    initialize () {
      var options = {
        placeholder: 'Compose an epic...',
        formats: [
          'align'
        ]
      }
      this.quill = new Quill(this.$refs.editor, options)
      this.quill.enable(true)
    }
  }
}
</script>

<style lang="scss">
  .page{
    max-width: 794px;
    min-height: 1123px;
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
      top: 25px;
      left: 15px;
      pointer-events: none;
      position: relative;
      right: 15px;
    }
  }
</style>
