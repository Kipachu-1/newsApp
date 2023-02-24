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
    static async setRecentNews(articles){
        localStorage.setItem('recent-news', JSON.stringify(articles))
    }

    static async getRecentNews(){
        if(localStorage.getItem('recent-news')){
            return {total_pages:1, articles:JSON.parse(localStorage.getItem('recent-news'))}
        }
        return {total_pages:1, articles:[]}
    }

    static async setTokens(tokens){
        localStorage.setItem('UTokens', JSON.stringify(tokens))
    }

    static async setUserData(userData){
        this.setTokens({access:userData.access, refresh:userData.refresh})
        this.setSavedNews(userData.SavedArticles);
        this.setLikedArticles(userData.LikedArticles);
        this.setSubsciptions(userData.Subscriptions);
    }

    static async checkUserData(){
        if(localStorage.getItem('UTokens')){
            return true
        } else {
            return false
        }
    }

    static async setUserTraits(data){
        localStorage.setItem('__user_traits', JSON.stringify(data))
    }

    static async setLikedArticles(articles){
        localStorage.setItem('Liked-Articles', JSON.stringify(articles))
    }

    static async updateLikedArticles(func, article_data){
        if(localStorage.getItem('Liked-Articles')){
            if(func==='remove'){
                let orin = JSON.parse(localStorage.getItem('Liked-Articles'));
                let updated = orin.filter((item)=>{return item.UID!==article_data.UID})
                this.setLikedArticles(updated)
            } else {
                let updated = JSON.parse(localStorage.getItem('Liked-Articles'));
                updated.push(article_data)
                this.setLikedArticles(updated)
            }
        } else {
            this.setLikedArticles([article_data])
        }
    }

    static async getLikedArticles(){
        if(localStorage.getItem('Liked-Articles')){
            return JSON.parse(localStorage.getItem('Liked-Articles'));
        } else {
            this.setLikedArticles([]);
            return [];
        }
    } 
    static async inLikedArticles(article){
        let likedNews = await this.getLikedArticles();
        let result = likedNews.filter((item)=>{
            return item.UID === article.UID
        })
        if(result.length> 0){
            return true
        }
        return false
    }
    static async getSubscriptions(){
        return JSON.parse(localStorage.getItem('subs'))
    }
    static async inSubs(author){
        let subs = await this.getSubscriptions();
        let result = subs.filter((item)=>{
            return item.name === author.name
        })
        if(result.length> 0){
            return true
        }
        return false
    }

    static async setSubsciptions(subsciptions){
        localStorage.setItem('subs', JSON.stringify(subsciptions))
    }

    static async updateSubs(func, author){
        if(localStorage.getItem('subs')){
            if(func==='remove'){
                let orin = JSON.parse(localStorage.getItem('subs'));
                let updated = orin.filter((item)=>{return item.name!==author.name})
                this.setSubsciptions(updated)
            } else {
                let updated = JSON.parse(localStorage.getItem('subs'));
                updated.push(author)
                this.setSubsciptions(updated)
            }
        } else {
            this.setSubsciptions([author])
        }
    } 
    
    static async setArticleSettings(fontColor, backColor){
        localStorage.setItem('article-sets', JSON.stringify({fontColor:fontColor, backColor:backColor}))
    }
    static async getArticleSettings(){
        return JSON.parse(localStorage.getItem('article-sets'))
    }
}