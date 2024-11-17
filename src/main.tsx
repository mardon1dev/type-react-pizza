import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ContextWrapper } from "./context/Context.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      // @ts-ignore
      cacheTime: 1000 * 60 * 10,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ContextWrapper>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ContextWrapper>
  </QueryClientProvider>
);
