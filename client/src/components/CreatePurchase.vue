<template>
    <form>
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">New Purchase</p>
            </header>
            <section class="modal-card-body">
                <div class="columns">
                    <div class="column is-6">
                        <b-field class="text-left" label="Select a date">
                            <b-datepicker
                                v-model="date"                                                                  
                                placeholder="Click to select..."
                                icon="calendar-today">
                            </b-datepicker>
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <b-field>
                            <b-field class="text-left" label="Store">
                                <b-input placeholder="What store did you shop at?" v-model="store"></b-input>
                            </b-field>
                        </b-field>
                    </div>
                </div>

                <div v-if="items.length > 0 " class="columns">
                    <div class="column is-6 pd-btm-0">
                        <b-field class="text-left" label="Item name">
                        </b-field>
                    </div>
                    <div class="column is-2 pd-btm-0">
                        <b-field class="text-left" label="Quantity">
                        </b-field>
                    </div>
                    <div class="column is-3 pd-btm-0">
                        <b-field class="text-left" label="Price">
                        </b-field>
                    </div>
                    <div class="column is-1 pd-btm-0">
                    </div>
                </div>
                <div v-if="items.length == 0" class="columns">
                    <div class="column is-12">
                        Add items to your list!
                    </div>
                </div>

                
                <div class="item-list">
                    <div v-for="item in items" v-bind:key="item.id">
                        <ItemTile :ref="item.id" v-bind:id="item.id" @removed="removeItem" ></ItemTile>
                    </div>
                </div>
                <b-button class="add-btn" @click="newItem()" type="is-success" expanded>
                    Add Item
                </b-button>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button class="button is-primary" @click="savePurchase()">Save</button>
            </footer>

        </div>
    </form>
</template>

<script>
import ItemTile from './ItemTile'
import axios from 'axios';

export default {
    name: "CreatePurchase",
    methods: {
        savePurchase(e) {
            console.log(this.$refs)
            let finalItems = [];
            this.items.forEach(item => {
                let {name, quantity, price, discount} = this.$refs[item.id][0];
                let newItem = {
                    name: name,
                    quantity: quantity, 
                    price: price,
                    discount: discount
                }
                finalItems.push(newItem);
            });
            console.log(finalItems);
            console.log(this.date)
            console.log(this.store);

            let purchase = {
                date: this.date,
                store: this.store,
                items: finalItems
            }
            let config = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            axios.post('/api/v1/purchase', purchase, config).then(res => {
                console.log(res);
                this.$emit('saved', true);
            }).catch(err => {
                console.log(err);
                this.$emit('saved', false)
            });
        },
        newItem() {
            this.items.push({
                id: this.randomString(5)
            });
            this.scrollToEnd();
        },
        randomString(len) {
            let text = "";
            let chars = "abcdefghijklmnopqrstuvwxyz"
            for( let i=0; i < len; i++ ) {
				text += chars.charAt(Math.floor(Math.random() * chars.length))
            }
			return text;
        },
        removeItem(id) {
            console.log(id);
            this.items = this.items.filter(item => {
                return item.id !== id;
            });
        },
        scrollToEnd() {
            let container = this.$el.querySelector('.item-list');
            container.scrollTop = container.scrollHeight;
        }
    },
    data() {
        return {
            items: [
                {
                    id: this.randomString(5)
                },
            ],
            store: "",
            date: [],
        }
    },
    components: {
        ItemTile
    }
}
</script>

<style scoped>
    .add-btn {
        margin-top: 10px;
    }
    .text-left { 
        text-align: left;
    }
    .pd-btm-0 {
        padding-bottom: 0px;
    }
    .item-list {
        min-height: 30vh;
    }
</style>