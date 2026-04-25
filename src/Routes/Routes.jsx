// Routes.jsx
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { permissionsDataList } from '../Data/permissions';
import PublicLayout from '../layout/PublicLayout';
import AdmissionRegistration from '../pages/AdmissionRegistration';
import FromP from '../pages/FormP';
import NotFound from '../pages/NotFound';
import Query from '../pages/Query';
import OnlineAdmission from '../pages/public/OnlineAdmission';
import Result from '../pages/public/Result';
import ResultRequest from '../pages/public/ResultRequest';
import StudentAdmissionForm from '../pages/public/studentAddmitionForm';
import PrivateRoute from './PrivateRoute';

// Public Pages
const Login = lazy(() => import('../pages/Login'));

// Layout
import DefaultLayout from '../layout/DefaultLayout';

// Private Pages
import PaymentModal from '../components/Modals/PaymentModal';
import StudentVacationListTable from '../components/Tables/StudentVacationListTable';
import UserPanel from '../layout/UserPanel';
import AddLoginUsers from '../pages/AddLoginUsers';
import AddStudent from '../pages/AddStudent';
import AddTeacher from '../pages/AddTeacher';
import AllMaddrasahPaymentInfo from '../pages/AllMaddrasahPaymentInfo';
import AllMadrasah from '../pages/AllMadrasah';
import BalanceTransfer from '../pages/BalanceTransfer';
import Book from '../pages/Book';
import BulkImage from '../pages/BulkImage';
import CellfinPaymentConfirm from '../pages/CellfinPaymentConfirm';
import CertificateAttesation from '../pages/CertificateAttesation';
import CharacterReport from '../pages/CharacterReport';
import Class from '../pages/Class';
import ClassVideo from '../pages/ClassVideo';
import ComplaintBoxTermsAndConditions from '../pages/ComplaintBoxTermsAndConditions';
import DataExport from '../pages/DataExport';
import DeleteEditRecord from '../pages/DeleteEditRecord';
import DepositCosts from '../pages/DepositCosts';
import DepositCostsReport from '../pages/DepositCostsReport';
import AddDesignation from '../pages/Designations';
import DoesList from '../pages/DoesList';
import DonationReport from '../pages/DonationReport';
import DonorFeeDetermination from '../pages/DonorFeeDetermination';
import EnglisArobihName from '../pages/EnglisArobihName';
import Exam from '../pages/Exam';
import ExamAdmitCard from '../pages/ExamAdmitCard';
import ExamCondition from '../pages/ExamCondition';
import ExamFeeDetermine from '../pages/ExamFeeDetermine';
import ExamReport from '../pages/ExamReport';
import ExamRouting from '../pages/ExamRouting';
import ExamRules from '../pages/ExamRules';
import FeeCollection from '../pages/FeeCollection';
import FeeCollectionReport from '../pages/FeeCollectionReport';
import FeeSetting from '../pages/FeeSetting';
import GroupDistribution from '../pages/GroupDistribution';
import HomWork from '../pages/HomWork';
import Home from '../pages/Home';
import InstitutionInfo from '../pages/InstitutionInfo';
import MonthListTable from '../pages/MonthListTable';
import MonthlyDues from '../pages/MonthlyDues';
import OnlineAdmissionForUserPanel from '../pages/OnlineAdmissionForUserPanel';
import OnlineAdmissionTable from '../pages/OnlineAdmissionTable';
import OnlinePaymentInvoice from '../pages/OnlinePaymentInvoice';
import PayRole from '../pages/PayRole';
import PayRoleName from '../pages/PayRoleName';
import PaymentConfirm from '../pages/PaymentConfirm';
import PaymentHistory from '../pages/PaymentHistory';
import PointBasedResultCreateUpdate from '../pages/PointBasedResultCreateUpdate';
import PointBasedResultEntry from '../pages/PointBasedResultEntry';
import QueryManage from '../pages/QueryManage';
import QueryThree from '../pages/QueryThree';
import QueryTwo from '../pages/QueryTwo';
import RFIDCard from '../pages/RFIDCard';
import Report from '../pages/Report';
import ResultReport from '../pages/ResultReport';
import SMS from '../pages/SMS';
import Section from '../pages/Section';
import Session from '../pages/Session';
import Settings from '../pages/Settings';
import StateMent from '../pages/StateMent';
import StudentClassRoutine from '../pages/StudentClassRoutine';
import StudentClassRoutineTimeSlots from '../pages/StudentClassRoutineTimeSlots';
import StudentComplaint from '../pages/StudentComplaint';
import StudentGroupCreate from '../pages/StudentGroupCreate';
import StudentIdCardGenerate from '../pages/StudentIdCardGenerate';
import StudentIdCardPrint from '../pages/StudentIdCardPrint';
import StudentsFeeCollection from '../pages/StudentsFeeCollection';
import StudentsReport from '../pages/StudentsReport';
import TalentCondition from '../pages/TalentCondition';
import User from '../pages/User';
import UserImage from '../pages/UserImage';
import UserReports from '../pages/UserReports';
import YoutubeTutorials from '../pages/YoutubeTutorials';
import ClassResult from '../pages/public/ClassResult';
import ClassResultForm from '../pages/public/ClassResultForm';
import MadrashaHomePage from '../pages/public/MadrashaHomePage';
import MaritListForm from '../pages/public/MaritListForm';
import MaritListResult from '../pages/public/MaritListResult';
import ClassRoutine from '../pages/userpanel/ClassRoutine';
import Dashboard from '../pages/userpanel/Dashboard';
import ExamRoutine from '../pages/userpanel/ExamRoutine';
import HomeWorkHistoryUserPanel from '../pages/userpanel/HomeWorkHistoryUserPanel';
import HomeWorkUserPanel from '../pages/userpanel/HomeWorkUserPanel';
import InstitutionInfoUserPanel from '../pages/userpanel/InstitutionInfoUserPanel';
import OnlineAdmissionStudent from '../pages/userpanel/OnlineAdmissionStudent';
import OnlinePaymentInvoiceDownload from '../pages/userpanel/OnlinePaymentInvoiceDownload';
import Reports from '../pages/userpanel/Reports';
import ReportsList from '../pages/userpanel/ReportsList';
import StudentFeeUserPanel from '../pages/userpanel/StudentFeeUserPanel';
import StudentPaymentHistory from '../pages/userpanel/StudentPaymentHistory';
import StudentPaymentHistoryDetails from '../pages/userpanel/StudentPaymentHistoryDetails';
import StudentReports from '../pages/userpanel/StudentReports';
import StudentResults from '../pages/userpanel/StudentResults';
import StudentResultsView from '../pages/userpanel/StudentResultsView';
import SubjectHistoryUserPanel from '../pages/userpanel/SubjectHistoryUserPanel';
import UserForgetPassword from '../pages/userpanel/UserForgetPassword';
import UserLogin from '../pages/userpanel/UserLogin';
import UserProfile from '../pages/userpanel/UserProfile';
import UserRegistration from '../pages/userpanel/UserRegistration';
import VideoTutorialLink from '../pages/userpanel/VideoTutorialLink';
import WebsiteSettings from '../pages/userpanel/WebsiteSettings';
import PaymentCancel from '../pages/userpanel/payment/PaymentCancel';
import PaymentFail from '../pages/userpanel/payment/PaymentFail';
import OwenGuide from './OwenGuide';
import PaymentRouteGuard from './PaymentRouteGuard';
import { RequirePermission } from './RequirePermission';
import StudentAdmissionMessage from '../pages/StudentAdmissionMessage';
import UserNotice from '../pages/UserNotice';
import ForgetPassword from '../pages/ForgetPassword';
import UserPanelNotice from '../pages/userpanel/UserPanelNotice';
import SupportTicket from '../pages/SupportTicket';
import SupportTicketCreate from '../pages/SupportTicketCreate';
import SupportTicketView from '../pages/SupportTicketView';

const router = createBrowserRouter([
  {
    path: '/forget_password',
    element: <UserForgetPassword />,
  },
  {
    path: '/login',
    element: <UserLogin />,
  },
   {
    path: '/registration',
    element: <UserRegistration />,
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'general-info',
            children: [
              {
                path: 'users-info',
                element: (
                  <RequirePermission
                    permissionId={permissionsDataList.user_entry}
                  >
                    <User pageTitle="User Information" />
                  </RequirePermission>
                ),
              },
              {
                path: 'user-reports',
                element: (
                  <RequirePermission
                    permissionId={permissionsDataList.user_report}
                  >
                    <UserReports pageTitle="User Reports" />
                  </RequirePermission>
                ),
              },
              {
                path: 'all-madrasah',
                element: (
                  <OwenGuide>
                    <AllMadrasah pageTitle="All Madrasah" />
                  </OwenGuide>
                ),
              },
              {
                path: 'rfid-card',
                element: (
                  <OwenGuide>
                    <RFIDCard pageTitle="All Madrasah" />
                  </OwenGuide>
                ),
              },
              {
                path: 'sms',
                element: (
                  <RequirePermission permissionId={permissionsDataList.sms}>
                    <SMS />
                  </RequirePermission>
                ),
              },
              {
                path: 'institution-info',
                element: (
                  <RequirePermission
                    permissionId={permissionsDataList.institute_info}
                  >
                    <InstitutionInfo />
                  </RequirePermission>
                ),
              },
              {
                path: 'month-name-list',
                element: (
                  <RequirePermission
                    permissionId={permissionsDataList.month_name}
                  >
                    <MonthListTable />
                  </RequirePermission>
                ),
              },
              {
                path: 'user-image',
                element: (
                  <RequirePermission
                    permissionId={permissionsDataList.user_photo}
                  >
                    <UserImage />
                  </RequirePermission>
                ),
              },
              {
                path: 'bulk-image',
                element: (
                  <OwenGuide>
                    <BulkImage />
                  </OwenGuide>
                ),
              },
            ],
          },
          {
            path: 'students',
            children: [
              {
                index: true,
                element: (
                  <RequirePermission
                    permissionId={permissionsDataList.student_admission}
                  >
                    <AddStudent pageTitle="Add Student" />
                  </RequirePermission>
                ),
              },
              {
                path: 'sessions',
                element: (
                  <RequirePermission
                    permissionId={permissionsDataList.academic_year}
                  >
                    <Session pageTitle="Session" />
                  </RequirePermission>
                ),
              },
              {
                path: 'Class',
                element: (
                  <RequirePermission permissionId={permissionsDataList.class}>
                    <Class pageTitle="Class" />
                  </RequirePermission>
                ),
              },
              {
                path: 'section',
                element: (
                  <RequirePermission
                    permissionId={permissionsDataList.sub_class}
                  >
                    <Section pageTitle="Section" />
                  </RequirePermission>
                ),
              },
              {
                path: 'english-arobi-name',
                element: (
                  <RequirePermission
                    permissionId={
                      permissionsDataList.english_name_entry ||
                      permissionsDataList.arabic_name_entry
                    }
                  >
                    <EnglisArobihName pageTitle="English Arobi Name" />
                  </RequirePermission>
                ),
              },
              {
                path: 'book-list',
                element: (
                  <RequirePermission
                    permissionId={permissionsDataList.kitab_entry}
                  >
                    <Book pageTitle="Book" />
                  </RequirePermission>
                ),
              },
              {
                path: 'group-distribution',
                element: (
                  <RequirePermission
                    permissionId={permissionsDataList.student_group_setting}
                  >
                    <GroupDistribution pageTitle="Students Group Set" />
                  </RequirePermission>
                ),
              },
              {
                path: 'data-export',
                element: (
                  <RequirePermission
                    permissionId={permissionsDataList.student_report}
                  >
                    <DataExport pageTitle="Data Export" />
                  </RequirePermission>
                ),
              },

              {
                path: 'certificate-of-attestation',
                element: (
                  <RequirePermission
                    permissionId={permissionsDataList.certificate}
                  >
                    <CertificateAttesation pageTitle="Certificate of Attestation" />
                  </RequirePermission>
                ),
              },
              {
                path: 'report',
                element: (
                  <RequirePermission
                    permissionId={permissionsDataList.student_report}
                  >
                    <StudentsReport pageTitle="Students Report" />
                  </RequirePermission>
                ),
              },

              {
                path: 'online-admission',
                element: (
                  <RequirePermission
                    permissionId={permissionsDataList.student_admission}
                  >
                    <OnlineAdmissionTable pageTitle="Online Admission List" />
                  </RequirePermission>
                ),
              },
              {
                path: 'student-id-card',
                element: (
                  <RequirePermission
                    permissionId={permissionsDataList.student_admission}
                  >
                    <StudentIdCardPrint pageTitle="Student Id Card" />
                  </RequirePermission>
                ),
              },
              {
                path: 'student-id-card-print',
                element: (
                  <RequirePermission
                    permissionId={permissionsDataList.student_admission}
                  >
                    <StudentIdCardGenerate pageTitle="Student Id Card Print" />
                  </RequirePermission>
                ),
              },

              // {
              //   path: 'vacation/type-of-vacation',
              //   element: (
              //     // <RequirePermission permissionId={permissionsDataList.class}>
              //     <TypeOfVacation pageTitle="Class" />
              //     // </RequirePermission>
              //   ),
              // },
            ],
          },
          {
            path: 'parent-panel',
            children: [
              {
                index: true,
                element: (
                  // <RequirePermission
                  //   permissionId={permissionsDataList.teacher_info}
                  // >
                  <StudentClassRoutine pageTitle="Employee" />
                  // </RequirePermission>
                ),
              },
              {
                path: 'time-slots',
                element: (
                  // <RequirePermission permissionId={permissionsDataList.class}>
                  <StudentClassRoutineTimeSlots pageTitle="Class Video" />
                  // </RequirePermission>
                ),
              },
              {
                path: 'class-video',
                element: (
                  // <RequirePermission permissionId={permissionsDataList.class}>
                  <ClassVideo pageTitle="Class Video" />
                  // </RequirePermission>
                ),
              },
              {
                path: 'user-notice',
                element: (
                  // <RequirePermission permissionId={permissionsDataList.class}>
                  <UserNotice pageTitle="User Notice" />
                  // </RequirePermission>
                ),
              },
              {
                path: 'home-work',
                element: (
                  // <RequirePermission permissionId={permissionsDataList.class}>
                  <HomWork pageTitle="Home Work" />
                  // </RequirePermission>
                ),
              },
              {
                path: 'student-complaint',
                element: (
                  // <RequirePermission
                  //   permissionId={permissionsDataList.gate_pass_leave}
                  // >
                  <StudentComplaint pageTitle="Student Complaints" />
                  // </RequirePermission>
                ),
              },
              {
                path: 'complaint-box-terms-and-conditions',
                element: (
                  // <RequirePermission
                  //   permissionId={permissionsDataList.gate_pass_leave}
                  // >
                  <ComplaintBoxTermsAndConditions pageTitle="Complaint Box Terms and Conditions" />

                  // </RequirePermission>
                ),
              },
              {
                path: 'online-admission-message',
                element: (
                  // <RequirePermission
                  //   permissionId={permissionsDataList.gate_pass_leave}
                  // >
                  <StudentAdmissionMessage pageTitle="Online Admission Message" />

                  // </RequirePermission>
                ),
              },
              {
                path: 'online-admission',
                element: (
                  // <RequirePermission
                  //   permissionId={permissionsDataList.gate_pass_leave}
                  // >
                  <OnlineAdmissionForUserPanel pageTitle="Online Admission" />

                  // </RequirePermission>
                ),
              },
            ],
          },


        ],
      },
    ],
  },
  {
    path: '/:schoolid',
    element: <PublicLayout />,
    children: [
      { index: true, element: <MadrashaHomePage pageTitle="Result Page" /> },
      {
        path: 'student_result',
        element: <ResultRequest pageTitle="Result Page" />,
      },
      { path: 'admission-registration', element: <AdmissionRegistration /> },
      {
        path: 'students/:seassonid/:examid/:classid/:userid',
        element: <Result />,
      },
      { path: 'online_admission', element: <OnlineAdmission /> },
      { path: 'online_admission/:usercode', element: <StudentAdmissionForm /> },
      { path: 'maritlist_request', element: <MaritListForm /> },
      { path: 'maritlist/:seassonid/:examid', element: <MaritListResult /> },
      { path: 'classes', element: <ClassResultForm /> },
      { path: 'classes/:seassonid/:examid/:classid', element: <ClassResult /> },
    ],
  },
  {
    path: '/:schoolid/rg',
    element: <UserRegistration />,
  },
  {
    path: '/:schoolid/forget_pass',
    element: <UserForgetPassword />,
  },
  {
    path: '/:schoolid/login',
    element: <UserLogin />,
  },
  {
    path: '/:schoolid/dashboard',
    element: <UserPanel />,
    children: [
      {
        index: true,
        element: <Dashboard pageTitle="Dashboard" />,
      },
      {
        path: 'user_reports',
        element: <StudentReports pageTitle="Student Reports" />,
      },
      {
        path: 'student-payment-history',
        element: <StudentPaymentHistory pageTitle="Student Payment History" />,
      },
      {
        path: 'student-payment-history/:id',
        element: (
          <StudentPaymentHistoryDetails pageTitle="Student Payment History Details" />
        ),
      },
      {
        path: 'profile-details',
        element: <UserProfile pageTitle="Student Payment History Details" />,
      },
      {
        path: 'student-results',
        element: <StudentResults pageTitle="Student Results" />,
      },
      {
        path: 'student-results/:examId/:subClassId/:sessionId/:userId',
        element: <StudentResultsView pageTitle="Student Results View" />,
      },
      {
        path: 'exam-routine',
        element: <ExamRoutine pageTitle="Exam Routine" />,
      },
      {
        path: 'online-admission',
        element: <OnlineAdmissionStudent pageTitle="Online Admission" />,
      },
      {
        path: 'institution-contact',
        element: <InstitutionInfoUserPanel pageTitle="Institution Contact" />,
      },
      {
        path: 'reports',
        element: <Reports pageTitle="Teacher Contact" />,
      },
      {
        path: 'reports-list',
        element: <ReportsList pageTitle="Reports List" />,
      },
      {
        path: 'notice',
        element: <UserPanelNotice pageTitle="Notice List" />,
      },
      {
        path: 'class-routine',
        element: <ClassRoutine pageTitle="Class Routine" />,
      },
      {
        path: 'video-tutorial',
        element: <VideoTutorialLink pageTitle="Video Tutorial" />,
      },
      {
        path: 'home-work',
        element: <HomeWorkUserPanel pageTitle="Home Work" />,
      },
      {
        path: 'home-work-history',
        element: <HomeWorkHistoryUserPanel pageTitle="Home Work History" />,
      },
      {
        path: 'home-work-history/:subjectName',
        element: <SubjectHistoryUserPanel pageTitle="Subject History" />,
      },
      {
        path: 'monthly-fee',
        element: <StudentFeeUserPanel pageTitle="Month Fee" />,
      },
      // {
      //   path: 'payment-success',
      //   element: <PaymentSuccess pageTitle="Payment Success" />,
      // },
      {
        path: 'payment-fail',
        element: <PaymentFail pageTitle="Payment Fail" />,
      },
      {
        path: 'payment-cancel',
        element: <PaymentCancel pageTitle="Payment Cancel" />,
      },
      {
        path: 'payment-success',
        element: <OnlinePaymentInvoiceDownload pageTitle="Payment Invoice" />,
      },
      // {
      //   path: 'all-invoices',
      //   element: <AllUserPanelInvoice pageTitle="All Invoice" />,
      // },
    ],
  },
  {
    path: '/formp',
    element: <FromP />,
  },
  {
    path: '/query',
    element: <Query />,
  },
  {
    path: '/query-two',
    element: <QueryTwo />,
  },
  {
    path: '/query-three',
    element: <QueryThree />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
