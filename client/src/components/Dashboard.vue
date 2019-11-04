/* eslint-disable */
<template>
    <div>
        <Navbar></Navbar>
        <div class="columns">
            <div class="column">
                First Column
                <PurchaseList></PurchaseList>
                <div class="buttons">
                    <b-button @click="showNewPurchaseModal=true" type="is-success" expanded>
                        New Purchase
                    </b-button>
                </div>
            </div>
            <div class="column">
                Second Column
            </div>
        </div>
        <b-modal :active.sync="showNewPurchaseModal" has-modal-card trap-focus aria-role="dialog" aria-modal>
            <CreatePurchase @saved="handleSave"></CreatePurchase>
        </b-modal>
    </div>
        
</template>

<script>
import Navbar from './Navbar'
import CreatePurchase from './CreatePurchase'
import PurchaseList from './PurchaseList'

export default {
    name: "Dashboard",
    components: {
        Navbar,
        CreatePurchase,
        PurchaseList
    },
    methods: {
        handleSave(success) {
            console.log("in hadlesave", success)
            if (success) {
                this.showNewPurchaseModal = false;
            }
        }
    },
    data() {
        return {
            showNewPurchaseModal: false
        }
    }
}
</script>