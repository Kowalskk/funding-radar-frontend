export interface FundingRow {
  exchange: string;
  apr: number;
}

export interface FundingToken {
  token: string;
  highestAPR: number;
  volume24h: number;
  rates: FundingRow[];
  // Compatibility with snake_case if backend uses it
  max_apr?: number;
  rows?: any[];
}

export interface ArbitrageOpportunity {
  token: string;
  longExchange: string;
  shortExchange: string;
  longRate: number;
  shortRate: number;
  spread: number;
  // Compatibility
  net_apr_taker?: number;
}

export interface ExchangeInfo {
  slug: string;
  name: string;
  color: string;
  bg: string;
}

export interface SimulateRequest {
  amount: number;
  leverage: number;
  spread: number;
  days: number;
}

export interface SimulateResponse {
  dailyProfit: number;
  totalProfit: number;
  roe: number;
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';
