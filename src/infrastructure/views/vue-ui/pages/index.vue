<template>
    <div>hola</div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
import { Product } from '@domain/models/Product'
import { Cart } from '@domain/models/cart'
import { cartService } from '@domain/services/CartService'
const transactions = ref([])
const { data, error } = await supabase.from('transactions').select()
transactions.value = data
console.log(data, error)
console.log(Product)

const cart = ref(null)
onMounted(() => {
    // Code to be executed after the component is mounted
    cart.value = cartService.createCart()
})
</script>
