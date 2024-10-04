import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CurrentTokenProvider } from "./contexts/CurrentTokenContext";
import { ErrorProvider } from "./contexts/ErrorContext";
import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient()

function App() {
  return (
    // <CurrentTokenProvider>
    <QueryClientProvider client={queryClient}>
      <ErrorProvider>
        <AppRoutes />
      </ErrorProvider>
    </QueryClientProvider>
    // </CurrentTokenProvider>
  );
}

export default App;
