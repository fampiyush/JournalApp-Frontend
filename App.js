import AuthContextProvider from './utils/auth-Context';
import Index from './components/Index';

export default function App() {
  
  return (
    <AuthContextProvider>
      <Index />
    </AuthContextProvider>
  );
}

