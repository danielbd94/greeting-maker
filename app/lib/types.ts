export type EventType =
  | 'birthday'
  | 'bar_mitzvah'
  | 'bat_mitzvah'
  | 'wedding'
  | 'brit'
  | 'brita';

export type Gender = 'male' | 'female';

export type Relationship =
  | 'grandmother'
  | 'grandfather'
  | 'mother'
  | 'father'
  | 'aunt'
  | 'uncle'
  | 'sister'
  | 'brother'
  | 'friend'
  | 'partner';

export type Tone = 'warm_emotional' | 'classic' | 'funny' | 'formal';
export type Length = 'short' | 'medium' | 'long' | 'very_long';

export interface GreetingInput {
  eventType: EventType;
  recipient: {
    name: string;
    gender: Gender;
    age: number;
  };
  sender: {
    name: string;
    relationship: Relationship;
  };
  tone: Tone;
  length: Length;
  traits: string[];
  memories?: string[];
  religiousLevel?: 'secular' | 'traditional' | 'religious';
  language: 'he';
}

export interface GreetingOutput {
  title: string;
  greetingText: string;
  closing: string;
  signature: string;
  imageKeywords: string[];
  design: {
    style: string;
    accentColors: string[];
  };
}

export interface ImageResult {
  imageUrl: string | null;
  creditText: string | null;
  creditUrl: string | null;
}
