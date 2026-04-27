import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { policyContent } from '../../Data/policyContent';

const PolicyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allPolicies, setAllPolicies] = useState([]);

  useEffect(() => {
    // Get all policies as array
    const policies = Object.values(policyContent);
    setAllPolicies(policies);
    
    // Find current policy by number or id
    const currentPolicy = policyContent[slug] || policies.find(p => p.slug === slug);
    
    if (currentPolicy) {
      setPolicy(currentPolicy);
      // Find current index for navigation
      const index = policies.findIndex(p => p.slug === currentPolicy.slug);
      setCurrentIndex(index);
    }
    setLoading(false);
  }, [slug]);

  const handleNext = () => {
    if (currentIndex < allPolicies.length - 1) {
      const nextPolicy = allPolicies[currentIndex + 1];
      navigate(`/user/policy/${nextPolicy.slug}`);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevPolicy = allPolicies[currentIndex - 1];
      navigate(`/user/policy/${prevPolicy.slug}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">পাতা পাওয়া যায়নি</h2>
          <p className="text-gray-600 mb-6">আপনার অনুরোধ করা নীতিমালাটি বিদ্যমান নেই।</p>
          <Link 
            to="/user/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <span>←</span> সব নীতিমালা দেখুন
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back to all policies button */}
        <div className="mb-6">
          <Link
            to="/user/dashboard"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors font-medium group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            সব নীতিমালায় ফিরে যান
          </Link>
        </div>

        {/* Main content card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-green-700 to-green-800 px-4 sm:px-4 py-4 sm:py-4">
            <div className="flex items-center gap-3 mb-4">
             
              <span className="text-white/60 text-sm">
                {currentIndex + 1} / {allPolicies.length}
              </span>
            </div>
            <h1 className="font-bn text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {policy.title}
            </h1>
          </div>
          
          {/* Content body */}
          <div className="px-4 py-4">
            <div className="prose prose-lg max-w-none">
              {/* Format content with proper line breaks */}
              {policy.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Print and share options */}
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-4 justify-between items-center">
              <div className="flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  প্রিন্ট করুন
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('লিংক কপি করা হয়েছে!');
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  লিংক কপি করুন
                </button>
              </div>
              <div className="text-sm text-gray-500">
                সর্বশেষ আপডেট: জানুয়ারি ২০২৬
              </div>
            </div>
          </div>
        </div>

        {/* Navigation between policies */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center justify-between gap-3 px-6 py-4 rounded-xl border transition-all ${
              currentIndex === 0
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-gray-200 hover:border-green-500 hover:shadow-md text-gray-700 hover:text-green-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <div className="text-right">
              <p className="text-xs opacity-70">পূর্ববর্তী</p>
              <p className="font-medium text-sm">
                {currentIndex > 0 ? allPolicies[currentIndex - 1]?.title : 'কোনো নীতি নেই'}
              </p>
            </div>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === allPolicies.length - 1}
            className={`flex items-center justify-between gap-3 px-6 py-4 rounded-xl border transition-all ${
              currentIndex === allPolicies.length - 1
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-gray-200 hover:border-green-500 hover:shadow-md text-gray-700 hover:text-green-700'
            }`}
          >
            <div className="text-left">
              <p className="text-xs opacity-70">পরবর্তী</p>
              <p className="font-medium text-sm">
                {currentIndex < allPolicies.length - 1 
                  ? allPolicies[currentIndex + 1]?.title 
                  : 'কোনো নীতি নেই'}
              </p>
            </div>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Quick navigation dots */}
        <div className="mt-8 flex justify-center gap-2 flex-wrap">
          {allPolicies.map((item, idx) => (
            <button
              key={item.number}
              onClick={() => navigate(`/policy/${item.number}`)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-green-600 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyDetail;