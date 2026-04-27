import { Link } from 'react-router-dom';
import { policyContent } from '../../Data/policyContent';

const PolicySection = () => {
  const policyItems = Object.values(policyContent);

  return (
    <section className="bg-forest-900" id="policy">
      <div className="max-w-6xl mx-auto">
            <span className="text-[#212529] text-xs font-bold tracking-widest uppercase">নীতিমালা ও বিধিমালা</span>
            <h2 className="font-bn text-3xl font-bold text-[#212529] mt-2 mb-3">তহবিলের সম্পূর্ণ নীতিমালা</h2>
            <p className="text-[#212529] text-lg mb-10 max-w-xl">আমাদের তহবিল ২৩টি সুনির্দিষ্ট নীতির আলোকে পরিচালিত হয়। প্রতিটি বিষয়ে বিস্তারিত জানতে ক্লিক করুন।</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {policyItems.map((item) => (
            <Link
              key={item.slug}
              to={`/user/policy/${item.slug}`} // Use slug for routing
              className="flex items-center gap-3 bg-[#f5f9ff] border border-white/10 rounded-[10px] px-5 py-4 hover:bg-[#0f2a1d] hover:text-white hover:border-gold-400/40 transition-all no-underline group"
            >
              <span className="font-display text-[18px] font-semibold min-w-[28px] mt-0.5">
                {item.number}
              </span>
              <span className="font-bn text-[18px] leading-snug transition-colors">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PolicySection;