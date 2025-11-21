import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { openAIService } from '../services/ai/openai.service';

interface AIContextValue {
  isConfigured: boolean;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  testConnection: () => Promise<void>;
}

const AIContext = createContext<AIContextValue | undefined>(undefined);

interface AIProviderProps {
  children: ReactNode;
}

export function AIProvider({ children }: AIProviderProps) {
  const [isConfigured, setIsConfigured] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const testConnection = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const connected = await openAIService.testConnection();
      setIsConnected(connected);
      
      if (!connected) {
        setError('Failed to connect to OpenAI API. Please check your API key.');
      }
    } catch (err) {
      setIsConnected(false);
      setError(err instanceof Error ? err.message : 'Failed to connect to OpenAI API');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check if API key is configured on mount
    const configured = openAIService.isConfigured();
    setIsConfigured(configured);
    
    if (configured) {
      // Test connection if configured
      testConnection();
    } else {
      setIsLoading(false);
      setError('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your .env file.');
    }
  }, [testConnection]);

  const value: AIContextValue = {
    isConfigured,
    isConnected,
    isLoading,
    error,
    testConnection,
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}
