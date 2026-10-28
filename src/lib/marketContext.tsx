'use client';

/**
 * Market selection context — holds the active market (India / United
 * States) so a single toggle updates every price, budget band, market
 * copy and enquiry default on the pricing page at once.
 *
 * Default is India (the studio's home market). Consumers read the market
 * and format prices through the centralized helpers in lib/pricing, so
 * no component hardcodes a currency.
 */

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Market } from '@/lib/pricing';

type MarketContextValue = {
  market: Market;
  setMarket: (m: Market) => void;
  /** id of the service/package the enquiry form should preselect */
  selectedServiceId: string;
  setSelectedServiceId: (id: string) => void;
};

const MarketContext = createContext<MarketContextValue | null>(null);

export function MarketProvider({ children }: { children: ReactNode }) {
  const [market, setMarket] = useState<Market>('IN');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  return (
    <MarketContext.Provider
      value={{ market, setMarket, selectedServiceId, setSelectedServiceId }}
    >
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket(): MarketContextValue {
  const ctx = useContext(MarketContext);
  if (!ctx) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return ctx;
}
