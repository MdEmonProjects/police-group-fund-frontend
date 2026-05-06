
import { Buffer } from 'buffer';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../../features/userPanel/userInfo/userInfoQuerySlice';
import { formatToDDMMYYYY } from '../../utils/dateFormat';
import useTranslate from '../../utils/Translate';
import Button from '../../components/Button/Button';
export default function CancelMembership() {

    const [toast, setToast] = useState({ show: false, message: "" });
    const [withdrawReason, setWithdrawReason] = useState("");
    const showToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: "" }), 2800);
    };
    const submitRequest = () => {
        // const amt = parseInt(withdrawAmount);
        // if (!amt || amt < 100) {
        //     showToast("⚠️ Please enter a valid amount");
        //     return;
        // }
        // if (amt > 18000) {
        //     showToast("⚠️ Exceeds your limit of ৳18,000");
        //     return;
        // }
        showToast("📨 Request sent! Admin will review shortly.");
        // setWithdrawAmount("");
        // setWithdrawReason("");
        // setWithdrawNumber("");
    };
    return (
        <div>
            <div className="withdraw-card">
                <div className="field">
                    <label>Reason for Cancel Membership </label>
                    <textarea
                        placeholder="e.g. Medical emergency, house repair..."
                        onChange={(e) => setWithdrawReason(e.target.value)}
                    ></textarea>
                </div>

                <button className="btn-request" onClick={submitRequest}>
                    📨 Submit Request
                </button>
            </div>
            <div className={`toast ${toast.show ? "show" : ""}`}>{toast.message}</div>
        </div>
    );
}



