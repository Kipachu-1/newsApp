export class ArticleUtil{
    static getImgLink(inputString){
        const startTag = "<img-here>";
        const endTag = "<img-here/>";
        const startIndex = inputString.indexOf(startTag) + startTag.length;
        const endIndex = inputString.indexOf(endTag);
        const link = inputString.substring(startIndex, endIndex);
        return link
    }
    static isLink(inputString) {
        const linkRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        return linkRegex.test(inputString);
    }
    static getRandomColor(){
        let colorList = ['#ffe8e5', '#fff2c5','#e0f1ff', '#ECCCF8'];
        let filterList = ['invert(90%) sepia(52%) saturate(5146%) hue-rotate(290deg) brightness(133%) contrast(101%)',
                        'invert(89%) sepia(7%) saturate(1691%) hue-rotate(334deg) brightness(110%) contrast(102%)',
                        'invert(89%) sepia(98%) saturate(1309%) hue-rotate(177deg) brightness(103%) contrast(109%)',
                        'invert(93%) sepia(56%) saturate(2353%) hue-rotate(213deg) brightness(105%) contrast(105%)',]
        let randomIndex = Math.floor(Math.random() * colorList.length);
        let randomColor = colorList[randomIndex];
        let filterColor = filterList[randomIndex];

        return {backColor:randomColor, filterColor:filterColor}
    }
}