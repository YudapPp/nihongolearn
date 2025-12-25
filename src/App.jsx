import React, { useState } from 'react';
import { BookOpen, Brain, Languages, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { hiraganaData, katakanaData, kanjiData, quizData } from './data';

function App() {
  const [activeTab, setActiveTab] = useState('learn');
  const [subTab, setSubTab] = useState('hiragana');
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleQuizAnswer = (idx) => {
    if (idx === quizData[quizIndex].correct) setScore(score + 1);
    if (quizIndex + 1 < quizData.length) {
      setQuizIndex(quizIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setScore(0);
    setShowResult(false);
  };

  const currentData = subTab === 'hiragana' ? hiraganaData : subTab === 'katakana' ? katakanaData : kanjiData;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <nav className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-500 p-2 rounded-lg">
              <Languages className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">NihonGo!</span>
          </div>
          <div className="flex gap-4 sm:gap-8">
            <button onClick={() => setActiveTab('learn')} className={`flex items-center gap-2 font-semibold transition-colors ${activeTab === 'learn' ? 'text-red-500' : 'text-slate-500 hover:text-slate-800'}`}>
              <BookOpen className="w-5 h-5" /> <span className="text-sm sm:text-base">Materi</span>
            </button>
            <button onClick={() => setActiveTab('quiz')} className={`flex items-center gap-2 font-semibold transition-colors ${activeTab === 'quiz' ? 'text-red-500' : 'text-slate-500 hover:text-slate-800'}`}>
              <Brain className="w-5 h-5" /> <span className="text-sm sm:text-base">Latihan</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'learn' ? (
            <motion.div key="learn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex flex-wrap gap-2 mb-10 bg-white p-1.5 rounded-2xl border w-fit shadow-sm mx-auto sm:mx-0">
                {['hiragana', 'katakana', 'kanji'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSubTab(tab)}
                    className={`px-6 py-2.5 rounded-xl capitalize font-bold transition-all text-sm sm:text-base ${subTab === tab ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {currentData.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all text-center group"
                  >
                    <div className="text-5xl font-bold mb-3 text-slate-800 group-hover:text-red-500 transition-colors">{item.jp}</div>
                    <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">{item.ro}</div>
                    {item.mean && (
                      <div className="mt-3 pt-3 border-t border-slate-50">
                        <div className="text-[10px] text-red-500 font-black uppercase tracking-tighter leading-tight">{item.mean}</div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
              {!showResult ? (
                <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
                    <motion.div 
                      className="h-full bg-red-500" 
                      initial={{ width: 0 }}
                      animate={{ width: `${((quizIndex + 1) / quizData.length) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mb-8 mt-2">
                    <span className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                      Pertanyaan {quizIndex + 1} / {quizData.length}
                    </span>
                    <span className="text-slate-400 text-xs font-bold">Skor: {score}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-10 leading-tight text-slate-800">{quizData[quizIndex].q}</h2>
                  <div className="grid gap-4">
                    {quizData[quizIndex].a.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuizAnswer(i)}
                        className="flex items-center justify-between p-5 rounded-2xl border-2 border-slate-100 hover:border-red-400 hover:bg-red-50 transition-all text-left font-bold group bg-white shadow-sm"
                      >
                        <span className="text-slate-700 group-hover:text-red-600">{opt}</span>
                        <div className="bg-slate-100 p-1 rounded-full group-hover:bg-red-100 transition-colors">
                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-2xl text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex p-6 bg-green-100 rounded-full mb-8 text-green-600"
                  >
                    <CheckCircle2 className="w-16 h-16" />
                  </motion.div>
                  <h2 className="text-4xl font-black mb-4 text-slate-800">Latihan Selesai!</h2>
                  <div className="text-6xl font-black text-red-500 mb-4">{Math.round((score / quizData.length) * 100)}%</div>
                  <p className="text-slate-500 mb-10 font-bold">Kamu berhasil menjawab {score} dari {quizData.length} soal.</p>
                  <button 
                    onClick={resetQuiz} 
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
