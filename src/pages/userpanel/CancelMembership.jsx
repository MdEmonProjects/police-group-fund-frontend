
import { Buffer } from 'buffer';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../../features/userPanel/userInfo/userInfoQuerySlice';
import { formatToDDMMYYYY } from '../../utils/dateFormat';
import useTranslate from '../../utils/Translate';
import Button from '../../components/Button/Button';
export default function CancelMembership() {

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

        </div>
    );
}



