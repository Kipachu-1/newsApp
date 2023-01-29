import React, { useEffect, useState } from 'react';
import ArticlePage from './components/ArticlePageC/ArticlePage';
import DownSection from './components/DownSection';
import EditorPage from './components/EditorPage/EditorPage';
import { QueryClient,QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import IntrListPage from './components/IntrListPage/IntrListPage';
import MidSection from './components/MidSection';
import UpSection from './components/UpSection';
import { ArticleDataR, ArticleVisible,
   IntrPageVisible, SavePageVisible, 
   SearchPageVisible, CurrentInterest } from './context/MainContex';
import './static/mainStyle.css'
import { DomUtil } from './utilities/DomUtil';
import SavedPage from './components/SavedPage/SavedPage';
function App() {
  const queryClient = new QueryClient({defaultOptions:{
    queries:{
      refetchOnWindowFocus:false
    }
  }});
  const [ArticleData, setArticleData] = useState({title:'Demand in indian drugs skyrockets in China amid covid surge',
  updated: 'yesterday',
  text: "The ocean is one of the most mysterious and least explored places on Earth. It covers over 70% of the Earth's surface and is home to a wide variety of life forms, many of which are still unknown to science.",
  author:{
      name:'Sandiego Warren',
  },
  Id: '82'
}
  );
  const [ArVisible, setArVisible] = useState(false);
  const [IntrVisible, setIntrVisible] = useState(false);
  const [SVisible, setSVisible] = useState(false);
  const [SearchVisible, setSearchVisible] = useState(false);
  const [CurInterest, setCurInterest] = useState('');


  useEffect(()=>{
    if(ArVisible){
        DomUtil.setThemeColor(ArticleData.backColor) 
        DomUtil.setBackColor(ArticleData.backColor)
    } else if (IntrVisible){
        DomUtil.setThemeColor('#ffe8e5') 
        DomUtil.setBackColor('#ffe8e5')
    } else {
        DomUtil.setThemeColor('#111111') 
        DomUtil.setBackColor('#111111')
  }
  }, [ArVisible, IntrVisible])

  return (
    <QueryClientProvider client={queryClient}>
    <CurrentInterest.Provider value={{CurInterest, setCurInterest}}>
    <SearchPageVisible.Provider value={{SearchVisible, setSearchVisible}}>
    <SavePageVisible.Provider value={{SVisible, setSVisible}}>
    <ArticleDataR.Provider value={{ArticleData, setArticleData}}>
    <ArticleVisible.Provider value={{ArVisible, setArVisible}}>
    <IntrPageVisible.Provider value={{IntrVisible, setIntrVisible}}>
    <div className='app-content'>
      <ArticlePage article_data={ArticleData}/>
      <UpSection/>
      <MidSection/>
      <DownSection/>
      <IntrListPage/>
      <SavedPage/>
      {/* <EditorPage/> */}
    </div>
    </IntrPageVisible.Provider>
    </ArticleVisible.Provider>
    </ArticleDataR.Provider>
    <ReactQueryDevtools initialIsOpen={false} />
    </SavePageVisible.Provider>
    </SearchPageVisible.Provider>
    </CurrentInterest.Provider>
    </QueryClientProvider>

  );
}

export default App;
