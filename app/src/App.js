import React, { useEffect, useState } from 'react';
import ArticlePage from './components/ArticlePageC/ArticlePage';
import DownSection from './components/DownSection';
import EditorPage from './components/EditorPage/EditorPage';
import { QueryClient,QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import IntrListPage from './components/IntrListPage/IntrListPage';
import MidSection from './components/MidSection';
import UpSection from './components/UpSection';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { ArticleDataR, ArticleVisible,
   IntrPageVisible, SavePageVisible, 
   SearchPageVisible, CurrentInterest,
   LoginVisible, isSignedIn, WriterVisible, AuthorPageVisible} from './context/MainContex';
import './static/mainStyle.css'
import { DomUtil } from './utilities/DomUtil';
import SavedPage from './components/SavedPage/SavedPage';
import { APIservice } from './API/APIservice';
import LoginPopUp from './components/LoginPopUp';
import { DataManager } from './utilities/DataManager';
import WriterPage from './components/WriterPage/WriterPage';
import AuthorPage from './components/AuthorPage/AuthorPage';
function App() {
  const queryClient = new QueryClient({defaultOptions:{
    queries:{
      refetchOnWindowFocus:false
    }
  }});
  const [ArticleData, setArticleData] = useState({title:'',updated: 'yesterday', text: "", 
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
  const [LogVisible, setLogVisible] = useState(false);
  const [isSignedInS, setIsSignedInS] = useState(false);
  const [WriterVisibleC, setWriterVisibleC] = useState(false);
  const [AuthorVisible, setAuthorVisible] = useState({name:'', state:false});


  useEffect(()=>{
    if(ArVisible){

        DataManager.getArticleSettings().then((sets)=>{
          if(sets){
            DomUtil.setThemeColor(sets.backColor) 
            DomUtil.setBackColor(sets.backColor)
          } else {
            DomUtil.setThemeColor(ArticleData.backColor) 
            DomUtil.setBackColor(ArticleData.backColor)
          }
          if(AuthorVisible.state){
            DomUtil.setThemeColor('#111111')
          }
        })
    } else if (IntrVisible){
        DomUtil.setThemeColor('#ffe8e5') 
        DomUtil.setBackColor('#ffe8e5')
    } else {
        DomUtil.setThemeColor('#111111') 
        DomUtil.setBackColor('#111111')
    }
  }, [ArVisible, IntrVisible, AuthorVisible.state])


  useEffect(()=>{
    DataManager.checkUserData().then((response)=>{
      if(response){
        setIsSignedInS(true)
      } else {
        setIsSignedInS(false)
      }
    })
  }, [])


  const handleResponse =(response)=>{

  }
  return (
    <GoogleOAuthProvider clientId="752471527080-ognjimhi63v2mtf656io0h1s1sk2n5ju.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
    <isSignedIn.Provider value={{isSignedInS, setIsSignedInS}}>
    <LoginVisible.Provider value={{LogVisible, setLogVisible}}>
    <CurrentInterest.Provider value={{CurInterest, setCurInterest}}>
    <SearchPageVisible.Provider value={{SearchVisible, setSearchVisible}}>
    <SavePageVisible.Provider value={{SVisible, setSVisible}}>
    <ArticleDataR.Provider value={{ArticleData, setArticleData}}>
    <ArticleVisible.Provider value={{ArVisible, setArVisible}}>
    <IntrPageVisible.Provider value={{IntrVisible, setIntrVisible}}>
    <WriterVisible.Provider value={{WriterVisibleC, setWriterVisibleC}}>
    <AuthorPageVisible.Provider value={{AuthorVisible, setAuthorVisible}}>
    <div className='app-content'>
      <ArticlePage article_data={ArticleData}/>
      <div style={{paddingBottom:'100px'}}>
      <UpSection/>
      <MidSection/>
      </div>
      <DownSection/>
      <IntrListPage/>
      <SavedPage/>
      {
        LogVisible && <LoginPopUp/>
      }
      {/* <EditorPage/> */}
      <AuthorPage/>
      <WriterPage/>
    </div>
    </AuthorPageVisible.Provider>
    </WriterVisible.Provider>
    </IntrPageVisible.Provider>
    </ArticleVisible.Provider>
    </ArticleDataR.Provider>
    <ReactQueryDevtools initialIsOpen={false} />
    </SavePageVisible.Provider>
    </SearchPageVisible.Provider>
    </CurrentInterest.Provider>
    </LoginVisible.Provider>
    </isSignedIn.Provider>
    </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
