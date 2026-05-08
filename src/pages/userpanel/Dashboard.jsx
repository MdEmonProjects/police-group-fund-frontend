import { Buffer } from 'buffer';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PolicySection from './PolicySection';
import { useCallback } from 'react';
import { showModal } from '../../utils/ModalControlar';
import { useGetTotalDonerQuery, useGetUserDetailsQuery } from '../../features/userPanel/userInfo/userInfoQuerySlice';
import React from 'react';

const isDashboardAllowed =
  import.meta.env.VITE_USERPANEL_DASHBOARD_PERMISSION === 'true';
const Dashboard = () => {
  console.log(isDashboardAllowed, 'isDashboardAllowed');
  const { schoolid } = useParams();
  const dispatch = useDispatch();

  const { data: doners = [] } = useGetTotalDonerQuery();
  const { data: userDetails = {} } = useGetUserDetailsQuery();
  // useGeAllReportsQuery();

  // const { schoolData } = useSelector((state) => state.studentResultPublicView);



  useEffect(() => {
    console.log("==============================");

    console.log(userDetails)
  }, [userDetails])

  const [activePage, setActivePage] = useState("home");
  const [balance, setBalance] = useState(0);
  const [taken, setTaken] = useState(0);
  const [myContrib, setMyContrib] = useState(0);
  const [paidCount, setPaidCount] = useState("0/12");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [paidStatus, setPaidStatus] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawReason, setWithdrawReason] = useState("");
  const [withdrawNumber, setWithdrawNumber] = useState("");
  const currentPaidStatus = useSelector((state) => state.dashboard.paidStatus);
  const entireState = useSelector((state) => state);
  console.log("Full Redux state:", entireState);

  const navigate = useNavigate();

  const goToProfile = (userId) => {
    navigate(`/user/profile/${userId}`);
  };
  const members = [
    { name: "Rafiq (You)", loc: "Dhaka", paid: true, av: "রা", clr: "#9FE1CB", tc: "#085041" },
    { name: "Karim", loc: "Chittagong", paid: true, av: "কা", clr: "#FAC775", tc: "#633806" },
    { name: "Nasrin", loc: "Dhaka", paid: true, av: "না", clr: "#F4C0D1", tc: "#72243E" },
    { name: "Hasan", loc: "Sylhet", paid: true, av: "হা", clr: "#B5D4F4", tc: "#0C447C" },
    { name: "Rina", loc: "Rajshahi", paid: true, av: "রি", clr: "#C0DD97", tc: "#27500A" },
    { name: "Arif", loc: "Khulna", paid: true, av: "আ", clr: "#9FE1CB", tc: "#085041" },
    { name: "Mitu", loc: "Dhaka", paid: true, av: "মি", clr: "#FAC775", tc: "#633806" },
    { name: "Sumon", loc: "Barishal", paid: true, av: "সু", clr: "#B5D4F4", tc: "#0C447C" },
    { name: "Tania", loc: "Mymensingh", paid: true, av: "তা", clr: "#F4C0D1", tc: "#72243E" },
    { name: "Raju", loc: "Cumilla", paid: false, av: "রা", clr: "#D3D1C7", tc: "#444441" },
    { name: "Shakil", loc: "Dhaka", paid: false, av: "শা", clr: "#D3D1C7", tc: "#444441" },
    { name: "Priya", loc: "Narayanganj", paid: false, av: "প্র", clr: "#D3D1C7", tc: "#444441" },
  ];

  const txs = [
    { icon: "💚", name: "You contributed", detail: "May 2025", amt: "+৳2,000", clr: "#085041", bg: "#E1F5EE" },
    { icon: "💚", name: "You contributed", detail: "April 2025", amt: "+৳2,000", clr: "#085041", bg: "#E1F5EE" },
    { icon: "🔴", name: "Karim withdrawal", detail: "March 2025 · Medical", amt: "−৳15,000", clr: "#A32D2D", bg: "#FCEBEB" },
    { icon: "💚", name: "You contributed", detail: "March 2025", amt: "+৳2,000", clr: "#085041", bg: "#E1F5EE" },
    { icon: "💚", name: "You contributed", detail: "Feb 2025", amt: "+৳2,000", clr: "#085041", bg: "#E1F5EE" },
    { icon: "🔴", name: "Nasrin withdrawal", detail: "Jan 2025 · House repair", amt: "−৳10,000", clr: "#A32D2D", bg: "#FCEBEB" },
    { icon: "💚", name: "You contributed", detail: "Jan 2025", amt: "+৳2,000", clr: "#085041", bg: "#E1F5EE" },
  ];

  useEffect(() => {
    const countUp = (setter, target, prefix = "৳") => {
      let cur = 0;
      const steps = 50;
      const inc = target / steps;
      const interval = setInterval(() => {
        cur = Math.min(cur + inc, target);
        setter(prefix + Math.round(cur).toLocaleString("en-IN"));
        if (cur >= target) clearInterval(interval);
      }, 20);
    };

    setTimeout(() => {
      countUp(setBalance, 112000);
      countUp(setTaken, 25000);
      countUp(setMyContrib, 18000);
      setPaidCount("9/12");
    }, 300);
  }, []);

  const showPage = (page) => {
    setActivePage(page);
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2800);
  };

  const markPaid = () => {
    showModal("Teacher Register", "PAYMENT_MODEL");
    // setPaidStatus(true);
    // showToast("✅ ধন্যবাদ! Your ৳2,000 payment recorded.");
  };

  const submitRequest = () => {
    const amt = parseInt(withdrawAmount);
    if (!amt || amt < 100) {
      showToast("⚠️ Please enter a valid amount");
      return;
    }
    if (amt > 18000) {
      showToast("⚠️ Exceeds your limit of ৳18,000");
      return;
    }
    showToast("📨 Request sent! Admin will review shortly.");
    setWithdrawAmount("");
    setWithdrawReason("");
    setWithdrawNumber("");
  };




  // useEffect(() => {
  //   dispatch(fetchResultFieldData(schoolid));
  // }, [dispatch, schoolid]);

  const bufferConveter = (bufferData) => {
    if (!bufferData) return '/logo.png';
    const buffer = Buffer.from(bufferData);
    return `data:image/png;base64,${buffer.toString('base64')}`;
  };
  /* ===== COMMON CLASSES (IMAGE LIKE) ===== */
  const cardClass =
    'bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center py-2';

  const titleClass = 'text-sm font-semibold text-blue-700 mt-1';


  {/* Template buttons */ }
  const templates = [
    {
      label: "Application 1 — Medical",
      amount: "15000",
      reason: "Medical emergency — need funds urgently for hospital treatment and medicine costs.",
    },
    {
      label: "Application 2 — House repair",
      amount: "10000",
      reason: "House repair — roof damage after recent storm, need funds for urgent repair work.",
    },
  ];

  const policyItems = [
    { number: "০১", title: "উদ্দেশ্য" },
    { number: "০২", title: "প্রযোজ্যতা" },
    { number: "০৩", title: "আইনগত ও প্রমাণ ভিত্তি" },
    { number: "০৪", title: "গ্রুপ পরিচিতি ও সদস্য কাঠামো" },
    { number: "০৫", title: "সদস্য নিবন্ধন" },
    { number: "০৬", title: "নির্বাহী কমিটি" },
    { number: "০৭", title: "সঞ্চয়ের উদ্দেশ্য" },
    { number: "০৮", title: "সঞ্চয় অবদান ও সময়সীমা" },
    { number: "০৯", title: "ব্যাংক হিসাব ও বিকল্প অপশন" },
    { number: "১০", title: "পেমেন্ট প্রমাণ" },
    { number: "১১", title: "বিলম্ব জরিমানা ও ধারাবাহিক বিলম্ব" },
    { number: "১২", title: "সদস্যপদ বাতিল" },
    { number: "১৩", title: "তহবিল ব্যবস্থাপনা" },
    { number: "১৪", title: "পর্যালোচনা সভা" },
    { number: "১৫", title: "সঞ্চয় মেয়াদ ও বিনিয়োগ নীতি" },
    { number: "১৬", title: "জমির মালিকানা সংক্রান্ত বিধান" },
    { number: "১৭", title: "বিনিয়োগ সুযোগ অনুসন্ধান" },
    { number: "১৮", title: "ব্যক্তিগত ব্যবহার নিষিদ্ধ" },
    { number: "১৯", title: "প্রশাসনিক নিয়ন্ত্রণ" },
    { number: "২০", title: "তহবিল নিষ্পত্তি" },
    { number: "২১", title: "বিরোধ নিষ্পত্তি" },
    { number: "২২", title: "নীতিমালা সংশোধন" },
    { number: "২৩", title: "গ্রহণযোগ্যতা" },
  ];

  return (
    <div className="app mx-auto p-4">
      <div className="nav">
        <button
          className={`nav-btn ${activePage === "home" ? "active" : ""}`}
          onClick={() => showPage("home")}
        >
          Home
        </button>
        <button
          className={`nav-btn ${activePage === "members" ? "active" : ""}`}
          onClick={() => showPage("members")}
        >
          Members
        </button>
        <button
          className={`nav-btn ${activePage === "withdraw" ? "active" : ""}`}
          onClick={() => showPage("withdraw")}
        >
          Withdraw
        </button>
        <button
          className={`nav-btn ${activePage === "history" ? "active" : ""}`}
          onClick={() => showPage("history")}
        >
          History
        </button>
        <button
          className={`nav-btn ${activePage === "policy" ? "active" : ""}`}
          onClick={() => showPage("policy")}
        >
          Policy
        </button>
      </div>

      {/* HOME PAGE */}
      <div className={`page ${activePage === "home" ? "active" : ""}`} id="page-home">
        <div className="hero">
          <div className="hero-top">
            <h2>
              বন্ধু তহবিল<small>Friends Mutual Fund · 12 Members  </small>
            </h2>
            <Link to={"/user/profile"} className="badge-you">👤 You: {userDetails?.name}</Link>
          </div>
          <div className="hero-nums">
            <div className="hn">
              <div className="hn-val">{balance}</div>
              <div className="hn-lbl">Total Balance</div>
            </div>
            <div className="hn">
              <div className="hn-val">{paidCount}</div>
              <div className="hn-lbl">Paid This Month</div>
            </div>
            <div className="hn">
              <div className="hn-val">{taken}</div>
              <div className="hn-lbl">Total Withdrawn</div>
            </div>
          </div>
        </div>

        <div className="sgrid">
          <div className="scard">
            <div className="scard-top">
              <div className="scard-icon" style={{ background: "#E1F5EE" }}>
                💰
              </div>
              <div className="scard-lbl">Monthly Pool</div>
            </div>
            <div className="scard-val" style={{ color: "#085041" }}>
              ৳24,000
            </div>
            <div className="scard-sub" style={{ color: "#1D9E75" }}>
              12 × ৳2,000
            </div>
          </div>
          <div className="scard">
            <div className="scard-top">
              <div className="scard-icon" style={{ background: "#FAEEDA" }}>
                📅
              </div>
              <div className="scard-lbl">Your Status</div>
            </div>
            <div className="scard-val" style={{ color: "#BA7517" }}>
              Due
            </div>
            <div className="scard-sub" style={{ color: "#BA7517" }}>
              This month: ৳2,000
            </div>
          </div>
          <div className="scard">
            <div className="scard-top">
              <div className="scard-icon" style={{ background: "#E6F1FB" }}>
                📈
              </div>
              <div className="scard-lbl">You Contributed</div>
            </div>
            <div className="scard-val" style={{ color: "#185FA5" }}>
              {myContrib}
            </div>
            <div className="scard-sub" style={{ color: "#185FA5" }}>
              Over 9 months
            </div>
          </div>
          <div className="scard">
            <div className="scard-top">
              <div className="scard-icon" style={{ background: "#FCEBEB" }}>
                🤝
              </div>
              <div className="scard-lbl">Your Withdrawals</div>
            </div>
            <div className="scard-val" style={{ color: "#A32D2D" }}>
              ৳0
            </div>
            <div className="scard-sub" style={{ color: "#A32D2D" }}>
              Never withdrawn
            </div>
          </div>
        </div>

        <div className="my-status">
          <div className="sec-title">Your Account Summary</div>
          <div className="status-row">
            <span className="sl">Fixed monthly amount</span>
            <span className="sv">৳2,000</span>
          </div>
          <div className="status-row">
            <span className="sl">Months contributed</span>
            <span className="sv">9 months</span>
          </div>
          <div className="status-row">
            <span className="sl">This month (June)</span>
            <span className="pill pill-amber">⏳ Pending</span>
          </div>
          <div className="status-row">
            <span className="sl">Next due date</span>
            <span className="sv">30 June 2025</span>
          </div>
          <div className="status-row">
            <span className="sl">Can withdraw up to</span>
            <span className="sv" style={{ color: "#085041" }}>
              ৳18,000
            </span>
          </div>
        </div>

        <div className="contribute-wrap">
          <div className="contrib-label">Your fixed contribution this month</div>
          <div className="contrib-amount">৳2,000</div>
          <div className="ring-wrap">
            {
              !currentPaidStatus ? (
                <React.Fragment>
                  <div className="ring r1"></div>
                  <div className="ring r2"></div>
                  <div className="ring r3"></div>
                </React.Fragment>
              ) : null
            }

            <button
              className={currentPaidStatus ? "" : "btn-contribute"}
              onClick={markPaid}
              disabled={currentPaidStatus}
            >
              {currentPaidStatus ? "🎉 Marked as Paid!" : "✅ আমি দিয়েছি — Mark as Paid"}
            </button>
          </div>
          <div className="contrib-note">
            Tap after you transfer ৳2,000 to the group account · bKash / Nagad / Bank
          </div>
        </div>
      </div>

      {/* MEMBERS PAGE */}
      <div className={`page ${activePage === "members" ? "active" : ""}`} id="page-members">
        <div className="members-card">
          <div className="sec-title">All Members — June 2025</div>
          <div>
            {doners.map((m, i) => (
              <div key={i} className="member-row cursor-pointer hover:bg-gray-100" onClick={() => goToProfile(m.id)}>
                <div className="av" style={{ background: m.clr, color: m.tc }} >
                  {m.av}
                </div>
                <div className="minfo">
                  <div className="mname">{m?.name}</div>
                  <div className="msub">{m.phone_number}</div>
                </div>
                {/* <span className={`pill ${m.paid ? "pill-green" : "pill-red"}`}>
          
                  ⏳ Pending
                </span> */}
                <div
                  className="mpaid"
                  style={{ color: "#085041", marginLeft: "8px" }}
                >
                  {/* m.paid ? "#085041" :  */}
                  ৳2,000
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sgrid">
          <div className="scard">
            <div className="scard-top">
              <div className="scard-icon" style={{ background: "#E1F5EE" }}>
                ✅
              </div>
              <div className="scard-lbl">Collected</div>
            </div>
            <div className="scard-val mt-4" style={{ color: "#085041" }}>
              18,000 TK
            </div>
            {/* <div className="scard-sub" style={{ color: "#1D9E75" }}>
              ৳18,000 collected
            </div> */}
          </div>
          <div className="scard">
            <div className="scard-top">
              <div className="scard-icon" style={{ background: "#FCEBEB" }}>
                ⏳
              </div>
              <div className="scard-lbl">Withdraw</div>
            </div>
            <div className="scard-val mt-4" style={{ color: "#A32D2D" }}>
              6,000 TK
            </div>
            {/* <div className="scard-sub" style={{ color: "#A32D2D" }}>
              ৳6,000 remaining
            </div> */}
          </div>
        </div>
      </div>

      {/* WITHDRAW PAGE */}
      <div className={`page ${activePage === "withdraw" ? "active" : ""}`} id="page-withdraw">
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

      {/* HISTORY PAGE */}
      <div className={`page ${activePage === "history" ? "active" : ""}`} id="page-history">
        <div className="history-card">
          <div className="sec-title">Transaction History</div>
          {txs.map((t, i) => (
            <div key={i} className="tx-row">
              <div className="tx-icon" style={{ background: t.bg }}>
                {t.icon}
              </div>
              <div>
                <div className="tx-name">{t.name}</div>
                <div className="tx-date">{t.detail}</div>
              </div>
              <div className="tx-amt" style={{ color: t.clr }}>
                {t.amt}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Policy PAGE */}


      <div className={`page ${activePage === "policy" ? "active" : ""}`} id="page-policy">
        <div className="bg-white border-[0.5px] border-gray-200 rounded-[18px] py-4 px-[18px]">
          <PolicySection />
        </div>
      </div>

      <div className={`toast ${toast.show ? "show" : ""}`}>{toast.message}</div>
    </div>

  );
};

export default Dashboard;
