import axios, { AxiosError } from 'axios'
import { DataManager } from '../utilities/DataManager'
import jwt_decode from 'jwt-decode'
export class APIservice{
    static async getNews(category, page){
        return axios.get('https://metanews.up.railway.app/api/articles', {params:{category:category, page:page}})
        .then(response=>{
            DataManager.setRecentNews(response.data.articles)
            return response.data})
        .catch(async ()=>{
            let backData = await DataManager.getRecentNews();
            return backData
        })
    }
    static async getInterests(){
        return axios.get('https://metanews.up.railway.app/api/categories').then((response)=>{
            return response.data.categories
        }).catch(()=>{
            return []
        })
    }
    static async searchNews(query){
        return axios.get('https://metanews.up.railway.app/api/search', {params:{q:query}}).then(response=>{return response.data})
    }   
    
    static async login(credentials){
        return axios.post('https://metanews.up.railway.app/api/login/', jwt_decode(credentials.credential))
    }
    static async likeArticle(article_UID, func){
        if(localStorage.getItem('UTokens')){
            return axios.get('https://metanews.up.railway.app/api/user/like/article', {params:{UID:article_UID, action:func},
            headers :{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('UTokens')).access}`
        }
    })}
    }

    static async saveArticle(article_UID, func){
        if(localStorage.getItem('UTokens')) {
            return axios.get('https://metanews.up.railway.app/api/user/save/article', {params:{UID:article_UID, action:func},
            headers :{
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('UTokens')).access}`
            }
    }).then((response)=>{console.log(response.data);})}
    }

    static async followAuthor(author_name, func){
        if(localStorage.getItem('UTokens')) {
            return axios.get('https://metanews.up.railway.app/api/user/follow/author', {params:{name:author_name, action:func},
            headers :{
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('UTokens')).access}`
            }
    }).then((response)=>{console.log(response.data);})}
    }

    static async getTopicsList(list){
        return axios.get('https://metanews.up.railway.app/gpt/topics', {params:{
            list: list
        }}).then((response=>{console.log(response.data.topics);;return response.data.topics;}))
    }

    static async getWriterArticle(title){
        return axios.get('https://metanews.up.railway.app/gpt/write/article', {params:{
            title:title
        }}).then(response=>{return response.data}).catch(()=>{
            return {title:'Error', text:'please, try again later', 
            author:{name:'unknown'}}
        })
    }
    static async getAuthorData(name){
        return axios('https://metanews.up.railway.app/api/get/author', {params:{
            name:name
        }}).then((response)=>{
            return response.data
        }).catch(()=>{
            return {}
        })
    }
    
}