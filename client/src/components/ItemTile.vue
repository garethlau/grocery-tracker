<template>
    <section>
        <div class="flex">
            <div class="columns">
                <div class="column is-6">
                    <b-field>
                        <b-input placeholder="Item name" v-model="name"></b-input>
                    </b-field>
            

                </div>
                <div class="column is-2">
                    <b-numberinput min="0" v-model="quantity"></b-numberinput>
                </div>
                <div class="column is-3">
                    <b-numberinput min="0" step="1.00" v-model="price"></b-numberinput>
                </div>
                <div class="column is-1">
                    <b-button type="is-danger" outlined @click="removeItem()">X</b-button>
                </div>
            </div>
            
        </div>
    </section>
</template>

<script>
export default {
    name: 'ItemTile',
    props: ['id'],
    methods: {
        removeItem() {
            this.$emit('removed', this.id);
        }
    },
    data() {
        return {
            name: "",
            price: 0,
            quantity: 0,
            discount: false
        }
    }

}
</script>

<style scoped>
    .flex {
        display: flex
    }
    section {
        padding-top: 10px;
        padding-bottom: 10px;
    }
</style>