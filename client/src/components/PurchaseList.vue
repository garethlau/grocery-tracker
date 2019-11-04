<template>
    <div>
        <div v-if="loading">
            loading
        </div>
        <div v-if="!loading">
            pruchase:
            <b-collapse class="card" v-for="(purchase, index) of purchases" :key="index" :open="isOpen == index" @open="isOpen = index">
                <div slot="trigger" slot-scope="props" class="card-header" role="button">
                    <p class="card-header-title">
                        {{purchase.date}}
                    </p>
                    <a class="card-header-icon">
                        <b-icon
                            :icon="props.open ? 'menu-down' : 'menu-up'">
                        </b-icon>
                    </a>
                </div>
                <div class="card-content">
                    <div class="content">
                        <PurchaseTile v-bind:data="purchase"></PurchaseTile>
                    </div>
                </div>
            </b-collapse>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import PurchaseTile from './PurchaseTile'
export default {
    name: 'PurchaseList',
    data() {
        return {
            isOpen: 0,
            loading: false,
            purchases: null,
            error: null,
        }
    },
    created() {
        this.getPurchases();
    },
    methods: {
        getPurchases() {
            this.error = this.purchases = null;
            this.loading = true;
            axios.get('/api/v1/purchase/recent').then(res => {
                console.log(res);
                this.purchases = res.data.purchases;
                this.loading = false;
            }).catch(err => {
                console.log(err);
            })
        }
    },
    components: {
        PurchaseTile
    }
}
</script>