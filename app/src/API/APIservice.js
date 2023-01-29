import axios from 'axios'
export class APIservice{
    static async getNews(category){
        return axios.get('http://172.20.10.3:8000/api/articles', {params:{category:category}})
        .then(response=>{return response.data.articles})
    }
    static async searchNews(query){
        return axios.get('http://172.20.10.3:8000/api/search', {params:{q:query}}).then(response=>{return response.data})
    }   
    
}