<template>
    {{ editor }}
    <Editor :value="editor" @input="editor = $event" />
</template>

<script setup>
const editor = ref('adf')
</script>
