'use client';

import { useMemo, useState } from 'react';
import type { GreetingInput, EventType, Gender, Relationship, Tone, Length } from '@/app/lib/types';
import { EVENT_LABELS } from '@/app/lib/events';

function splitLines(value: string): string[] {
  return value
    .split(/[,\n]/g)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 20);
}

export function GreetingForm({
  onGenerate,
  isLoading,
}: {
  onGenerate: (input: GreetingInput) => void;
  isLoading: boolean;
}) {
  const [eventType, setEventType] = useState<EventType>('bar_mitzvah');
  const [recipientName, setRecipientName] = useState('נעם');
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number>(13);
  const [senderName, setSenderName] = useState('אסתר');
  const [relationship, setRelationship] = useState<Relationship>('grandmother');
  const [tone, setTone] = useState<Tone>('warm_emotional');
  const [length, setLength] = useState<Length>('very_long');
  const [traitsText, setTraitsText] = useState('חייכן, רגיש, חרוץ, עוזר לאחרים');
  const [memoriesText, setMemoriesText] = useState('תמיד מחבק את כולם\nמשקיע בלימודים');
  const [religiousLevel, setReligiousLevel] = useState<'secular' | 'traditional' | 'religious'>('traditional');

  const previewTraits = useMemo(() => splitLines(traitsText), [traitsText]);
  const previewMemories = useMemo(() => splitLines(memoriesText), [memoriesText]);

  function submit() {
    const input: GreetingInput = {
      eventType,
      recipient: { name: recipientName.trim(), gender, age: Number(age) || 0 },
      sender: { name: senderName.trim(), relationship },
      tone,
      length,
      traits: previewTraits,
      memories: previewMemories.length ? previewMemories : undefined,
      religiousLevel,
      language: 'he',
    };

    onGenerate(input);
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="text-xl font-bold">פרטי הברכה</h2>
      <p className="mt-1 text-sm text-gray-600">
        מלא את הפרטים, לחץ יצירה, וקבל כרטיס מעוצב להדפסה.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">אירוע</span>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value as EventType)}
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2"
          >
            {Object.entries(EVENT_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium">שם מקבל הברכה</span>
          <input
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
            placeholder="למשל: נעם"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">מגדר</span>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2"
          >
            <option value="male">זכר</option>
            <option value="female">נקבה</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium">גיל</span>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
            min={0}
            max={130}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">שם השולח</span>
          <input
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
            placeholder="למשל: אסתר"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">קרבה משפחתית</span>
          <select
            value={relationship}
            onChange={(e) => setRelationship(e.target.value as Relationship)}
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2"
          >
            <option value="grandmother">סבתא</option>
            <option value="grandfather">סבא</option>
            <option value="mother">אמא</option>
            <option value="father">אבא</option>
            <option value="aunt">דודה</option>
            <option value="uncle">דוד</option>
            <option value="sister">אחות</option>
            <option value="brother">אח</option>
            <option value="friend">חבר/ה</option>
            <option value="partner">בן/בת זוג</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium">טון</span>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as Tone)}
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2"
          >
            <option value="warm_emotional">חם ומרגש</option>
            <option value="classic">קלאסי</option>
            <option value="funny">מצחיק</option>
            <option value="formal">רשמי</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium">אורך</span>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value as Length)}
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2"
          >
            <option value="short">קצר</option>
            <option value="medium">בינוני</option>
            <option value="long">ארוך</option>
            <option value="very_long">ארוך מאוד</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium">אופי ותכונות (מופרד בפסיק או שורה)</span>
          <textarea
            value={traitsText}
            onChange={(e) => setTraitsText(e.target.value)}
            className="mt-1 h-24 w-full rounded-xl border border-gray-300 px-3 py-2"
          />
          <p className="mt-1 text-xs text-gray-500">נשתמש ב {previewTraits.length} תכונות.</p>
        </label>

        <label className="block">
          <span className="text-sm font-medium">זכרונות/דוגמאות (אופציונלי)</span>
          <textarea
            value={memoriesText}
            onChange={(e) => setMemoriesText(e.target.value)}
            className="mt-1 h-24 w-full rounded-xl border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-medium">רמת מסורת (אופציונלי)</span>
          <select
            value={religiousLevel}
            onChange={(e) => setReligiousLevel(e.target.value as any)}
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2"
          >
            <option value="secular">חילוני</option>
            <option value="traditional">מסורתי</option>
            <option value="religious">דתי</option>
          </select>
        </label>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={submit}
          disabled={isLoading}
          className="rounded-xl bg-black px-5 py-2.5 text-white disabled:opacity-50"
        >
          {isLoading ? 'יוצר...' : 'יצירת ברכה'}
        </button>

        <p className="text-sm text-gray-600">
          כדי לעבוד עם תמונות, הוסף מפתח UNSPLASH_ACCESS_KEY בקובץ env.
        </p>
      </div>
    </div>
  );
}
