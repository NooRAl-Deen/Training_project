import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorProvider } from "./contexts/ErrorContext";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import "./utils/i18n";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeModeProvider } from "@/contexts/ThemeContext.jsx";
import { SocketProvider } from "./contexts/SocketContext.jsx";
const queryClient = new QueryClient();
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <ThemeModeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SocketProvider>
            <ErrorProvider>
              <AppRoutes />
            </ErrorProvider>
          </SocketProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeModeProvider>
  );
}

export default App;
