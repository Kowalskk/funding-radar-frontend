export interface FundingRow {
  exchange: string;
  exchange_name?: string;
  funding_apr: number;
  funding_rate_8h?: number;
  mark_price?: number;
  open_interest_usd?: number;
  volume_24h_usd?: number;
  apr_windows?: Record<string, number>;
  is_stale?: boolean;
}

export interface FundingToken {
  token: string;
  max_apr: number;
  min_apr: number;
  spread_apr: number;
  exchange_count: number;
  rows: FundingRow[];
}

export interface ArbitrageOpportunity {
  token: string;
  long_leg: { 
    exchange: string; 
    funding_apr: number; 
    open_interest_usd?: number 
  };
  short_leg: { 
    exchange: string; 
    funding_apr: number; 
    open_interest_usd?: number 
  };
  net_apr_taker: number;
  breakeven_hours_taker?: number;
}

export interface ExchangeInfo {
  slug: string;
  name: string;
  maker_fee: number;
  taker_fee: number;
  funding_interval_hours: number;
  live_token_count: number;
  arb_opportunity_count: number;
}

export interface SimulateRequest {
  token: string;
  long_exchange: string;
  short_exchange: string;
  capital_usd: number;
  days: number;
  fee_type: 'maker' | 'taker';
  slippage_pct: number;
}

export interface SimulateResponse {
  token: string;
  net_pnl_usd: number;
  net_apr: number;
  gross_funding_delta_apr: number;
  total_fees_usd: number;
  total_slippage_usd: number;
  breakeven_hours: number | null;
  breakeven_days: number | null;
  long_leg: { 
    exchange: string; 
    side: string; 
    funding_apr: number; 
    funding_income_usd: number; 
    fee_usd: number; 
    slippage_usd: number 
  };
  short_leg: { 
    exchange: string; 
    side: string; 
    funding_apr: number; 
    funding_income_usd: number; 
    fee_usd: number; 
    slippage_usd: number 
  };
  long_data_stale: boolean;
  short_data_stale: boolean;
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';
