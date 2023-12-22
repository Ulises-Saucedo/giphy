<template>
    <section class="flex max-w-5xl mx-auto justify-between my-5 gap-3">
        <select v-model="endpoint" class="w-1/4 shadow rounded-sm">
            <option value="gifs">Gifs</option>
            <option value="stickers">Stickers</option>
        </select>
        <input type="text" v-model="searchInput" class="w-2/4 outline-none shadow rounded-sm px-3 py-1">
        <button @click="searchByQuery" class="bg-teal-300 w-1/4 p-1 rounded-sm">Buscar</button>
    </section>
    <main class="grid md:grid-cols-4 sm:grid-cols-2 xs-grid-cols-1 max-w-5xl mx-auto gap-4 my-6">
        <div v-for="e in results.data" :key="e.id" class="shadow rounded-sm overflow-hidden">
            <img :src="e.images.downsized_medium.url" :alt="e.title">
            <p class="text-center my-2">{{ e.title }}</p>
        </div>
    </main>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import GiphyAPI from './services/giphy.ts'

    const giphy = new GiphyAPI()

    const results = giphy.searched
    const searchInput = ref('')
    const endpoint = ref('gifs')

    const searchByQuery = () =>{
        giphy.fetchSearch(endpoint.value, searchInput.value)
    }

    onMounted(async() =>{
        await giphy.fetchOnMounted()
    })
</script>

<style scoped>

</style>