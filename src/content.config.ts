import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const highlights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/highlights' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    year: z.string(),
    order: z.number(),
    description: z.string(),
    stats: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
  }),
});

const timeline = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/timeline' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    category: z.enum(['racing', 'team', 'milestone', 'personal']),
    order: z.number(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    author: z.string(),
    role: z.string(),
    order: z.number(),
  }),
});

export const collections = { highlights, timeline, testimonials };
