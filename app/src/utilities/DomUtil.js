export class DomUtil{
    static async setThemeColor(color){
        document.getElementsByName('theme-color')[0].setAttribute('content', color)
    }
    static async setBackColor(color){
        document.body.style.setProperty('background-color', color)
    }
    static async setArticleFontColor(color){
        document.querySelector('.article-page').style.color = color
    }
}