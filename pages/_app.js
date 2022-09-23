import '../styles/globals.css'
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
const clientSideEmotionCache = createCache({ key: "css" });
// импорт контекста
import { StoreProvider } from "../utils/store";
import { SnackbarProvider } from "notistack";

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}) {
  return (
    <CacheProvider value={emotionCache}>
      <SnackbarProvider anchorOrigin={{vertical:'top',horizontal:'center'}}>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </SnackbarProvider>
    </CacheProvider>
  );
}

export default MyApp
