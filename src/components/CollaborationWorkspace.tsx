import React, { useState } from 'react';
import { useQuran } from '../context/QuranContext';
import { KhatamCircle, KhatamMember } from '../types/quran';
import { storageService } from '../services/storageService';
import { JUZ_NAMES } from '../data/quranMetadata';
import { 
  Users, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Share2, 
  MessageSquare, 
  Calendar, 
  Sparkles,
  BookOpen,
  Send,
  UserCheck
} from 'lucide-react';

export const CollaborationWorkspace: React.FC = () => {
  const { settings, showToast, profile } = useQuran();

  const [circles, setCircles] = useState<KhatamCircle[]>(storageService.getKhatamCircles());
  const [selectedCircleId, setSelectedCircleId] = useState<string>(circles[0]?.id || '');
  const [newNote, setNewNote] = useState<string>('');
  const [newMemberName, setNewMemberName] = useState<string>('');
  const [showNewCircleModal, setShowNewCircleModal] = useState<boolean>(false);
  const [newCircleTitle, setNewCircleTitle] = useState<string>('');

  const activeCircle = circles.find(c => c.id === selectedCircleId) || circles[0];

  // Calculate completed Juz across all members in active circle
  const allCompletedJuz = new Set<number>();
  const assignedJuzMap: Record<number, string> = {};

  if (activeCircle) {
    activeCircle.members.forEach(m => {
      m.assignedJuz.forEach(j => { assignedJuzMap[j] = m.name; });
      m.completedJuz.forEach(j => { allCompletedJuz.add(j); });
    });
  }

  const completionPercentage = Math.round((allCompletedJuz.size / 30) * 100);

  // Toggle my Juz completion
  const handleToggleMyJuz = (juzNum: number) => {
    if (!activeCircle) return;
    const myMemberIdx = activeCircle.members.findIndex(m => m.name.includes('آپ') || m.name === profile.name);

    const updatedCircles = circles.map(c => {
      if (c.id !== activeCircle.id) return c;
      const updatedMembers = c.members.map((m, idx) => {
        // If assigned to current user, toggle completion
        if (m.name.includes('آپ') || m.name === profile.name || (myMemberIdx === -1 && idx === 0)) {
          const isAssigned = m.assignedJuz.includes(juzNum);
          const isDone = m.completedJuz.includes(juzNum);

          let newAssigned = [...m.assignedJuz];
          if (!isAssigned) newAssigned.push(juzNum);

          let newCompleted = isDone 
            ? m.completedJuz.filter(j => j !== juzNum) 
            : [...m.completedJuz, juzNum];

          return { ...m, assignedJuz: newAssigned, completedJuz: newCompleted };
        }
        return m;
      });
      return { ...c, members: updatedMembers };
    });

    setCircles(updatedCircles);
    storageService.saveKhatamCircles(updatedCircles);
    showToast(`پارہ ${juzNum} کی حالت اپ ڈیٹ ہو گئی`);
  };

  const handleAddNote = () => {
    if (!newNote.trim() || !activeCircle) return;
    const updated = circles.map(c => {
      if (c.id !== activeCircle.id) return c;
      return { ...c, notes: [newNote.trim(), ...c.notes] };
    });
    setCircles(updated);
    storageService.saveKhatamCircles(updated);
    setNewNote('');
    showToast('نوٹ حلقہ میں شامل کر دیا گیا');
  };

  const handleCreateCircle = () => {
    if (!newCircleTitle.trim()) return;
    const newCircle: KhatamCircle = {
      id: `khatam_${Date.now()}`,
      title: newCircleTitle.trim(),
      targetDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
      isCompleted: false,
      notes: ['خیر کے ساتھ تلاوت مکمل کرنے کی دعا'],
      members: [
        { id: 'm_owner', name: profile.name || 'آپ', avatar: '⭐', assignedJuz: [1], completedJuz: [] }
      ]
    };
    const updated = [newCircle, ...circles];
    setCircles(updated);
    setSelectedCircleId(newCircle.id);
    storageService.saveKhatamCircles(updated);
    setShowNewCircleModal(false);
    setNewCircleTitle('');
    showToast('نیا ختمِ قرآن سرکل تشکیل پا گیا ✨');
  };

  const handleShareCircleCode = () => {
    const inviteText = `السلام علیکم! میں نے قرآن کریم کا اجتماعی ختم کا دائرہ بنایا ہے: "${activeCircle?.title}". تشریف لائیں اور اپنا پارہ منتخب کریں۔ کوڈ: HALAQAH-${activeCircle?.id.substring(0, 8)}`;
    navigator.clipboard.writeText(inviteText);
    showToast('دعوت نامہ اور کوڈ کاپی ہو گیا 📋');
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 flex flex-col gap-6">
      {/* Workspace Header & Khatam Summary */}
      <div 
        className="rounded-3xl p-6 sm:p-8 border-2 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
        style={{
          borderColor: '#b48324',
          backgroundColor: settings.theme === 'dark' ? '#161b22' : '#fcf8ee'
        }}
      >
        <div className="text-right sm:text-left flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
              <Users className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase font-bold text-amber-700 dark:text-amber-400 tracking-wider">
              مشترکہ حلقہ تلاوت و مطالعہ (Quran Study Workspace)
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-['Amiri'] text-neutral-900 dark:text-neutral-100">
            {activeCircle?.title || 'اجتماعی ختمِ قرآن مجید'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-['Noto_Nastaliq_Urdu'] mt-1">
            اہل خانہ، احباب اور طلبہ کے ساتھ مل کر 30 پارے تقسیم کریں اور ختمِ قرآن کی سعادت حاصل کریں۔
          </p>
        </div>

        {/* Progress Circular Badge */}
        <div className="flex items-center gap-4">
          <div className="text-center p-4 rounded-2xl bg-amber-500/10 border border-amber-600/30">
            <span className="text-3xl font-bold font-sans text-amber-900 dark:text-amber-100 block">
              {allCompletedJuz.size} / 30
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {completionPercentage}% مکمل شدہ پارے
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowNewCircleModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md cursor-pointer transition"
            >
              <Plus className="w-4 h-4" />
              <span>نیا سرکل بنائیں</span>
            </button>

            <button
              onClick={handleShareCircleCode}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-amber-600/30 text-amber-800 dark:text-amber-200 hover:bg-amber-500/10 font-bold text-xs cursor-pointer transition"
            >
              <Share2 className="w-4 h-4" />
              <span>دعوت بھیجیں</span>
            </button>
          </div>
        </div>
      </div>

      {/* 30-Juz Interactive Visual Grid */}
      <div 
        className="rounded-3xl p-6 border-2 shadow-lg"
        style={{
          borderColor: 'rgba(180, 131, 36, 0.3)',
          backgroundColor: settings.theme === 'dark' ? '#111620' : '#fffdf9'
        }}
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-600/15">
          <h2 className="text-lg font-bold font-['Amiri'] text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <span>30 پارے (Juz 1 to 30) کی تقسیم و تکمیل کا چارٹ</span>
          </h2>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> مکمل
            </span>
            <span className="flex items-center gap-1 text-amber-600 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> زیرِ تلاوت
            </span>
            <span className="flex items-center gap-1 text-neutral-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300"></span> خالی
            </span>
          </div>
        </div>

        {/* 30 Juz Grid Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 gap-2.5">
          {JUZ_NAMES.map((juz) => {
            const isCompleted = allCompletedJuz.has(juz.number);
            const assignedTo = assignedJuzMap[juz.number];

            let cardBg = 'border-neutral-300/60 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/40 text-neutral-700 dark:text-neutral-300';
            if (isCompleted) {
              cardBg = 'border-emerald-600 bg-emerald-500/15 text-emerald-950 dark:text-emerald-100 font-bold';
            } else if (assignedTo) {
              cardBg = 'border-amber-600 bg-amber-500/15 text-amber-950 dark:text-amber-100';
            }

            return (
              <button
                key={juz.number}
                onClick={() => handleToggleMyJuz(juz.number)}
                className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between cursor-pointer hover:scale-[1.02] shadow-2xs ${cardBg}`}
                title="کلک کر کے تلاوت کی حالت اپ ڈیٹ کریں"
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10 font-bold font-sans">
                    پارہ {juz.number}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : assignedTo ? (
                    <Clock className="w-4 h-4 text-amber-600" />
                  ) : (
                    <span className="text-[10px] text-neutral-400">لیں</span>
                  )}
                </div>

                <div className="text-sm font-bold font-['Amiri'] leading-tight">
                  {juz.nameArabic}
                </div>

                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-['Noto_Nastaliq_Urdu'] mt-1 truncate">
                  {isCompleted ? '✓ پڑھ لیا' : assignedTo ? assignedTo : 'منتخب کریں'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Halaqah Members & Reflection Notes Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Members List */}
        <div 
          className="rounded-3xl p-5 border-2 shadow-sm"
          style={{
            borderColor: 'rgba(180, 131, 36, 0.3)',
            backgroundColor: settings.theme === 'dark' ? '#111620' : '#fffdf9'
          }}
        >
          <h3 className="font-bold text-base font-['Amiri'] text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-amber-600" />
            <span>حلقہ کے ارکان و تفویض شدہ پارے</span>
          </h3>

          <div className="space-y-2.5">
            {activeCircle?.members.map((m) => (
              <div 
                key={m.id}
                className="p-3 rounded-xl border border-amber-600/20 bg-amber-500/5 flex items-center justify-between text-right"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{m.avatar}</span>
                  <div>
                    <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                      {m.name}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-['Noto_Nastaliq_Urdu']">
                      پارے: {m.assignedJuz.join('، ') || 'کوئی نہیں'}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {m.completedJuz.length} مکمل
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Study Reflections Board */}
        <div 
          className="rounded-3xl p-5 border-2 shadow-sm flex flex-col justify-between"
          style={{
            borderColor: 'rgba(180, 131, 36, 0.3)',
            backgroundColor: settings.theme === 'dark' ? '#111620' : '#fffdf9'
          }}
        >
          <div>
            <h3 className="font-bold text-base font-['Amiri'] text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-600" />
              <span>مشترکہ تدبر و تاثرات بورڈ (Reflections)</span>
            </h3>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {activeCircle?.notes.map((note, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 rounded-xl bg-amber-500/10 text-xs sm:text-sm font-['Noto_Nastaliq_Urdu'] text-neutral-800 dark:text-neutral-200 leading-relaxed text-right"
                >
                  "{note}"
                </div>
              ))}
            </div>
          </div>

          {/* Add note input */}
          <div className="mt-4 pt-3 border-t border-amber-600/15 flex items-center gap-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="قرآنی آیت پر اپنا تاثر یا دعا لکھیں..."
              className="flex-1 px-3 py-2 rounded-xl border border-amber-600/30 bg-amber-500/5 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none"
            />
            <button
              onClick={handleAddNote}
              className="p-2 rounded-xl bg-amber-600 text-white hover:bg-amber-500 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* New Circle Modal */}
      {showNewCircleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div 
            className="w-full max-w-md rounded-2xl p-6 border-2 shadow-2xl flex flex-col gap-4"
            style={{
              borderColor: '#b48324',
              backgroundColor: settings.theme === 'dark' ? '#161b22' : '#fdfaf4'
            }}
          >
            <h3 className="text-lg font-bold font-['Amiri'] text-neutral-900 dark:text-neutral-100">
              نیا ختمِ قرآن سرکل بنائیں
            </h3>
            <input
              type="text"
              value={newCircleTitle}
              onChange={(e) => setNewCircleTitle(e.target.value)}
              placeholder="مثلاً: رمضان المبارک ختم قرآن، یا شفاۓ والدین..."
              className="p-3 rounded-xl border border-amber-600/30 bg-amber-500/5 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowNewCircleModal(false)}
                className="px-4 py-2 rounded-xl border border-neutral-400 text-xs font-semibold cursor-pointer"
              >
                منسوخ کریں
              </button>
              <button
                onClick={handleCreateCircle}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                تشکیل دیں
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
