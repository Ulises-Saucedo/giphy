<template>
    <section class="flex max-w-5xl mx-auto justify-between my-5 gap-3">
        <select v-model="endpoint" class="w-1/4 shadow rounded-sm">
            <option value="gifs">Gifs</option>
            <option value="stickers">Stickers</option>
        </select>
        <input type="text" v-model="searchInput" class="w-2/4 outline-none shadow rounded-sm px-3 py-1">
        <button @click="searchByQuery" class="bg-teal-300 w-1/4 p-1 rounded-sm">Search</button>
    </section>
    <main class="grid md:grid-cols-4 sm:grid-cols-2 xs-grid-cols-1 max-w-5xl mx-auto gap-4 my-6" ref="el">
        <div v-for="e in results" :key="e.id" class="shadow rounded-sm overflow-hidden">
            <img :src="e.images.downsized_medium.url" :alt="e.title">
            <p class="text-center my-2">{{ e.title }}</p>
        </div>
    </main>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useInfiniteScroll } from '@vueuse/core'
    import GiphyAPI from './services/giphy.ts'

    const giphy = new GiphyAPI()

    const results = giphy.searched
    const searchInput = ref('')
    const endpoint = ref('gifs')
    const el = ref<HTMLElement | null>(null)
    const currentPage = ref(0)

    const searchByQuery = () =>{
        giphy.fetchSearch(endpoint.value, searchInput.value)
    }

    useInfiniteScroll(
        el,
        async () => {
            currentPage.value++
            await giphy.fetchOnMounted(currentPage.value)
        },
        { distance: 50 }
    )
</script>