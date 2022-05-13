<template>
    <div class="title" 
        @click="$emit('updateTitle')">
        {{ title_cand }}
    </div>
</template>

<script>
export default {
    props: ["title_cand"],
}
</script>

<style scoped>
.title {
    padding: 5px;

    font-size: 25px;
    line-height: 25px;
}

.title:hover {
    background-color: #ccc;
}
</style>
