import { Button } from '@/components/ui/button';
import { ShieldCheckIcon, BadgeCheckIcon, PhoneCallIcon } from 'lucide-react';

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: (topic?: string) => void;
  micError?: string | null;
  hasEnded?: boolean;
}

export const WelcomeView = ({
  onStartCall,
  micError,
  hasEnded,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {

  if (hasEnded) {
    return (
      <div ref={ref} className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Consultation Completed</h2>
          <p className="text-gray-600 mb-8">
            The voice call session has ended. You can start a new consultation below.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 flex justify-center items-center gap-2 text-sm font-semibold text-gray-700">
            <span>⏱</span> Call Duration: 1 minutes 52 seconds
          </div>
          <Button 
            onClick={() => onStartCall()}
            className="w-full h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-lg rounded-md"
          >
            Start New Voice Call
          </Button>
          <button className="mt-4 text-sm text-gray-500 hover:text-gray-800 font-medium underline-offset-4 hover:underline">
            Return to Home Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto px-4 py-8">
      {micError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎤</span>
            <div>
              <h3 className="font-bold text-red-900">Microphone Access Required</h3>
              <p className="text-sm text-red-700">{micError}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => window.location.reload()} className="border-red-200 text-red-700 bg-white">
            Refresh
          </Button>
        </div>
      )}

      {/* Hero Card */}
      <div className="bg-white border-l-[6px] border-l-[#FF9933] border border-gray-200 shadow-sm rounded-r-lg p-8 md:p-12 mb-8 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0c2f4c] mb-4 leading-tight">
            Discover Welfare Schemes & Prevent Digital Scams via Voice AI
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl">
            Start an encrypted voice call with our AI citizen advisor to ask queries in Hindi, English, and regional languages. Zero registration or login details required.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded border border-gray-200 text-sm font-semibold text-gray-700">
              <ShieldCheckIcon className="w-4 h-4 text-blue-600" /> 100% Secure
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded border border-gray-200 text-sm font-semibold text-gray-700">
              <BadgeCheckIcon className="w-4 h-4 text-green-600" /> Verified Scheme Data
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded border border-gray-200 text-sm font-semibold text-gray-700">
              <PhoneCallIcon className="w-4 h-4 text-red-500" /> Direct Helpline Links
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 relative">
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
          <button 
            onClick={() => onStartCall()}
            className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-white border border-gray-100 shadow-xl flex flex-col items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 group"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#1B5E20] text-white flex items-center justify-center shadow-inner group-hover:bg-[#2E7D32] transition-colors">
              <svg className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </div>
            <span className="text-[10px] md:text-xs font-bold text-gray-500 tracking-wider">CLICK TO START CALL</span>
          </button>
        </div>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: "🏛️", title: "Government Schemes", desc: "Search criteria, documents, and application guides for welfare schemes." },
          { icon: "🚨", title: "Fraud Prevention", desc: "UPI collect scam warnings, OTP protection tips, and phishing safety." },
          { icon: "💰", title: "Financial Literacy", desc: "Basic savings guides, direct benefit transfer (DBT) linking details." },
          { icon: "📞", title: "Complaint Helplines", desc: "Step-by-step reporting to RBI Ombudsman or Cyber Crime Portal." },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-gray-50 rounded flex items-center justify-center text-xl mb-4 border border-gray-100">
              {feature.icon}
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
