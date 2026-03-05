"use client"
import React, { useState, useEffect, useRef } from "react";
import { addZeroes } from "@/app/AddZeros";
import { portfoliosWithManual } from "@/app/Constants";
import { GetRiskHeaderColor } from "@/app/RiskColor";
import moment from "moment";
import CustomPopup from "@/app/(frontend)/Popup/Popup";
import { FetchRiskData } from "@/app/FetchRiskData";
import { FetchMarketShield } from "@/app/FetchMarketShield";
import PortfolioDetailsTable from "@/app/PortfolioDetailsTable";
import CustomDatePicker from "@/app/CustomDatepicker";

interface Protection_CalculatorProps {
    initPortfolio?: string;
    initPortfolioValue?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = Record<string, any>;

const convertNDXSecDescToXND = (indexOptions: AnyRecord) => {
    if (Array.isArray(indexOptions.SecDesc) && indexOptions.SecDesc.some((desc: string) => desc.includes("NDX"))) {
        const modifiedOptions = { ...indexOptions };

        // Convert all occurrences of "NDX" to "XND" in SecDesc
        modifiedOptions.SecDesc = modifiedOptions.SecDesc.map((desc: string) => {
            const updatedDesc = desc.replace("NDX", "XND");

            // Identify and adjust strike price at the end of SecDesc if it exists
            const strikeMatch = updatedDesc.match(/(\d+(\.\d{2})?)$/); // Match numeric ending like "19025.00"
            if (strikeMatch) {
                const strikeValue = parseFloat(strikeMatch[0]) / 100; // Divide by 100
                return updatedDesc.replace(/(\d+(\.\d{2})?)$/, Math.round(strikeValue).toString()); // Replace with rounded strike
            }
            return updatedDesc;
        });

        if (Array.isArray(modifiedOptions.ConQty)) {
            modifiedOptions.ConQty = modifiedOptions.ConQty.map((qty: number) => Math.round(qty * 100));
        }

        // Convert Strike, LastAskPrice, LastBidPrice, and Cost by dividing by 100
        if (Array.isArray(modifiedOptions.Strike)) {
            modifiedOptions.Strike = modifiedOptions.Strike.map((strike: number) => Math.round(strike / 100));
        }
        if (Array.isArray(modifiedOptions.LastAskPrice)) {
            modifiedOptions.LastAskPrice = modifiedOptions.LastAskPrice.map((price: number) => price / 100);
        }
        if (Array.isArray(modifiedOptions.LastBidPrice)) {
            modifiedOptions.LastBidPrice = modifiedOptions.LastBidPrice.map((price: number) => price / 100);
        }

        return modifiedOptions;
    }
    return indexOptions;
};

const findNearestProtectionLevel = (protectionLevels: AnyRecord[], targetLevel: number) => {
    return protectionLevels.reduce((prev, curr) =>
        Math.abs(curr.protectionLevel - targetLevel) < Math.abs(prev.protectionLevel - targetLevel) ? curr : prev,
        protectionLevels[0]
    );
};

export const Protection_Calculator: React.FC<Protection_CalculatorProps> = ({
    initPortfolio = "The Magnificent Seven",
    initPortfolioValue = 100000
}) => {

    const currObj = React.useMemo<Intl.NumberFormatOptions>(() => ({
        style: "currency",
        currency: "USD",
    }), []);

    const getNextThirdFriday = () => {
        const today = new Date();
        const nextMonth = today.getUTCMonth() + 1;
        const year = today.getUTCFullYear();

        const adjustedYear = nextMonth > 11 ? year + 1 : year;
        const adjustedMonth = nextMonth % 12;

        const firstDayOfNextMonth = new Date(Date.UTC(adjustedYear, adjustedMonth, 1));
        const firstFriday = new Date(firstDayOfNextMonth);

        while (firstFriday.getUTCDay() !== 5) {
            firstFriday.setUTCDate(firstFriday.getUTCDate() + 1);
        }

        const thirdFriday = new Date(firstFriday);
        thirdFriday.setUTCDate(firstFriday.getUTCDate() + 14);

        return thirdFriday;
    };



    const [portfolio, setPortfolio] = useState(initPortfolio);
    const [, setBdOpen] = useState(true);
    const [popupState, setPopupState] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [PortfolioTotalValue, setPortfolioTotalValue] = useState(Number(
        addZeroes(
            Number(parseFloat("100000.00").toFixed(2))
        )
    ).toLocaleString("en-US", currObj));
    const [FormatPortfolioValue, setFormatPortfolioValue] = useState(initPortfolioValue);
    // const [RiskData, setRiskData] = useState([]); // Unused in snippet
    const [protectionPeriodDate, setProtectionPeriodDate] = useState<Date | null>(getNextThirdFriday());
    const [popupTitle, setPopupTitle] = useState("");
    const [alertType, setAlertType] = useState("");
    const [, setVIXData] = useState<AnyRecord | null>(null);
    const [MesgHeader, setMesgHeader] = useState<string>();
    const [headerColor, setHeaderColor] = useState<string>();
    const [MesgDscUp, setMesgDscUp] = useState<string>();
    const [MesgDscDown, setMesgDscDown] = useState<string>();
    const [shield, setShield] = useState({
        protectionPeriod: protectionPeriodDate,
        assetAllocation: "N/A",
        stdDeviation: "N/A",
        protectionLevelPercent: 0.95,
        downsideVolatility: "N/A",
        RiskScore: "N/A"
    });
    const [, setSelectedStockOptions] = useState([]);
    const [selectedIndexOptions, setSelectedIndexOptions] = useState<AnyRecord>({});
    // const [otherHoldingsTickers, setOtherHoldingsTickers] = useState([]); // Unused
    const [shieldData, setShieldData] = useState<AnyRecord>({});
    const [sliderMin, setSliderMin] = useState(0);
    const [sliderMax] = useState(100);
    const [outputIndexTicker, setOutputIndexTicker] = useState('');
    const [sliderValue, setSliderValue] = useState(0); // To be set dynamically
    const [tooltipContent, setTooltipContent] = useState({
        protectionLevel: "N/A",
        assetAllocation: "N/A",
        stdDeviation: "N/A",
        downsideVolatility: "N/A",
        RiskScore: "N/A"
    });
    const [tooltipPosition, setTooltipPosition] = useState('');
    const [price, setPrice] = useState<string | number>('-');
    const bestIndexRef = useRef<string | null>(null);
    const [PortfolioRows, setPortfolioRows] = useState([]);
    const [selectedMetric, setSelectedMetric] = useState("Protection Level");
    const [, setShowcollapse] = useState(false); // Added missing state

    const changePortfolio = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPortfolio(event.target.value);
        setDataLoaded(false);
        if (event.target.value !== 'Manual Portfolio') {
            setPortfolioTotalValue(Number(addZeroes(Number(parseFloat("100000.00").toFixed(2)))).toLocaleString("en-US", currObj));
            setFormatPortfolioValue(initPortfolioValue);
        }
        else {
            setShowcollapse(true);
        }
    };

    function changeValue(event: React.KeyboardEvent<HTMLInputElement>, value: string) {
        const trimmedValue = value.trim().replace(/[^0-9.]/g, '');

        if (event.key === "Enter") {
            setShowTooltip(false);

            const float_value = parseFloat(trimmedValue);
            if (isNaN(float_value) || trimmedValue === "") {
                // displayError("Please enter a valid value to proceed further."); // displayError not defined in snippet?
                // Assuming setPopupMessage is enough for error display as used in fetchData
                setPopupMessage("Please enter a valid value to proceed further.");
                setPopupState(true);
                setPopupTitle("Error");
                setAlertType("Error");
                return;
            }
            if (float_value === 0) {
                setPopupMessage("Value cannot be zero. Please enter a valid value.");
                setPopupState(true);
                setPopupTitle("Error");
                setAlertType("Error");
                return;
            }

            setBdOpen(true);
            setFormatPortfolioValue(float_value);
            setPortfolioTotalValue((Number(
                addZeroes(
                    Number(float_value.toFixed(2))
                )
            ).toLocaleString("en-US", currObj)));
            setDataLoaded(false);
            fetchData(float_value, portfolio);
        }
    }

    function handleChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
        const text = event.target.value.replace(/[^\d\.]/gi, '');

        if ((text.split('.').length - 1) > 1) {
            event.target.classList.remove('valid');
            event.target.classList.add('invalid');
            return;
        }

        const lastCharIsAdot = text.substr(text.length - 1, 1) === ".";

        if (text === "0" || text === "." || isNaN(Number(text))) {
            event.target.classList.remove('valid');
            event.target.classList.add('invalid');
            return;
        } else if (event.target.value === "") {
            setPortfolioTotalValue("");
        } else {
            event.target.classList.remove('invalid');
            event.target.classList.add('valid');
            const formattedValue = Number(text).toLocaleString("en-US");
            // event.target.value = formattedValue; // Avoid direct assignment if it causes issues, but typically this is fine in uncontrolled, but here value is controlled via state in parent? No, it's controlled.
            // Actually, setPortfolioTotalValue updates the state which updates the input value.
            // So we shouldn't mutate event.target.value directly if it's controlled.
            // But the code below sets state:
            // setPortfolioTotalValue(event.target.value);
            // So we should build the new value string.

            let newValue = formattedValue;
            if (lastCharIsAdot) newValue += ".";
            setPortfolioTotalValue(newValue);
            const float_value = parseFloat(newValue.replace(/,/g, ''));
            setFormatPortfolioValue(float_value);
        }
        setShowTooltip(true);
    }



    const handleDateChange = (date: Date | null) => {
        setProtectionPeriodDate(date);
    };
    const fetchData = React.useCallback(async (portfolioValue: number, portfolioName: string) => {
        setBdOpen(true);
        setDataLoaded(false);
        if (portfolioValue !== null) {
            const raw = JSON.stringify({
                portfolio_name: portfolioName,
                portfolio_value: portfolioValue,
                protection_period: moment(protectionPeriodDate).format('YYYY-MM-DD'),
            });
            try {
                // const formattedDate = moment(protectionPeriodDate).format('YYYY-MM-DD');
                const [vixData, MarketShieldData] = await Promise.all([
                    FetchRiskData(),
                    FetchMarketShield(raw)
                ]);
          
                if (MarketShieldData?.ProtPort) {
                    const updatedPortfolioRows = MarketShieldData.ProtPort.map((asset: AnyRecord) => [
                        asset.Ticker || "N/A",
                        asset.Name || "N/A",
                        (asset.Weight * 100).toFixed(2) + "%",
                        asset.mutual_fund_ticker || "N/A",
                        asset.mutual_fund_name || "N/A",
                        Number(addZeroes(Number(parseFloat(asset['Market Value']).toFixed(2)))).toLocaleString("en-US", currObj)
                    ]);

                    setPortfolioRows(updatedPortfolioRows);
                }
                setShieldData(MarketShieldData);
                setVIXData(vixData);
                // Use the returned vixData (instead of VIXData state which may not be updated yet)
                const monthData = vixData?.["1_month"]?.["risk_value"];
                if (monthData && Array.isArray(monthData["closeprice"]) && monthData["closeprice"].length > 0) {
                    const lastClosePrice = monthData["closeprice"][monthData["closeprice"].length - 1];
                    const status: AnyRecord = GetRiskHeaderColor(lastClosePrice) || {};
                    setMesgHeader(status["status_text"] || "");
                    setHeaderColor((status["color_hash"] as string) || "");
                    setMesgDscUp(status["status_description_up"] || "");
                    setMesgDscDown(status["status_description_down"] || "");
                }
                setBdOpen(false);
                setDataLoaded(true);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setBdOpen(false);
                setPopupMessage("Unable to fetch the data. Please try again later");
                setPopupState(true);
                setPopupTitle("Error");
                setAlertType("Error");
                setDataLoaded(false);
            }
        } else {
            setPortfolioTotalValue("0");
            setBdOpen(false);
            setPopupMessage("Please enter valid value to proceed");
            setPopupState(true);
            setPopupTitle("Error");
            setAlertType("Error");
        }
    }, [protectionPeriodDate, currObj]);

    // Trigger the API call when the portfolio, portfolio value, or the protection period date changes.
    useEffect(() => {
        if (portfolio !== 'Manual Portfolio') {
            fetchData(FormatPortfolioValue, portfolio);
        } else {
            setBdOpen(false);
            setShowcollapse(true);
        }
    }, [portfolio, protectionPeriodDate, fetchData, FormatPortfolioValue]);



    const addToIndexPuts = React.useCallback((indexOptions: AnyRecord) => {
        if (!indexOptions) return;

        const existingHoldings = JSON.parse(sessionStorage.getItem('existingOptionHoldings') || '{}') || {};
        existingHoldings['indexPuts'] = {};

        const { SecDesc, Strike, ConQty, ExpirationDate, LastAskPrice, LastBidPrice } = indexOptions;

        if (Array.isArray(SecDesc)) {
            SecDesc.forEach((secDescStr: string, index: number) => {
                const strikeValue = Strike[index];
                const quantity = ConQty[index];
                const askPrice = LastAskPrice[index];
                const bidPrice = LastBidPrice[index];

                if (secDescStr && strikeValue && quantity && ExpirationDate) {
                    const stockTicker = secDescStr.replace(/(\d{4}-\d{2}-\d{2}P.*)/, '');
                    const newIndexPut = {
                        stockTicker,
                        expiration_date: ExpirationDate,
                        type: 'P',
                        strike: strikeValue,
                        bid_price: bidPrice,
                        ask_price: askPrice,
                        description: secDescStr,
                        num_contracts: quantity,
                        totalValue: quantity * (askPrice || 0),
                        contractExpired: false,
                        status: "Pending Open"
                    };

                    if (!existingHoldings['indexPuts'][stockTicker]) {
                        existingHoldings['indexPuts'][stockTicker] = [];
                    }
                    const isDuplicate = existingHoldings['indexPuts'][stockTicker].some(
                        (contract: AnyRecord) =>
                            contract.expiration_date === newIndexPut.expiration_date &&
                            contract.strike === newIndexPut.strike &&
                            contract.type === newIndexPut.type &&
                            contract.num_contracts === newIndexPut.num_contracts
                    );

                    if (!isDuplicate) {
                        existingHoldings['indexPuts'][stockTicker].push(newIndexPut);
                    }
                }
            });
        }
        sessionStorage.setItem('existingOptionHoldings', JSON.stringify(existingHoldings));
    }, []);


    const setShieldState = React.useCallback((data: AnyRecord) => {
        setShield({
            protectionPeriod: shield.protectionPeriod,
            assetAllocation: data.assetAllocation,
            stdDeviation: data.stdDeviation,
            protectionLevelPercent: data.protectionLevel,
            downsideVolatility: data.downsideVolatility,
            RiskScore: data.RiskScore
        });

        // Set tooltip position
        const positionPercentage = ((data.protectionLevel * 100 - sliderMin) / (sliderMax - sliderMin)) * 100;
        setTooltipPosition(`${positionPercentage}%`);
    }, [shield.protectionPeriod, sliderMax, sliderMin]);

    const updateShield = (key: string, value: string | number) => {
        setShield(prevShield => ({
            ...prevShield,
            [key]: value
        }));
    };

    const formatCurrency = (value: number | string) => {
        return !isNaN(Number(value)) && value !== null && value !== undefined
            ? `${Number(addZeroes(Number(value))).toLocaleString("en-US", { style: "currency", currency: "USD" })}`
            : '-';
    };
    const updateTooltip = (data: AnyRecord) => {
        setTooltipContent({
            protectionLevel: (data.protectionLevel * 100).toFixed(1),
            assetAllocation: data.assetAllocation || 'N/A',
            stdDeviation: data.stdDeviation !== undefined ? data.stdDeviation.toFixed(2) : 'N/A',
            downsideVolatility: data.downsideVolatility !== undefined ? data.downsideVolatility.toFixed(2) : 'N/A',
            RiskScore: data.RiskScore || 'N/A',
        });
    };





    const renderMarketShieldTable = () => {
        if (!selectedIndexOptions || Object.keys(selectedIndexOptions).length === 0) {
            return <tr><td colSpan={6}>No Data Available</td></tr>;
        }


        const { SecDesc, Strike, ConQty, ExpirationDate, LastAskPrice, LastBidPrice } = selectedIndexOptions;

        const calculateOptionCost = (askPrice: number, quantity: number, multiplier = 100) => (askPrice || 0) * multiplier * (quantity || 1);

        if (Array.isArray(SecDesc)) {
            return SecDesc.map((desc: string, index: number) => (
                <tr key={`option-row-${index}`} style={{ fontSize: 20 }}>
                    <td>{desc || '-'}</td>
                    <td>{ConQty[index] || '-'}</td>
                    <td>{Strike[index] ? formatCurrency(Strike[index]) : '-'}</td>
                    <td>{ExpirationDate || '-'}</td>
                    <td>
                        {LastAskPrice[index] ? formatCurrency(LastAskPrice[index]) : '-'}
                        /{LastBidPrice[index] ? formatCurrency(LastBidPrice[index]) : '-'}
                    </td>
                    <td>{formatCurrency(calculateOptionCost(LastAskPrice[index], ConQty[index]))}</td>
                </tr>
            ));
        }
        return null;
    };

    const mapProtectionLevelsToValues = React.useCallback(() => {
        const findNearestStdDeviation = (protectionLevel: number) => {
            if (!shieldData?.stdev_options) return "N/A";

            let nearestStdDev = null;
            let minDifference = Infinity;

            Object.keys(shieldData.stdev_options).forEach((stdDevKey) => {
                const stdDevData = shieldData.stdev_options[stdDevKey];
                const protLevels = stdDevData?.ProtLevel || [];

                const closestProtLevel = protLevels.reduce((prev: number, curr: number) =>
                    Math.abs(curr - protectionLevel) < Math.abs(prev - protectionLevel) ? curr : prev,
                    protLevels[0]
                );

                const difference = Math.abs(closestProtLevel - protectionLevel);
                if (difference < minDifference) {
                    minDifference = difference;
                    nearestStdDev = parseFloat(stdDevKey);
                }
            });

            return nearestStdDev;
        };

        const getAssetAllocation = (protectionLevel: number) => {
            const period = Object.keys(shieldData?.ChoosenOption || {})[0];
            const optionData = shieldData?.ChoosenOption[period]?.[protectionLevel];

            if (optionData && optionData.asset_allocation) {
                return optionData.asset_allocation;
            }
            return { stock: 0, bond: 0, volatility: 0, risk_score: 0 };
        };

        if (
            !shieldData ||
            !shieldData.ChoosenOption ||
            Object.keys(shieldData.ChoosenOption).length === 0
        ) {
            return [];
        }
        const period = Object.keys(shieldData.ChoosenOption)[0];
        if (!period || !shieldData.ChoosenOption[period]) {
            return [];
        }

        const protectionLevels = Object.keys(shieldData.ChoosenOption[period])
            .map(level => parseFloat(level))
            .filter(level => level >= sliderMin / 100 && level <= sliderMax / 100);


        return protectionLevels.map(level => {
            const stdDeviation = findNearestStdDeviation(level);
            const { stock, bond, volatility, risk_score } = getAssetAllocation(level);
            const assetAllocation = `${(stock * 100).toFixed(0)}-${(bond * 100).toFixed(0)}`;
            const downsideVolatility = volatility;
            const price = shieldData.ChoosenOption[period][level]?.Cost || '-';
            const IndexOptions = shieldData.ChoosenOption[period][level] || {};
            const StockOptions = shieldData.ChoosenOption[period][level]?.StockOptions || {};
            const RiskScore = risk_score;
            const bestIndex = IndexOptions?.SecDesc?.[0]?.match(/^[A-Z]+/)?.[0] || '';

            return {
                protectionLevel: level,
                stdDeviation,
                assetAllocation,
                downsideVolatility,
                price,
                IndexOptions,
                StockOptions,
                RiskScore,
                bestIndex
            };
        });
    }, [shieldData, sliderMin, sliderMax]);

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value) / 100;
        setSliderValue(value * 100);

        const protectionLevelMap = mapProtectionLevelsToValues();
        if (protectionLevelMap.length > 0) {
            const nearestMatch = findNearestProtectionLevel(protectionLevelMap, value);

            if (nearestMatch) {
                updateTooltip(nearestMatch);
                setPrice(nearestMatch.price);
                const modifiedOptions = convertNDXSecDescToXND(nearestMatch.IndexOptions);
                const extractedTicker = modifiedOptions?.SecDesc?.[0]?.match(/^[A-Z]+/)?.[0] || '';
                if (extractedTicker && extractedTicker !== outputIndexTicker) {
                    setOutputIndexTicker(extractedTicker);
                }
                setSelectedIndexOptions(modifiedOptions || {});
                setSelectedStockOptions(nearestMatch?.StockOptions);
                updateShield("RiskScore", nearestMatch.RiskScore);
                updateShield("downsideVolatility", nearestMatch.downsideVolatility);
                setShieldState(nearestMatch);
                addToIndexPuts(modifiedOptions || {});
            }
        }
    };

    const generateFiveTicks = () => {
        const start = sliderMin / 100;
        const end = sliderMax / 100;
        const step = (end - start) / 4;

        // Generate five evenly spaced tick values and round to 0.05 for display
        return Array.from({ length: 5 }, (_, i) => {
            const tickValue = (start + i * step).toFixed(2); // Round to 2 decimals
            return parseFloat(tickValue); // Convert to number for safety
        });
    };

    // Helper function to find the nearest level with valid data
    const findNearestValidLevel = (protectionLevels: AnyRecord[], targetProtectionLevel: number, key: string) => {
        const sortedLevels = protectionLevels
            .filter(pl => pl[key] !== undefined && !isNaN(pl[key])) // Filter out invalid entries
            .sort((a, b) => Math.abs(a.protectionLevel - targetProtectionLevel) - Math.abs(b.protectionLevel - targetProtectionLevel));

        return sortedLevels.length > 0 ? sortedLevels[0][key] : 'N/A'; // Return nearest valid value or 'N/A' if none found
    };
    const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMetric(event.target.value);
    };

    const setSliderMinBasedOnStdDev = React.useCallback(() => {
        if (shieldData?.stdev_options?.["-3.0"]?.ProtLevel) {
            const protLevelAtMinus3 = shieldData.stdev_options["-3.0"].ProtLevel[0];
            if (protLevelAtMinus3) {
                setSliderMin(protLevelAtMinus3 * 100);
            }
        }
    }, [shieldData]);

    const getTooltipValue = () => {
        switch (selectedMetric) {
            case "Protection Level":
                return `${tooltipContent.protectionLevel}%`;
            case "Standard Deviation":
                return tooltipContent.stdDeviation;
            case "Asset Allocation":
                return tooltipContent.assetAllocation;
            default:
                return "N/A";
        }
    };

    const formatPercentage = (value: number) => (value ? `${(value * 100).toFixed(1)}%` : 'N/A');
    const formatDecimal = (value: number) => (value !== undefined && !isNaN(value) ? value.toFixed(2) : 'N/A');

    const renderSliderTicksForIntervals = () => {
        const intervals = generateFiveTicks();
        const protectionLevels = mapProtectionLevelsToValues();

        let tickComponent = null;

        if (selectedMetric === "Protection Level") {
            tickComponent = (
                <div className="protection-level-ticks">
                    {intervals.map((interval, index) => {
                        const tick = protectionLevels.find((pl: AnyRecord) =>
                            pl.protectionLevel.toFixed(2) === interval.toFixed(2)
                        ) || {} as AnyRecord;
                        const leftPosition = ((interval * 100 - sliderMin) / (sliderMax - sliderMin)) * 100;
                        const protectionLabel = tick.protectionLevel !== undefined
                            ? formatPercentage(tick.protectionLevel)
                            : formatPercentage(findNearestValidLevel(protectionLevels, interval, 'protectionLevel'));
                        return (
                            <div
                                key={`protection-${index}`}
                                className="tick protection-tick"
                                style={{ left: `${leftPosition}%` }}
                            >
                                <div className="tick-label">{protectionLabel}</div>
                            </div>
                        );
                    })}
                </div>
            );
        } else if (selectedMetric === "Standard Deviation") {
            tickComponent = (
                <div className="std-dev-ticks">
                    {intervals.map((interval, index) => {
                        const tick = protectionLevels.find((pl: AnyRecord) =>
                            pl.protectionLevel.toFixed(2) === interval.toFixed(2)
                        ) || {} as AnyRecord;
                        const leftPosition = ((interval * 100 - sliderMin) / (sliderMax - sliderMin)) * 100;
                        const stdDevLabel = tick.stdDeviation !== undefined
                            ? formatDecimal(tick.stdDeviation)
                            : formatDecimal(findNearestValidLevel(protectionLevels, interval, 'stdDeviation'));
                        return (
                            <div
                                key={`stddev-${index}`}
                                className="tick std-tick"
                                style={{ left: `${leftPosition}%` }}
                            >
                                <div className="tick-label">{stdDevLabel}</div>
                            </div>
                        );
                    })}
                </div>
            );
        } else if (selectedMetric === "Asset Allocation") {
            tickComponent = (
                <div className="asset-allocation-ticks">
                    {intervals.map((interval, index) => {
                        const tick = protectionLevels.find((pl: AnyRecord) =>
                            pl.protectionLevel.toFixed(2) === interval.toFixed(2)
                        ) || {} as AnyRecord;
                        const leftPosition = ((interval * 100 - sliderMin) / (sliderMax - sliderMin)) * 100;
                        const assetAllocationLabel = tick.assetAllocation !== undefined
                            ? tick.assetAllocation
                            : 'N/A';
                        return (
                            <div
                                key={`asset-${index}`}
                                className="tick asset-tick"
                                style={{ left: `${leftPosition}%` }}
                                title={`Asset Allocation: ${assetAllocationLabel}`}
                            >
                                <div className="tick-label">{assetAllocationLabel}</div>
                            </div>
                        );
                    })}
                </div>
            );
        }

        return <div className="slider-ticks-container">{tickComponent}</div>;
    };

    const initializeNearestProtectionLevel = React.useCallback(() => {
        const protectionLevelMap = mapProtectionLevelsToValues();
        const targetLevel = 0.95;
        const nearestLevel = findNearestProtectionLevel(protectionLevelMap, targetLevel);

        if (nearestLevel) {
            if (nearestLevel.price !== '-') {
                setPrice(nearestLevel.price);
            }
            const modifiedOptions = convertNDXSecDescToXND(nearestLevel.IndexOptions);

            const extractedTicker = modifiedOptions?.SecDesc?.[0]?.match(/^[A-Z]+/)?.[0] || '';
            if (extractedTicker && extractedTicker !== outputIndexTicker) {
                setOutputIndexTicker(extractedTicker);
            }
            setSelectedIndexOptions(modifiedOptions || {});
            setSelectedStockOptions(nearestLevel.StockOptions || []);
            setSliderValue(nearestLevel.protectionLevel * 100);
            updateShield("downsideVolatility", nearestLevel.downsideVolatility);
            updateShield("RiskScore", nearestLevel.RiskScore);
            setShieldState(nearestLevel);
            updateTooltip(nearestLevel);
            addToIndexPuts(modifiedOptions || {});
            const bestIndex = nearestLevel.bestIndex;
            if (bestIndexRef.current === null) { // Set only once on first load
                bestIndexRef.current = bestIndex;
            }
        }
    }, [mapProtectionLevelsToValues, outputIndexTicker, addToIndexPuts, setShieldState]);

    useEffect(() => {
        if (shieldData && Object.keys(shieldData).length > 0) {
            initializeNearestProtectionLevel();
            setSliderMinBasedOnStdDev()
        }
    }, [shieldData, initializeNearestProtectionLevel, setSliderMinBasedOnStdDev]);

    return (
        <>
            {/* <PageLoader bdop  en={bdopen} /> */}
            <CustomPopup
                trigger={popupState}
                setTrigger={setPopupState}
                title={popupTitle}
                content={popupMessage}
                alertType={alertType}
            />
            <div className="py-6 sm:pb-16 lg:pb-[100px]  sm:pt-16 lg:space-y-16 space-y-8 bg-dots_bg bg-cover bg-center bg-no-repeat">
                <div className="banner lg:px-8">
                    <div className="container">
                        <div className="inner">
                            <div className="inner-content flex flex-col lg:flex-row lg:space-y-0 space-y-[56px]">
                                <div className="hero-left w-full flex justify-start flex-col items-start text-left">
                                    <div className="hero-text sm:space-y-8 space-y-4 text-h5 font-inter text-black-100">
                                        <h1 className="text-h1 text-black font-ivy font-semibold">
                                            Portfolio Price calculator
                                        </h1>
                                        <p>
                                            Market Shield provides advanced risk management
                                            solutions designed to protect your investments through
                                            intelligent strategies and real-time insights.{" "}
                                        </p>
                                    </div>
                                    <div className="button-area flex flex-wrap justify-start items-start lg:gap-12 gap-4 lg:mt-16 md:mt-8 mt-4">
                                        <div className="btn-link">
                                            <a href="#" role="link">
                                                Explore Market Shield Today
                                            </a>
                                        </div>
                                        <div className="btn-green">
                                            <a href="#" role="link">
                                                Sign up Today!
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  */}
                <div className="bg-dots_bg bg-cover bg-center bg-no-repeat">
                    <div className="container">
                        <div className="border-[1.5px] border-solid border-black-200 rounded-[20px] bg-white p-6 lg:p-8 space-y-6">
                            <div className="sectiondivide pb0 section-col ovv">
                                <div className="duration inputs flex justify-start 2xl:gap-8 gap-4 flex-wrap">
                                    <div className="big 2xl:w-[calc(20%-25px)] lg:w-[calc(33%-8px)] sm:w-[calc(50%-8px)] w-full border border-solid border-black-200 rounded-md p-4">
                                        <label>Explore Market Shield Today</label>
                                        <select
                                            value={portfolio}
                                            className="input-mui-lg w-[90%]"
                                            onChange={changePortfolio}
                                        >
                                            {portfoliosWithManual.map((value, i) => (
                                                <option key={i} value={value.name}>
                                                    {value.value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="2xl:w-[calc(15%-25px)]  lg:w-[calc(33%-8px)] sm:w-[calc(50%-8px)] w-full border border-solid border-black-200 rounded-md p-4">
                                        <label>Portfolio Value</label>
                                        <div className="input-container">
                                            <input
                                                type="text"
                                                className="input-gray w-[80%]"
                                                placeholder=""
                                                required
                                                onChange={handleChangeValue}
                                                value={PortfolioTotalValue}
                                                disabled={
                                                    portfolio === "Manual Portfolio" ? true : false
                                                }
                                                onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) =>
                                                    changeValue(event, (event.target as HTMLInputElement).value)
                                                }
                                            />
                                            {showTooltip && (
                                                <div className="custom-tooltip">
                                                    Please hit Enter to proceed
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="2xl:w-[calc(15%-25px)] lg:w-[calc(33%-8px)] sm:w-[calc(50%-8px)] w-full border border-solid border-black-200 rounded-md p-4">
                                        <label>Protection Period</label>
                                        <div className="input-container w-[80%]">
                                            <CustomDatePicker
                                                defaultDate={protectionPeriodDate}
                                                onDateSelect={handleDateChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="2xl:w-[calc(50%-25px)] sm:w-[calc(50%-8px)] w-full lg:flex-row flex-col border border-solid border-black-200 rounded-md p-4 bg-white-100 flex gap-4">
                                        <div className="lg:w-[28%] w-full">
                                            <label>SELECT LEVEL</label>
                                            <select
                                                value={selectedMetric}
                                                onChange={handleMetricChange}
                                                className="input-mui-lg bg-transparent"
                                            >
                                                <option value="Protection Level">
                                                    Protection Level
                                                </option>
                                                <option value="Standard Deviation">
                                                    Standard Deviation
                                                </option>
                                                <option value="Asset Allocation">
                                                    Asset Allocation
                                                </option>
                                            </select>
                                        </div>
                                        <div className="slidegroup lg:w-[72%] w-full">
                                            <div className="custom-slider-container">
                                                <input
                                                    type="range"
                                                    min={sliderMin}
                                                    max={sliderMax}
                                                    step="0.01"
                                                    value={sliderValue}
                                                    onChange={handleSliderChange}
                                                    className="custom-slider w-full bg-white"
                                                />
                                                <div
                                                    className="movable-tooltip w-fit float-left"
                                                    style={{ left: tooltipPosition }}
                                                >
                                                    <div className="tooltip-content">
                                                        {getTooltipValue()}
                                                    </div>
                                                </div>
                                                {renderSliderTicksForIntervals()}
                                            </div>

                                            {/* {renderSliderTicksForIntervals()} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sectiondivide pb0 pt0 section-col">
                                <div className="weatherstat part3">
                                    {dataLoaded && (
                                        <h4>
                                            Risk Weather is{" "}
                                            <span style={{ color: headerColor }}>{MesgHeader}</span>.
                                            {MesgDscUp}
                                            <br></br>
                                            {MesgDscDown}{" "}
                                            <a className="ai-link" href="#faq1">
                                                Learn more.
                                            </a>
                                        </h4>
                                    )}
                                </div>
                            </div>
                            <div className="sectiondivide pb0 section-col">
                                <div className="sumstates flex justify-stretch items-stretch rounded-md flex-wrap">
                                    <div className="sumvalue px-8 py-4 border border-solid border-black-200 md:w-max sm:w-1/2 w-full">
                                        <label className="text-p font-semibold uppercase">
                                            Beta / R-sq
                                        </label>
                                        <div className="value xl:text-[36px] md:text-[30px] sm:text-[28px] text-smtitle font-medium">
                                            {shieldData?.Beta || "-"} /{" "}
                                            {shieldData?.RSq ? parseInt(shieldData.RSq, 10) : "-"}%
                                        </div>
                                    </div>
                                    <div className="sumvalue px-8 py-4 border border-solid border-black-200 md:w-max sm:w-1/2 w-full">
                                        <label className="text-p font-semibold uppercase">
                                            Asset Allocation Equiv (Stock-Bond)
                                        </label>
                                        <div className="value xl:text-[36px] md:text-[30px] sm:text-[28px] text-smtitle font-medium">
                                            {shield.assetAllocation}
                                        </div>
                                    </div>
                                    <div className="sumvalue px-8 py-4 border border-solid border-black-200 md:w-max sm:w-1/2 w-full">
                                        <label className="text-p font-semibold uppercase">
                                            Protection Level
                                        </label>
                                        <div className="value xl:text-[36px] md:text-[30px] sm:text-[28px] text-smtitle font-medium">
                                            {(shield.protectionLevelPercent * 100).toFixed(0)}%
                                        </div>
                                    </div>
                                    <div className="sumvalue px-8 py-4 border border-solid border-black-200 md:w-max sm:w-1/2 w-full">
                                        <label className="text-p font-semibold uppercase">
                                            Downside Vol
                                        </label>
                                        <div className="value xl:text-[36px] md:text-[30px] sm:text-[28px] text-smtitle font-medium">
                                            {parseFloat(shield?.downsideVolatility).toFixed(2) ||
                                                "-"}
                                        </div>
                                    </div>
                                    <div className="sumvalue px-8 py-4 bg-white-100 md:w-max sm:w-1/2 w-full">
                                        <label className="text-p font-semibold uppercase text-purple">
                                            Price
                                        </label>
                                        <div className="value xl:text-h2 md:text-[30px] sm:text-[28px] text-smtitle font-medium text-purple">
                                            {price !== "-"
                                                ? ` ${formatCurrency(price)}`
                                                : "No Price Available"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sectiondivide pb0 section-col">
                                <div className="collapse">
                                    <h4 className="font-p font-semibold uppercase mb-2">
                                        Market Shield
                                    </h4>
                                    <div className="tablecon portfolioinp overflow-x-auto">
                                        <table className="tikerdata table-fixed min-w-full">
                                            <thead className="text-left bg-white-100">
                                                <tr className=" *:px-4 *:py-2">
                                                    <th>Ticker</th>
                                                    <th>Quantity</th>
                                                    <th>Strike Price</th>
                                                    <th>Expiration Date</th>
                                                    <th>Ask Price / Bid Price</th>
                                                    <th>Market Shield Cost</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-left pt-2">
                                                {renderMarketShieldTable()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="sectiondivide pt0 pb0 section-col">
                                <PortfolioDetailsTable PortfolioRows={PortfolioRows} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
