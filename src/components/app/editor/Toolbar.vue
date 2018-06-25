<template>
  <div class="toolbar columns">
    <div class="column is-2">
      <div class="columns right-line">
        <div class="column is-6 pr-0">
          <b-field label="Fonte" custom-class="menu-label mb-5">
            <b-select>
                <option value="catamaran" selected>Catamaran</option>
            </b-select>
          </b-field>
        </div>
        <div class="column is-6 pl-10">
          <b-field label="Tamanho" custom-class="menu-label mb-5">
            <b-input type="number" min="1"></b-input>
          </b-field>
        </div>
      </div>
    </div>
    <div class="column is-3">
      <div class="columns right-line">
        <div class="column is-4 pr-0">
          <div class="columns is-multiline">
            <div class="column is-12 pb-0 mb-10">
              <span class="label menu-label">Estilo</span>
            </div>
            <div class="column is-12 pt-0">
              <button class="button">
                <b-icon icon="bold"></b-icon>
              </button>
              <button class="button">
                <b-icon icon="italic"></b-icon>
              </button>
              <button class="button">
                <b-icon icon="underline"></b-icon>
              </button>
            </div>
          </div>
        </div>
        <div class="column is-5 pl-10">
          <div class="columns is-multiline">
            <div class="column is-12 pb-0 mb-10">
              <span class="label menu-label">Alinhamento</span>
            </div>
            <div class="column is-12 pt-0">
              <button class="button">
                <b-icon icon="align-left"></b-icon>
              </button>
              <button class="button">
                <b-icon icon="align-right"></b-icon>
              </button>
              <button class="button">
                <b-icon icon="align-center"></b-icon>
              </button>
              <button class="button">
                <b-icon icon="align-justify"></b-icon>
              </button>
            </div>
          </div>
        </div>
        <div class="column is-3 pl-10">
          <div class="columns is-multiline">
            <div class="column is-12 pb-0 mb-10">
              <span class="label menu-label">Cor</span>
            </div>
            <div class="column is-12 pt-0">
              <button class="button">
                <b-icon icon="palette"></b-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
  .toolbar{
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  .right-line{
    border-right: 1px solid #eee;
  }
</style>
