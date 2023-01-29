export class DataManager{
    static async getInterests(){
        if(localStorage.getItem('intr-list')){
            return JSON.parse(localStorage.getItem('intr-list'));
        } else {
            localStorage.setItem('intr-list', JSON.stringify(['Trending']));
        }
    }
    static async updateInterests(newIntrs){
        localStorage.setItem('intr-list', JSON.stringify(newIntrs))
    }
    static async updateList(list, func, value){
        if(func === 'remove'){
            let newlist = list.filter((item)=>{return item!==value})
            return newlist
        } else {
            let newlist = list;
            newlist.push(value)
            return newlist
        }
    }
    static async getSavedNews(){
        if(localStorage.getItem('saved-news')){
            return JSON.parse(localStorage.getItem('saved-news'));
        } else {
            this.setSavedNews();
            return [];
        }
    }
    static async setSavedNews(data){
        if(data){
            localStorage.setItem('saved-news', JSON.stringify(data));
        } else {
            localStorage.setItem('saved-news', '[]');
        }
    }
    static async updateSavedNews(func, value){
        if(func === 'remove'){
            let SavedNews = await this.getSavedNews();
            let newSavedNews = SavedNews.filter((item)=>{return item.pk!==value.pk})
            this.setSavedNews(newSavedNews)
        } else {
            let newSavedNews = await this.getSavedNews();
            newSavedNews.push(value)
            this.setSavedNews(newSavedNews)
        }
    }
    static async inSavedNews(article){
        let savedNews = await this.getSavedNews();
        let result = savedNews.filter((item)=>{
            return item.pk === article.pk
        })
        if(result.length> 0){
            return true
        }
        return false
    }
}