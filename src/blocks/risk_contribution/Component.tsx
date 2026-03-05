'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter
} from '@mui/material';

import { FetchRiskContribution } from '@/app/FetchRiskContribution';

import { portfolios } from '@/app/Constants';
import RiskContributionGraph from '@/app/RiskContributionGraph';
import TooltipComponent from '@/app/TooltipComponent';
import CustomPopup from '@/app/(frontend)/Popup/Popup';

// ------------------------
// Type Definitions
// ------------------------
interface RiskContributionApiItem {
  Name: string;
  'Market Value': number;
  'individual stock_volatility': number;
  risk_contributions: number;
  market_contribution: number;
  isolated_risk: number;
  idiosyncratic_portion: number;
}

interface RiskContributionRow {
  sr: number;
  symbol: string;
  position_name: string;
  market_value: number;
  stock_volatility: number;
  risk_contributions: number;
  market_contribution: number;
  isolated_risk: number;
  idiosyncratic_portion: number;
  vix_value: string;
  normalizedMarketRisk: number;
  normalizedIdioRisk: number;
  normalizedIsoRisk: number;
}

interface RiskContributionProps {
  initPortfolio?: string;
  initPortfolioValue?: number;
}


export default function RiskContribution({
  initPortfolio = portfolios[0]?.name,
  initPortfolioValue = 1000000
}: RiskContributionProps) {
  const currObj: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'USD',
  };


  const [portfolio, setPortfolio] = useState(initPortfolio);
  const [FormatPortfolioValue] = useState(initPortfolioValue);
  const [riskCOntributionTableData, setRiskCOntributionTableData] =
    useState<RiskContributionRow[]>([]);
  const [riskCOntributionGraphData, setRiskCOntributionGraphData] =
    useState<RiskContributionRow[]>([]);

  const [PortfolioMarketValue, setPortfolioMarketValue] = useState(0);
  const [PortfolioRisk, setPortfolioRisk] = useState(0);
  const [HistoricalRisk, setHistoricalRisk] = useState(0);
  const [maxNormalizedRisk, setMaxNormalizedRisk] = useState(0);
  const [, setMinNormalizedRisk] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState('');

  const [show, setShow] = useState(true);
  const [, setBdOpen] = useState(true);
  const [popupState, setPopupState] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [alertType, setAlertType] = useState('');


  const fetchRiskContribute = useCallback(
    async (p_name: string, p_value: number) => {
      setBdOpen(true);
      try {
        const data = await FetchRiskContribution(p_name, p_value);
        if (!data?.result) return;

        const vix_data = data.result.graph_data['vix']['6mo']['closeprice'];
        const vix_value = parseFloat(
          vix_data[vix_data.length - 1]
        ).toFixed(2);

        const lyst: RiskContributionRow[] = [];
        let i = 1;
        let tempMax = 0;
        let tempMin = 0;

        for (const [key, value] of Object.entries<RiskContributionApiItem>(
          data.result['risk_contribution']
        )) {
          const normalizedRisk =
            ((value.isolated_risk + value.risk_contributions) /
              data.result.portfolio_risk) *
            100;

          const normalizedMarketRisk = Math.max(
            (value.market_contribution / data.result.portfolio_risk) * 100,
            0
          );


          tempMin = Math.min(tempMin, normalizedMarketRisk);
          tempMax = Math.max(tempMax, normalizedRisk);

          lyst.push({
            sr: i++,
            symbol: key,
            position_name: value.Name,
            market_value: value['Market Value'],
            stock_volatility: value['individual stock_volatility'],
            risk_contributions: value.risk_contributions,
            market_contribution: Math.max(value.market_contribution, 0),
            isolated_risk: value.isolated_risk,
            idiosyncratic_portion: value.idiosyncratic_portion,
            vix_value: vix_value,
            normalizedMarketRisk,
            normalizedIdioRisk:
              (value.risk_contributions / data.result.portfolio_risk) * 100,
            normalizedIsoRisk: normalizedRisk,
          });
        }


        lyst.sort(
          (a, b) =>
            b.risk_contributions +
            b.idiosyncratic_portion -
            (a.risk_contributions + a.idiosyncratic_portion)
        );

        setRiskCOntributionTableData(lyst);
        setRiskCOntributionGraphData(lyst.slice(0, 10));
        setMaxNormalizedRisk(tempMax);
        setMinNormalizedRisk(tempMin);
        setPortfolioMarketValue(data.result.portfolio_market_value);
        setPortfolioRisk(data.result.portfolio_risk);
        setHistoricalRisk(data.result.historical_market_risk);
        setSelectedIndex(data.result.selected_index);
      } catch (e) {
        console.error(e);
      } finally {
        setBdOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchRiskContribute(portfolio, FormatPortfolioValue);
  }, [portfolio, FormatPortfolioValue, fetchRiskContribute]);


  const changePortfolio = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === '') {
      setPopupState(true);
      setPopupMessage('Please select valid portfolio');
      setAlertType('warning');
      return;
    }
    setPortfolio(event.target.value);
  };


  const totalSums = riskCOntributionTableData.reduce(
    (acc, curr) => {
      acc.marketValue += curr.market_value;
      acc.marketContribution += curr.market_contribution;
      acc.idiosyncraticContribution += curr.idiosyncratic_portion;
      acc.totalRiskContribution += curr.risk_contributions;
      acc.diversifiedRisk += curr.isolated_risk;
      return acc;
    },
    {
      marketValue: 0,
      marketContribution: 0,
      idiosyncraticContribution: 0,
      totalRiskContribution: 0,
      diversifiedRisk: 0,
    }
  );

  return (
    <>
      <CustomPopup
        trigger={popupState}
        setTrigger={setPopupState}
        title="Risk Contribution"
        alertType={alertType}
        content={popupMessage}
      />
      <div className="risk-cell bg-dots_bg bg-cover bg-center bg-no-repeat">
        <div className="container">
          <div className="banner py-6 sm:py-[50px] lg:py-[64px]">
            <div className="inner">
              <div className="inner-content flex flex-col lg:flex-row lg:space-y-0 space-y-[56px]">
                <div className="hero-left w-full flex justify-start flex-col items-start text-left">
                  <div className="hero-text sm:space-y-8 space-y-4 text-h5 font-inter text-black-100">
                    <h1 className="text-h1 text-black font-ivy font-semibold">Secure Your Portfolio with Confidence.</h1>
                    <p>Market Shield provides advanced risk management solutions designed to protect your investments through intelligent strategies and real-time insights.</p>
                  </div>
                  <div className="button-area flex flex-wrap justify-start items-start lg:gap-12 gap-4 lg:mt-16 md:mt-8 mt-4">
                    <div className="btn-link"><a href="#" role="link">Explore Market Shield Today</a></div>
                    <div className="btn-green"><a href="#" role="link">Sign up Today!</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="sectiondivide pb0 sectioncol">
              <div className="duration inputs">
                <div className="flex flex-col gap-2 w-fit">
                  <label className='text-blue uppercase font-semibold'>Portfolio</label>
                  <select
                    value={portfolio}
                    onChange={changePortfolio}
                    className="input-mui-lg border border-solid border-black-200 rounded-md p-4 bg-white-100 cursor-pointer w-[80%]"
                  >
                    {portfolios.map((value, i) => (
                      <option key={i} value={value.name}>{value.value}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="sectiondivide pb0 sectioncol pt0i">
              <div className="riskhead p0i">
                <h2 className='text-blue text-h3 font-bold flex justify-start items-center md:flex-1 flex-[100%]'>Top 10 Risk Contribution</h2>

                <div className="riskstate">
                  <h3 className="text-green text-h2 font-medium">{PortfolioRisk.toFixed(2)}</h3>
                  <div className="lblrisk">Portfolio Volatility <TooltipComponent id={'Portfolio Risk'} /></div>
                </div>

                <div className="riskstate">
                  <h3 className="text-green text-h2 font-medium">{HistoricalRisk.toFixed(2)}</h3>
                  <div className="lblrisk">Index Volatility &nbsp;
                    {/* <img src="/media/risk-info.png" title={`Historical ${selectedIndex} Volatility`} alt="info" /> */}
                    <Image src="/media/risk-info.png" title={`Historical ${selectedIndex} Volatility`} alt="info" width={16} height={16} />
                  </div>
                </div>
              </div>
            </div>

            <div className="sectiondivide pb0 sectioncol pt0i">
              <div className="portfolio-table contributio-table">
                <div className="riskchart">
                  <p className='chartlbl left'>Annualized Volatility</p>
                  <RiskContributionGraph
                    data={riskCOntributionGraphData}
                    maxNormalizedRisk={maxNormalizedRisk}
                    totals={{

                      marketContributionTotal: parseFloat(totalSums.marketContribution.toFixed(3)),
                      idiosyncraticPortionTotal: parseFloat(totalSums.idiosyncraticContribution.toFixed(4)),
                      isolatedRiskTotal: parseFloat(totalSums.diversifiedRisk.toFixed(3))
                    }}
                    hostname=""
                  />
                  <p className='chartlbl right'>Pct Of Portfolio Volatility</p>
                </div>

                <div className="table_holder table_head risk">
                  <h3 className="flex text-body text-purple p-4 bg-[#F4DFF0] justify-between items-center font-medium cursor-pointer" onClick={() => setShow(!show)}>
                    Portfolio Details
                    {show ? <span className="minus border border-solid w-6 h-6 border-purple rounded-full flex justify-center items-center">-</span>
                      : <span className="border border-solid w-6 h-6 border-purple rounded-full flex justify-center items-center">+</span>}
                  </h3>
                  {show && (
                    <TableContainer className="table_height mt-2">
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell size="small">#</TableCell>
                            <TableCell>Symbol</TableCell>
                            <TableCell>Position Name</TableCell>
                            <TableCell>Stock Volatility</TableCell>
                            <TableCell>Market Value</TableCell>
                            <TableCell>Market Weight</TableCell>
                            <TableCell>Market Contribution</TableCell>
                            <TableCell>Idiosyncratic Contribution</TableCell>
                            <TableCell>Total Risk Contribution</TableCell>
                            <TableCell>Diversified Risk</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {riskCOntributionTableData.map((value) => (
                            <TableRow key={value.sr}>
                              <TableCell>{value.sr}</TableCell>
                              <TableCell>{value.symbol}</TableCell>
                              <TableCell>{value.position_name}</TableCell>
                              <TableCell>{value.stock_volatility.toFixed(2)}</TableCell>
                              <TableCell>{Number(value.market_value).toLocaleString("en-US", currObj)}</TableCell>
                              <TableCell>{((value.market_value / PortfolioMarketValue) * 100).toFixed(2)}%</TableCell>
                              <TableCell>{value.market_contribution.toFixed(3)}</TableCell>
                              <TableCell>{value.idiosyncratic_portion.toFixed(4)}</TableCell>
                              <TableCell>{value.risk_contributions.toFixed(3)}</TableCell>
                              <TableCell>{value.isolated_risk.toFixed(3)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell colSpan={3}>Portfolio Total:</TableCell>
                            <TableCell></TableCell>
                            <TableCell>{PortfolioMarketValue.toLocaleString("en-US", currObj)}</TableCell>
                            <TableCell>100 %</TableCell>
                            <TableCell>{totalSums.marketContribution.toFixed(3)}</TableCell>
                            <TableCell>{totalSums.idiosyncraticContribution.toFixed(4)}</TableCell>
                            <TableCell>{PortfolioRisk.toFixed(3)}</TableCell>
                            <TableCell>{totalSums.diversifiedRisk.toFixed(3)}</TableCell>
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </TableContainer>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}