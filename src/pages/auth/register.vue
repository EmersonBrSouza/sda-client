<template>
    <div class="columns mt-15 mt-lg-60" style="background: url('./assets/img/background-register.jpg')">
        <div class="column is-2"></div>
        <div class="column is-3">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h1 class="title is-3 has-text-left">Crie a sua conta agora. <br> É simples!</h1>
                </div>
                <div class="column is-11">
                    <b-field label="Nome">
                        <b-input type="text"/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <b-field label="Email">
                        <b-input type="email"/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <b-field label="Senha">
                        <b-input type="password"/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <button class="button is-pulled-left is-primary"> Criar a minha conta! </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style>
.bg-register{
  background: url('../../assets/img/background-register.jpg') cover;
}
</style>
