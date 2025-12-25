import React, { useState } from 'react';
import { hiragana, katakana, kanjiList } from './KarakterData';
import Quiz from './Quiz';

const App = () => {
  const [activeTab, setActiveTab] = useState('hiragana');

  const renderContent = () => {
    switch (activeTab) {
      case 'hiragana':
        return <GridView data={hiragana} title="Hiragana" />;
      case 'katakana':
        return <GridView data={katakana} title="Katakana" />;
      case 'kanji':
        return <GridView data={kanjiList} title="Kanji Dasar" isKanji />;
      case 'quiz':
        return <Quiz />;
      default:
        return <GridView data={hiragana} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header */}
      <nav className="bg-red-600 p-6 text-white shadow-lg">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tighter">NIHONGO<span className="font-light text-red-200 text-lg ml-1">LEARN</span></h1>
          <div className="space-x-4">
            {['hiragana', 'katakana', 'kanji', 'quiz'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize px-3 py-1 rounded transition ${activeTab === tab ? 'bg-white text-red-600 font-bold' : 'hover:bg-red-500'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-8">
        {renderContent()}
      </main>
    </div>
  );
};

const GridView = ({ data, title, isKanji }) => (
  <div>
    <h2 className="text-3xl font-bold mb-6 text-gray-700 border-b-2 border-red-200 pb-2">{title}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {data.map((item, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col items-center">
          <span className={`text-4xl mb-2 ${isKanji ? 'text-red-600' : 'text-gray-800'}`}>{item.char}</span>
          <span className="text-gray-400 text-sm font-medium">{item.romaji}</span>
          {item.meaning && <span className="text-xs text-gray-500 mt-1">{item.meaning}</span>}
        </div>
      ))}
    </div>
  </div>
);

export default App;


import React, { useState } from 'react';
import { quizQuestions } from './KarakterData';

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index) => {
    if (index === quizQuestions[current].correct) setScore(score + 1);
    
    const next = current + 1;
    if (next < quizQuestions.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="text-center bg-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold mb-4">Skor Kamu: {score} / {quizQuestions.length}</h2>
        <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-6 py-2 rounded-full">Ulangi</button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-6">{quizQuestions[current].q}</h2>
      <div className="space-y-3">
        {quizQuestions[current].a.map((opt, i) => (
          <button 
            key={i} 
            onClick={() => handleAnswer(i)}
            className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-300 transition"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;