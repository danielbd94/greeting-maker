import { z } from 'zod';

export const greetingInputSchema = z.object({
  eventType: z.enum(['birthday', 'bar_mitzvah', 'bat_mitzvah', 'wedding', 'brit', 'brita']),
  recipient: z.object({
    name: z.string().min(1),
    gender: z.enum(['male', 'female']),
    age: z.number().int().min(0).max(130),
  }),
  sender: z.object({
    name: z.string().min(1),
    relationship: z.enum([
      'grandmother',
      'grandfather',
      'mother',
      'father',
      'aunt',
      'uncle',
      'sister',
      'brother',
      'friend',
      'partner',
    ]),
  }),
  tone: z.enum(['warm_emotional', 'classic', 'funny', 'formal']),
  length: z.enum(['short', 'medium', 'long', 'very_long']),
  traits: z.array(z.string()).max(20),
  memories: z.array(z.string()).optional(),
  religiousLevel: z.enum(['secular', 'traditional', 'religious']).optional(),
  language: z.literal('he'),
});

export const greetingOutputSchema = z.object({
  title: z.string().min(1),
  greetingText: z.string().min(1),
  closing: z.string().min(1),
  signature: z.string().min(1),
  imageKeywords: z.array(z.string()).min(1).max(12),
  design: z.object({
    style: z.string().min(1),
    accentColors: z.array(z.string()).min(1).max(6),
  }),
});

export type GreetingInput = z.infer<typeof greetingInputSchema>;
export type GreetingOutput = z.infer<typeof greetingOutputSchema>;
