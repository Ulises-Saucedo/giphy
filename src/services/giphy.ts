import { ref } from "vue"

const API_KEY: string = import.meta.env.VITE_API_KEY as string

export default class GiphyAPI {
    searched = ref<any[]>([]);

    async fetchSearch(endpoint: string, query: string){
        const response = await fetch(`https://api.giphy.com/v1/${endpoint}/search?q=${query}&limit=20&api_key=${API_KEY}`)
        const json = await response.json()
        this.searched.value = json.data
    }

    async fetchOnMounted(){
        const response = await fetch(`https://api.giphy.com/v1/gifs/trending?&limit=20&api_key=${API_KEY}`)
        const json = await response.json()
        this.searched.value = json.data;
    }
}