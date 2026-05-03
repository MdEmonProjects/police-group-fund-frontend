
import { Buffer } from 'buffer';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../../features/userPanel/userInfo/userInfoQuerySlice';
import { formatToDDMMYYYY } from '../../utils/dateFormat';
import useTranslate from '../../utils/Translate';
import Button from '../../components/Button/Button';
export default function Withdraw() {
  
    return (
        <div>
            <div className="withdraw-card">
                <div className="sec-title">Request a Withdrawal</div>
                <div className="wd-info">
                    Current fund balance: <strong>৳1,12,000</strong>
                    <br />
                    You can request up to <strong>৳18,000</strong> (your total contribution).
                    <br />
                    Requests need approval from the group admin.
                </div>

                <div className="field">
                    <label>Amount (৳)</label>
                    <input
                        type="number"
                        placeholder="e.g. 5000"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>Reason for withdrawal</label>
                    <textarea
                        placeholder="e.g. Medical emergency, house repair..."
                        value={withdrawReason}
                        onChange={(e) => setWithdrawReason(e.target.value)}
                    ></textarea>
                </div>

                <p className="text-xs text-gray-400 mb-2">Quick-fill templates</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {templates.map((tpl, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setWithdrawAmount(tpl.amount);
                                setWithdrawReason(tpl.reason);
                            }}
                            className={`text-sm px-4 py-1.5 rounded-full border transition-colors duration-150
                  ${withdrawReason === tpl.reason
                                    ? "bg-emerald-50 border-emerald-700 text-emerald-900"
                                    : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {tpl.label}
                        </button>
                    ))}
                </div>
                <div className="field">
                    <label>Your bKash / Nagad number</label>
                    <input
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={withdrawNumber}
                        onChange={(e) => setWithdrawNumber(e.target.value)}
                    />
                </div>
                <button className="btn-request" onClick={submitRequest}>
                    📨 Submit Request
                </button>
            </div>
            <div className="history-card hidden">
                <div className="sec-title">Past Withdrawal Requests</div>
                <div className="tx-row">
                    <div className="tx-icon" style={{ background: "#E1F5EE" }}>
                        ✅
                    </div>
                    <div>
                        <div className="tx-name">Karim — Medical</div>
                        <div className="tx-date">March 2025 · Approved</div>
                    </div>
                    <div className="tx-amt" style={{ color: "#085041" }}>
                        −৳15,000
                    </div>
                </div>
                <div className="tx-row">
                    <div className="tx-icon" style={{ background: "#E1F5EE" }}>
                        ✅
                    </div>
                    <div>
                        <div className="tx-name">Nasrin — House repair</div>
                        <div className="tx-date">Jan 2025 · Approved</div>
                    </div>
                    <div className="tx-amt" style={{ color: "#085041" }}>
                        −৳10,000
                    </div>
                </div>
            </div>
        </div>
    );
}



