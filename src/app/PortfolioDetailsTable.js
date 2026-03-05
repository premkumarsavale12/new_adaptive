import { useState } from 'react';

function PortfolioDetailsTable({ PortfolioRows }) {
    const [showcollapse, setShowcollapse] = useState(false);
    return (
        <>
            <div className="collapse space-y-2">
                <h4 className="flex text-body text-purple p-4 bg-[#F4DFF0] justify-between items-center font-medium" onClick={() => setShowcollapse(!showcollapse)}>Portfolio Details {showcollapse && <span className="minus border border-solid w-6 h-6 border-purple rounded-full flex justify-center items-center">-</span>} {!showcollapse && <span className="border border-solid w-6 h-6 border-purple rounded-full flex justify-center items-center">+</span>}</h4>
                {showcollapse && <div className="tablecon portfolioinp">
                    <div  className="overflow-x-auto">
                    <table className='table-fixed min-w-full'>
                        <thead className='text-left bg-white-100'>
                            <tr className=' *:px-4 *:py-2'>
                                <th>Symbol</th>
                                <th className="bigth">Name</th>
                                <th>Allocation</th>
                                <th>Mutual Fund</th>
                                <th className="bigth">Mutual Fund Name</th>
                                <th className="bigth">Market Value</th>
                            </tr>
                        </thead>
                        <tbody className='text-left pt-2'>
                            {PortfolioRows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}><input className="input-gray" disabled={true} placeholder={cell}></input></td>
                                    ))}
                                </tr>
                            ))}
                              {/* <tr className='*:px-4 *:py-2 border-collapse *:border *:border-solid *:border-white-100'>
                                    <td>Data 1</td>
                                    <td>Data 2</td>
                                    <td>Data 3</td>
                                    <td>Data 1</td>
                                    <td>Data 2</td>
                                    <td>Data 3</td>
                                </tr> */}
                           
                        </tbody>
                        {/* <tfoot>
                                    <tr>
                                        <td colSpan="5"><button className="ai-btn secondary solid">Recalculate</button><span className="infowarning"><img src="/app/Assets/warn.svg"/>Press Recalculate in order to view results for updated portfolio contents</span></td>
                                    </tr>  
                                </tfoot> */}
                    </table>
                    </div>
                   
                </div>}
            </div>
        </>
    );
};

export default PortfolioDetailsTable;