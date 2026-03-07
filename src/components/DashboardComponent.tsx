import React from 'react';

export default function DashboardComponent() {
    return (
        <div className="bg-slate-50 dark:bg-slate-900 font-sans min-h-screen transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto p-4 md:p-8 lg:p-12 relative">
                <main className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-none min-h-[85vh] relative overflow-hidden">

                    {/* Sidebar */}
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
                        <nav className="h-[280px] w-[64px] rounded-full bg-indigo-500 shadow-lg flex flex-col items-center justify-center space-y-8">
                            <button className="text-white/80 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">call</span>
                            </button>
                            <button className="text-white/80 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">home</span>
                            </button>
                            <button className="text-white/80 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">chat_bubble</span>
                            </button>
                            <button className="text-white/80 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">send</span>
                            </button>
                        </nav>
                    </div>

                    {/* Header */}
                    <header className="p-8 flex items-center justify-between">
                        <div className="flex items-center space-x-12">
                            <h1 className="font-sans font-bold text-2xl tracking-tight text-slate-900 dark:text-white uppercase ml-4 lg:ml-20">Execute</h1>
                        </div>
                        <nav className="hidden md:flex items-center space-x-10 text-slate-500 dark:text-slate-400 font-medium text-sm">
                            <a className="hover:text-indigo-500 transition-colors" href="#">home</a>
                            <a className="hover:text-indigo-500 transition-colors" href="#">support</a>
                            <a className="hover:text-indigo-500 transition-colors" href="#">my account</a>
                            <button className="text-slate-900 dark:text-white">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                        </nav>
                    </header>

                    <div className="px-8 lg:pl-32 lg:pr-12 pb-12">

                        {/* Top Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                            {/* Card 1 */}
                            <div className="bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 p-8 rounded-xl shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-slate-500 dark:text-slate-400 font-medium">New Messages</h3>
                                    <span className="material-symbols-outlined text-slate-900 dark:text-white">chat</span>
                                </div>
                                <div className="text-6xl font-sans font-bold text-slate-900 dark:text-white mb-8">85</div>
                                <div className="space-y-2">
                                    <div className="flex justify-end">
                                        <span className="text-[10px] font-bold text-slate-400">75 %</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                                        <div className="bg-indigo-500 h-full rounded-full w-3/4"></div>
                                    </div>
                                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-300 mt-2">Response Rate</p>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 p-8 rounded-xl shadow-sm relative overflow-hidden">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-slate-500 dark:text-slate-400 font-medium">New Leads</h3>
                                    <span className="material-symbols-outlined text-slate-900 dark:text-white">grid_view</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-4">
                                        <div className="text-6xl font-sans font-bold text-slate-900 dark:text-white">21</div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 dark:text-slate-300 leading-tight">60 % Daily goal</p>
                                            <p className="text-[10px] font-medium text-slate-400">72 This week</p>
                                        </div>
                                    </div>
                                    <div className="relative w-32 h-32 flex items-center justify-center">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle className="text-slate-100 dark:text-slate-700" cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" strokeWidth="8"></circle>
                                            <circle className="text-indigo-500 rounded-full transition-all duration-300" style={{ strokeDashoffset: '135.7' }} cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" strokeDasharray="339.29" strokeWidth="8"></circle>
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-xs font-bold text-slate-900 dark:text-slate-200">Goal</span>
                                            <span className="text-[10px] text-slate-400">60%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 p-8 rounded-xl shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-slate-500 dark:text-slate-400 font-medium">Active Tasks</h3>
                                    <span className="material-symbols-outlined text-slate-900 dark:text-white">forum</span>
                                </div>
                                <div className="text-6xl font-sans font-bold text-slate-900 dark:text-white mb-8">42</div>
                                <div className="space-y-2">
                                    <div className="flex justify-end">
                                        <span className="text-[10px] font-bold text-slate-400">45 %</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                                        <div className="bg-indigo-500/40 h-full rounded-full w-[45%]"></div>
                                    </div>
                                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-300 mt-2">Completion Rate</p>
                                </div>
                            </div>

                        </div>

                        {/* Main Chart Area */}
                        <div className="bg-slate-50 border border-slate-100 dark:bg-slate-800/30 rounded-2xl p-6 dark:border-slate-800">
                            <div className="h-[300px] w-full relative">
                                <div className="absolute inset-0 flex flex-col justify-between py-2 text-[10px] text-slate-400 font-medium">
                                    <div className="flex items-center space-x-4"><span>125</span><div className="h-px w-full bg-slate-200 dark:bg-slate-700"></div></div>
                                    <div className="flex items-center space-x-4"><span>100</span><div className="h-px w-full bg-slate-200 dark:bg-slate-700"></div></div>
                                    <div className="flex items-center space-x-4"><span>75</span><div className="h-px w-full bg-slate-200 dark:bg-slate-700"></div></div>
                                    <div className="flex items-center space-x-4"><span>50</span><div className="h-px w-full bg-slate-200 dark:bg-slate-700"></div></div>
                                    <div className="flex items-center space-x-4"><span>25</span><div className="h-px w-full bg-slate-200 dark:bg-slate-700"></div></div>
                                    <div className="flex items-center space-x-4"><span>0</span><div className="h-px w-full bg-slate-200 dark:bg-slate-700"></div></div>
                                </div>
                                <div className="absolute inset-0 ml-12 mb-6 pointer-events-none">
                                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
                                        <path d="M0,150 Q25,100 50,120 T100,80 T150,110 T200,60 T250,140 T300,120 T350,150 T400,60 T450,140 T500,70 T550,130 T600,140 T650,80 T700,70 T750,160 T800,90 T850,100 T900,140 T950,80 T1000,110" fill="none" stroke="#6366f1" strokeWidth="2"></path>
                                        <circle cx="50" cy="120" fill="#6366f1" r="3"></circle>
                                        <circle cx="100" cy="80" fill="#6366f1" r="3"></circle>
                                        <circle cx="150" cy="110" fill="#6366f1" r="3"></circle>
                                        <circle cx="200" cy="60" fill="#6366f1" r="3"></circle>
                                        <circle cx="250" cy="140" fill="#6366f1" r="3"></circle>
                                        <circle cx="300" cy="120" fill="#6366f1" r="3"></circle>
                                        <circle cx="400" cy="60" fill="#6366f1" r="3"></circle>
                                        <circle cx="450" cy="140" fill="#6366f1" r="3"></circle>
                                        <circle cx="500" cy="70" fill="#6366f1" r="3"></circle>
                                        <circle cx="700" cy="70" fill="#6366f1" r="3"></circle>
                                        <circle cx="800" cy="90" fill="#6366f1" r="3"></circle>
                                        <circle cx="950" cy="80" fill="#6366f1" r="3"></circle>
                                    </svg>
                                </div>
                                <div className="absolute bottom-0 left-12 right-0 flex justify-between text-[10px] text-slate-400 font-medium pb-1">
                                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="absolute bottom-4 right-8">
                        <p className="text-[10px] font-bold text-slate-300 dark:text-slate-600 tracking-widest uppercase">Analytics Platform v2.4</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
