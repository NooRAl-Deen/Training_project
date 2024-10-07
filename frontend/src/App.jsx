import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ErrorProvider } from "./contexts/ErrorContext";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import "./utils/i18n"

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorProvider>
        <AppRoutes />
      </ErrorProvider>
    </QueryClientProvider>
  );
}

export default App;
