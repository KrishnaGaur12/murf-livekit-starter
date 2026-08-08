'use client';

export function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-md">
      {/* Top Header (White) */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-12 flex-col overflow-hidden rounded border border-gray-300">
              <div className="h-1/3 bg-[#FF9933]" />
              <div className="h-1/3 bg-white" />
              <div className="h-1/3 bg-[#138808]" />
            </div>
            <div>
              <div className="font-bold text-blue-900 text-lg leading-tight">Jan Sahayak AI (जन सहायक AI)</div>
              <div className="font-semibold text-xs text-gray-500 uppercase tracking-wide">Your Trusted Digital Saathi</div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded">
              <span className="cursor-pointer hover:text-black">A-</span>
              <span className="cursor-pointer hover:text-black">A</span>
              <span className="cursor-pointer hover:text-black">A+</span>
            </div>
            <select className="bg-gray-100 text-sm font-medium border border-gray-300 rounded px-2 py-1 outline-none cursor-pointer">
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </div>
      </header>
      
      {/* Main Navigation (Blue) */}
      <nav className="w-full bg-[#104068]">
        <div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <a href="#" className="border-b-4 border-[#FF9933] bg-[#0c2f4c] text-white px-4 py-3 text-sm font-bold uppercase tracking-wider">Home</a>
          <a href="#" className="text-gray-200 hover:text-white px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-[#0c2f4c]">Schemes Search</a>
          <a href="#" className="text-gray-200 hover:text-white px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-[#0c2f4c]">Fraud Prevention</a>
          <a href="#" className="text-gray-200 hover:text-white px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-[#0c2f4c]">Complaint Helpline</a>
        </div>
      </nav>
    </div>
  );
}
