import { useState, useEffect } from 'react';
import ProductsPage from './components/ProductsPage.jsx';
import LoadingPage from './components/LoadingPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import NotDetectedPage from './components/NotDetectedPage.jsx';
import PopupLayout from './components/PopupLayout.jsx';

function App() {
  const [productInfo, setProductInfo] = useState({ title: '', products: [], status_code: 2});
  const [isDark, setIsDark] = useState(null);
  

  async function fetchProductInfo() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.runtime.sendMessage({type: "requestData", tab_id: tabs[0].id}, (response) => {
          setProductInfo(response);
      });
    });
  }

  useEffect(() => {
    fetchProductInfo();

    chrome.storage.onChanged.addListener(() => {
      fetchProductInfo();
    });
  }, []);

  useEffect(() => {
    if (isDark === null) return;
  
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  
    chrome.storage.local.set({ isDark });
  }, [isDark]);

  useEffect(() => {
    chrome.storage.local.get('isDark', (result) => {
      if (typeof result.isDark === 'boolean') {
        setIsDark(result.isDark);
      } else {
        setIsDark(true); // fallback if nothing is stored
      }
    });
  }, []);

  let inner = null;

  switch (productInfo.status_code) {
    case 2: 
      inner = <LoadingPage/>;
      break;
    case 3: 
      inner = <NotFoundPage/>;
      break;
    case 4: 
      inner = <NotDetectedPage/>;
      break;
    default: 
      inner = <ProductsPage 
                title={productInfo.title} 
                products={productInfo.products}
              />;
      break;
  }

  return (
    <PopupLayout isDark={isDark} setIsDark={setIsDark}>
      {inner}
    </PopupLayout>
  );
}

export default App;