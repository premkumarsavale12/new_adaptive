"use client"

import React, { useState } from "react"

import VixDial from "@/app/(frontend)/VixDial/VixDial"
import VixGraph from "@/app/(frontend)/VIXGraph/VIXGraph"
import AddUser from "@/app/(frontend)/AddUser/AddUser"

interface RiskWeatherProps {
    VixClosePrice: number
    headerColor: string
    MesgHeader: string
    DialColor: string
    MesgDscUp: string
    MesgDscDown: string
    option: { label: string; value: string; content: string }[]
    selectedPeriod: string
    selectedPeriodContent: string
    GraphData: { date: string; value: number }[] // safer typing
    vixData: { closeprice: number[]; tradedate: string[] } // exact structure
    MesgStatus?: string
    MesgContent: string
    updates: { dailyUpdates: boolean; statusUpdates: boolean } // safer typing
    changePeriod: (value: string, content: string) => void
    handleUpdatesChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    changePropsStatus: (updates: { dailyUpdates: boolean; statusUpdates: boolean }) => void
}


// Utility function for formatting numbers
const addZeroes = (num: number) => (num ? num.toFixed(2) : "0.0")
const DEFAULT_OPTIONS = [
    // { label: "1D", value: "1d", content: "one day" },
    // { label: "5D", value: "5d", content: "five days" },
    { label: '1 Week', value: " 1 week", content: "One Week " },
    { label: "1 Month", value: "1 month", content: "one month" },
    { label: "3 Months", value: "3 months", content: "three month" },
    { label: "6 Months", value: "6 months", content: "six months" },
    { label: "1 Year", value: "1 year", content: "one year" },
    // { label: "5Y", value: "5y", content: "five years" },
    // { label: "Max", value: "max", content: "maximum" },
]

const RiskWeather: React.FC<Partial<RiskWeatherProps>> = (props) => {
    // Local state for when props are not provided (e.g., when used as a block)
    const [localSelectedPeriod, setLocalSelectedPeriod] = useState("1m")
    const [localSelectedPeriodContent, setLocalSelectedPeriodContent] = useState("one month")
    const [localUpdates, setLocalUpdates] = useState<{ dailyUpdates: boolean; statusUpdates: boolean }>({
        dailyUpdates: false,
        statusUpdates: false,
    })


    const {
        VixClosePrice = 0,
        headerColor = "#60034c",
        MesgHeader = "",
        DialColor = "#60034c",
        MesgDscUp = "",
        MesgDscDown = "",
        option = DEFAULT_OPTIONS,
        selectedPeriod = localSelectedPeriod,
        selectedPeriodContent = localSelectedPeriodContent,
        GraphData = [],
        vixData = { closeprice: [], tradedate: [] },
        MesgStatus = "Normal",
        MesgContent = "",
        updates = localUpdates,
        changePeriod,
        handleUpdatesChange,
        changePropsStatus,
    } = props

    const internalChangePeriod = (value: string, content: string) => {
        if (changePeriod) {
            changePeriod(value, content)
        } else {
            setLocalSelectedPeriod(value)
            setLocalSelectedPeriodContent(content)
        }
    }

    const internalHandleUpdatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (handleUpdatesChange) {
            handleUpdatesChange(e)
        } else {
            const { name, checked } = e.target
            setLocalUpdates((prev) => ({ ...prev, [name]: checked }))
        }
    }

    const internalChangePropsStatus = (updates: { dailyUpdates: boolean; statusUpdates: boolean }) => {
        if (changePropsStatus) {
            changePropsStatus(updates)
        }
    }


    return (
        <div className="risk-cell bg-dots_bg bg-cover bg-center bg-no-repeat py-6 sm:py-[50px] lg:py-[64px]">
            <div className="container">
                <div className="banner bg-dots_bg bg-cover bg-center bg-no-repeat">
                    <div className="container">
                        <div className="inner">
                            <div className="inner-content flex flex-col lg:flex-row lg:space-y-0 space-y-[56px]">
                                <div className="hero-left w-full flex justify-start flex-col items-start text-left">
                                    <div className="hero-text sm:space-y-8 space-y-4 text-h5 font-inter text-black-100">
                                        <h1 className="text-h1 text-black font-ivy font-semibold">Secure Your Portfolio with Confidence.</h1>
                                        <p>
                                            Market Shield provides advanced risk management solutions designed to protect your investments
                                            through intelligent strategies and real-time insights.
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

                <VixDial
                    VixClosePrice={addZeroes(Number(VixClosePrice))}
                    headerColor={headerColor}
                    MesgHeader={MesgHeader}
                    DialColor={DialColor}
                />

                <div className="weatherstat flex max-w-[1024px] flex-col justify-center items-center text-center mx-auto my-6">
                    <div className="stat !text-h3 !font-medium">
                        <h3>
                            Risk Weather is <span style={{ color: headerColor }}>{MesgHeader}</span>
                        </h3>
                    </div>
                    <p>
                        <span>
                            {MesgDscUp}
                            <br />
                            {MesgDscDown}{" "}
                            <a className="ai-link !underline !text-blue !font-bold" href="#faq1">
                                Learn more
                            </a>
                            .
                        </span>
                    </p>
                </div>

                <div className="sectiondivide sectioncol ptsec pb0">
                    <div className="sec-title flex justify-between items-center font-bold gap-6 md:flex-row flex-col mb-4">
                        <h3 className="sec-head small left text-h3 text-blue md:flex-1 flex-[100%]">
                            CBOE Volatility Index (VIX) Chart
                        </h3>
                        <span className="indicator text-h3 text-blue">{addZeroes(Number(VixClosePrice))}</span>
                    </div>
                </div>

                <div className="sectiondivide sectioncol ptsec pt0">
                    <div className="duration flex lg:gap-8 gap-3 flex-wrap">
                        {option?.map((value, i) => (
                            <button
                                className={selectedPeriod === value.value ? "selected" : ""}
                                value={value.value}
                                key={i}
                                onClick={() => internalChangePeriod(value.value, value.content)}
                            >
                                {value.label}
                            </button>
                        ))}
                    </div>

                    <div className="GraphHolder">
                        {GraphData && GraphData.length > 0 && <VixGraph GraphData={vixData} />}
                    </div>

                    <br />

                    <div className="weatherstat warning *:text-blue *:italic">
                        <p>All price quotes as of market close. Most recent price quote is for previous trading day</p>
                    </div>

                    <div className="weatherstat part2 flex flex-col justify-start">
                        <h4 className="text-h4 font-medium text-black mt-7 mb-3">
                            Risk weather is <span>{MesgStatus?.toLowerCase()}</span> relative to {selectedPeriodContent} ago.
                        </h4>
                        <p>{MesgContent}</p>
                    </div>

                    <div
                        className="signupalert p-8 bg-white flex flex-col items-center mb-6 shadow-[1px_10px_60px_rgba(0,0,0,0.06)]"
                        id="setalert"
                    >
                        <h3 className="text-h3 font-bold mb-2">Set an alert now</h3>
                        <p>We will tell you when Market Risk changes straight to your inbox.</p>

                        <div className="reminder my-3 md:flex-row flex-col">
                            <h4 className="font-bold">Daily Updates</h4>
                            <p>Receive daily email about VIX movement and its effect on protection costs</p>
                            <label className="checkcon">
                                <input
                                    type="checkbox"
                                    name="dailyUpdates"
                                    checked={updates?.dailyUpdates}
                                    onChange={internalHandleUpdatesChange}
                                />
                                <span className="checkmark absolute top-0 left-0 h-6 w-6 box-border rounded-md border border-solid border-black-100"></span>
                            </label>
                        </div>

                        <div className="reminder md:flex-row flex-col">
                            <h4 className="font-bold">Status UPDATES</h4>
                            <p>Receive an email when the Risk Weather status changes</p>
                            <label className="checkcon">
                                <input
                                    type="checkbox"
                                    name="statusUpdates"
                                    checked={updates?.statusUpdates}
                                    onChange={internalHandleUpdatesChange}
                                />
                                <span className="checkmark absolute top-0 left-0 h-6 w-6 box-border rounded-md border border-solid border-black-100"></span>
                            </label>
                        </div>

                        <AddUser
                            singupFor="risk"
                            updates={updates}
                            onChange={internalChangePropsStatus}
                            buttonText="Get Risk Alerts"
                        />
                    </div>

                    <div className="text-center">
                        <p>
                            This is NOT investment advice. Consult a licensed broker for options trading information and approvals.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RiskWeather
