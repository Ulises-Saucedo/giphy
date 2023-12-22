import { ref } from "vue"

const API_KEY: string = import.meta.env.VITE_API_KEY as string

export default class GiphyAPI {
    searched = ref<any>([])

    async fetchSearch(endpoint: string, query: string): Promise<void>{
        const response = await fetch(`https://api.giphy.com/v1/${endpoint}/search?q=${query}&limit=20&api_key=${API_KEY}`)
        const json = await response.json()
        console.log(json)
        this.searched.value = json
    }
}