import OpenAI from 'openai';
import { greetingOutputSchema, type GreetingInput } from './schemas';
import { EVENT_LABELS, EVENT_ACCENTS } from './events';

function safeJsonParse(text: string): unknown {
  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch {
    // Fallback: extract the first JSON object in the text
    const first = text.indexOf('{');
    const last = text.lastIndexOf('}');
    if (first >= 0 && last > first) {
      const slice = text.slice(first, last + 1);
      return JSON.parse(slice);
    }
    throw new Error('No JSON found in model output');
  }
}

export async function generateGreeting(input: GreetingInput) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY');
  }

  const client = new OpenAI({ apiKey });

  const eventLabel = EVENT_LABELS[input.eventType];
  const accents = EVENT_ACCENTS[input.eventType];

  const instructions = `
אתה כותב ברכות בעברית לאירועים. תחזיר JSON בלבד, בלי טקסט מסביב, בלי Markdown, בלי הסברים.

מטרות:
- לכתוב ברכה ארוכה, מושקעת, אישית, מרגשת/מותאמת טון.
- התאמה למגדר המקבל, גיל, קרבה משפחתית, ושמות.
- לשלב תכונות/תחביבים/זכרונות שסופקו בצורה טבעית ולא מלאכותית.
- לפצל לפסקאות. להימנע ממשפטים חזרתיים. לא להשתמש בסימן מקף ארוך.

הברכה צריכה להתאים לאירוע: "${eventLabel}".
הצבעים המומלצים לעיצוב: ${accents.join(', ')}.

ה JSON חייב להיות בדיוק בפורמט:
{
  "title": string,
  "greetingText": string,
  "closing": string,
  "signature": string,
  "imageKeywords": string[],
  "design": { "style": string, "accentColors": string[] }
}

כללים ל imageKeywords:
- 5 עד 8 מחרוזות באנגלית
- לא לכלול שמות פרטיים
- להתמקד באובייקטים/אווירה שמתאימים לאירוע
`;

  const model = process.env.OPENAI_MODEL || 'gpt-5.2';

  const response = await client.responses.create({
    model,
    instructions,
    input: JSON.stringify(input),
  });

  const text = response.output_text;
  const raw = safeJsonParse(text);
  const parsed = greetingOutputSchema.parse(raw);

  // Ensure accents propagate even if the model forgets
  if (!parsed.design?.accentColors?.length) {
    parsed.design.accentColors = accents;
  }

  return parsed;
}
