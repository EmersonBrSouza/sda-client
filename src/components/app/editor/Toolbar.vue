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
    <div class="column is-2">
      <div class="columns right-line">
        <div class="column is-6 pr-0">
          <b-field label="Estilo" custom-class="menu-label mb-5" size="is-small"><br>
          </b-field>
        </div>
        <div class="column is-6 pl-10">
          <b-field label="Tamanho" custom-class="menu-label mb-5">
            <b-input type="number" min="1"></b-input>
          </b-field>
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
