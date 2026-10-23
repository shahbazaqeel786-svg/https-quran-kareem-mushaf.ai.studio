import React, { useState } from 'react';
import { useQuran } from '../context/QuranContext';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { QuizQuestion } from '../types/quran';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, 
  Trophy, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  Award,
  BookOpen
} from 'lucide-react';

export const QuizMode: React.FC = () => {
  const { settings, showToast } = useQuran();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredQuestions = QUIZ_QUESTIONS.filter(q => 
    selectedCategory === 'all' || q.category === selectedCategory
  );

  const currentQ: QuizQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch (e) {}
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCompleted(false);
    setScore(0);
    setStreak(0);
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-6 flex flex-col gap-6">
      {/* Quiz Header & Score Dashboard */}
      <div 
        className="rounded-3xl p-6 border-2 shadow-xl flex flex-wrap items-center justify-between gap-4"
        style={{
          borderColor: '#b48324',
          backgroundColor: settings.theme === 'dark' ? '#161b22' : '#fcf8ee'
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-600/15 border border-amber-600/30 flex items-center justify-center text-amber-700 dark:text-amber-300">
            <Trophy className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-['Amiri'] text-neutral-900 dark:text-neutral-100">
              مسابقہ قرآنی (Quran & Tajweed Quiz)
            </h1>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              قرآنی معلومات اور تجوید کے قواعد کی جانچ کیجیے
            </p>
          </div>
        </div>

        {/* Score & Streak Stats */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-600/20 text-center">
            <span className="text-[10px] text-neutral-500 uppercase block font-semibold">اسکور (Score)</span>
            <span className="text-lg font-bold text-amber-700 dark:text-amber-300 font-sans">
              {score} / {filteredQuestions.length}
            </span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-600/20 text-center">
            <span className="text-[10px] text-emerald-600 uppercase block font-semibold">تسلسل (Streak)</span>
            <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300 font-sans">
              {streak} 🔥
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      {!isCompleted && (
        <div className="flex flex-wrap gap-1.5 justify-center text-xs">
          {[
            { id: 'all', label: 'تمام سوالات' },
            { id: 'surah', label: 'فضائل و معلوماتِ سور' },
            { id: 'tajweed', label: 'قواعد التجوید' },
            { id: 'ayah', label: 'قرآنی احکام و آیات' },
            { id: 'prophet', label: 'قصص الانبیاء' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                handleRestartQuiz();
              }}
              className={`px-3 py-1.5 rounded-xl font-medium transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-500/10 text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Quiz Body */}
      {!isCompleted && currentQ && (
        <div 
          className="rounded-3xl p-6 sm:p-8 border-2 shadow-lg transition-all"
          style={{
            borderColor: 'rgba(180, 131, 36, 0.4)',
            backgroundColor: settings.theme === 'dark' ? '#111620' : '#fffdf9'
          }}
        >
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-semibold text-amber-800 dark:text-amber-300 mb-3">
            <span>سوال نمبر {currentIndex + 1} از {filteredQuestions.length}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15">
              {currentQ.categoryLabel}
            </span>
          </div>
          <div className="w-full bg-amber-500/10 h-2 rounded-full overflow-hidden mb-6">
            <div 
              className="bg-amber-600 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question in Urdu & English */}
          <div className="mb-6 text-center">
            <h2 
              dir="rtl"
              className="text-xl sm:text-2xl font-bold font-['Noto_Nastaliq_Urdu'] text-neutral-900 dark:text-neutral-100 leading-relaxed"
            >
              {currentQ.questionUrdu}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-sans mt-2">
              {currentQ.questionEnglish}
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.optionsUrdu.map((optUrdu, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'border-amber-600/25 bg-amber-500/5 hover:bg-amber-500/15 text-neutral-800 dark:text-neutral-200';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-600 bg-emerald-500/20 text-emerald-950 dark:text-emerald-100 font-bold ring-2 ring-emerald-500';
                } else if (isSelected) {
                  btnStyle = 'border-rose-600 bg-rose-500/20 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500';
                } else {
                  btnStyle = 'opacity-50 border-neutral-300 dark:border-neutral-700 text-neutral-400';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border-2 text-right transition-all flex items-center justify-between cursor-pointer select-none ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-amber-600/20 text-xs font-bold flex items-center justify-center font-sans">
                      {idx + 1}
                    </span>
                    <span 
                      dir="rtl"
                      className="text-base sm:text-lg font-['Noto_Nastaliq_Urdu'] font-semibold"
                    >
                      {optUrdu}
                    </span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                      ) : isSelected ? (
                        <XCircle className="w-6 h-6 text-rose-600" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner (Appears after answer) */}
          {isAnswered && (
            <div 
              dir="rtl"
              className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-600/30 text-right animate-in fade-in duration-200"
            >
              <div className="flex items-center gap-2 font-bold text-sm text-amber-900 dark:text-amber-200 mb-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>وضاحت و حوالہ:</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-['Noto_Nastaliq_Urdu'] leading-relaxed">
                {currentQ.explanationUrdu}
              </p>
              <p dir="ltr" className="text-xs text-neutral-600 dark:text-neutral-400 font-sans mt-2 pt-2 border-t border-amber-600/15">
                {currentQ.explanationEnglish}
              </p>

              {/* Next Question Button */}
              <div className="mt-4 text-left">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-md transition cursor-pointer"
                >
                  {currentIndex + 1 < filteredQuestions.length ? 'اگلا سوال →' : 'نتائج دیکھیں 🏆'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Completion Screen */}
      {isCompleted && (
        <div 
          className="rounded-3xl p-8 sm:p-12 border-2 shadow-2xl text-center flex flex-col items-center justify-center gap-4 animate-in zoom-in-95 duration-300"
          style={{
            borderColor: '#b48324',
            backgroundColor: settings.theme === 'dark' ? '#161b22' : '#fffdf9'
          }}
        >
          <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-600 flex items-center justify-center text-amber-600 animate-bounce">
            <Award className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-['Amiri'] text-neutral-900 dark:text-neutral-100">
            مبارک ہو! مسابقہ مکمل ہو گیا
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 font-['Noto_Nastaliq_Urdu'] max-w-md">
            آپ نے قرآنی کوئز کے تمام سوالات کامیابی کے ساتھ مکمل کر لیے ہیں۔
          </p>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-600/30 text-center my-2">
            <span className="text-xs text-amber-800 dark:text-amber-300 font-semibold uppercase block">
              آپ کا حتمی نتیجہ
            </span>
            <span className="text-4xl font-bold font-sans text-amber-900 dark:text-amber-100">
              {score} / {filteredQuestions.length}
            </span>
            <span className="text-xs text-emerald-600 block mt-1 font-semibold">
              {Math.round((score / filteredQuestions.length) * 100)}% درست جوابات
            </span>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-md transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>دوبارہ حل کریں</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
