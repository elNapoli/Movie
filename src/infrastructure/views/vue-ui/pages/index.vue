<template>
    <div>hola</div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
import { Transaction } from '@domain/models/transaction'
import { transactionService } from '@domain/services/TransactionService'
import { transactionRepository } from '@infrastructure/instances/supabase/transactionRepository'
const transactions = ref([])

onMounted(() => {
    // Code to be executed after the component is mounted
    transactionService(transactionRepository)
        .getTransactions()
        .then((response) => console.log(response))
})
</script>
