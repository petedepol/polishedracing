export type Medal = 'GOLD' | 'SILVER' | 'BRONZE' | 'WIN' | 'LEADER';
export interface Row { pos: string; rider: string; event: string; disc: string; result: string; medal: Medal; year: string; role: string; m?: number; }

// Rows are listed by importance here but SHOWN newest first (year, then month) — Pete, 8 Sep 2026: ranking them by weight reads as respecting some riders' results less.
const rows: Row[] = [
  { pos: 'P1', rider: 'Tom Pidcock', event: 'Olympic Games · Tokyo', disc: 'XCO', result: 'OLYMPIC GOLD', medal: 'GOLD', m: 7, year: '2020', role: 'British Cycling · mechanic' },
  { pos: 'P1', rider: 'Pauline Ferrand-Prévot', event: 'Olympic Games · Paris', disc: 'XCO', result: 'OLYMPIC GOLD', medal: 'GOLD', m: 7, year: '2024', role: 'INEOS · her mechanic' },
  { pos: 'P1', rider: 'Rachel Atherton', event: 'World Cup season · 7 wins from 7 + Worlds', disc: 'DH', result: 'PERFECT SEASON 8/8', medal: 'WIN', m: 9, year: '2016', role: 'Trek FR · head mechanic' },
  { pos: 'P1', rider: 'Rachel Atherton', event: 'World Championships · Lenzerheide', disc: 'DH', result: 'GOLD', medal: 'GOLD', m: 9, year: '2018', role: 'Trek FR · head mechanic' },
  { pos: 'P1', rider: 'Rachel Atherton', event: 'World Championships · Val di Sole', disc: 'DH', result: 'GOLD', medal: 'GOLD', m: 9, year: '2016', role: 'Trek FR · head mechanic' },
  { pos: 'P1', rider: 'Rachel Atherton', event: 'World Championships · Vallnord', disc: 'DH', result: 'GOLD', medal: 'GOLD', m: 9, year: '2015', role: 'GT FR · head mechanic' },
  { pos: 'P1', rider: 'Gee Atherton', event: 'World Championships · Hafjell', disc: 'DH', result: 'GOLD', medal: 'GOLD', m: 9, year: '2014', role: 'GT FR · head mechanic' },
  { pos: 'P1', rider: 'Rachel Atherton', event: 'World Championships · Pietermaritzburg', disc: 'DH', result: 'GOLD', medal: 'GOLD', m: 8, year: '2013', role: 'GT FR · head mechanic' },
  { pos: 'P1', rider: 'Mona Mitterwallner', event: 'Marathon World Championships', disc: 'XCM', result: 'GOLD', medal: 'GOLD', m: 10, year: '2023', role: 'CFR · mechanic' },
  { pos: 'P1', rider: 'Gee + Rachel Atherton', event: 'World Cup · Fort William · home double on the new GT Fury I helped develop', disc: 'DH', result: 'DOUBLE WIN', medal: 'WIN', m: 6, year: '2013', role: 'GT FR · head mechanic' },
  { pos: 'P1', rider: 'Gee + Rachel Atherton', event: 'World Cup · Cairns · double win, by 4 s and 11 s', disc: 'DH', result: 'DOUBLE WIN', medal: 'WIN', m: 4, year: '2014', role: 'GT FR · head mechanic' },
  { pos: 'P1', rider: 'Rachel Atherton', event: 'World Cup · Fort William · first ever win for Atherton Bikes, 3D-printed titanium lugs', disc: 'DH', result: 'WIN', medal: 'WIN', m: 6, year: '2019', role: 'Atherton Bikes · head mechanic' },
  { pos: 'P1', rider: 'Luca Martin', event: 'World Cup · La Thuile', disc: 'XCO', result: 'WIN · +1:07', medal: 'WIN', m: 7, year: '2026', role: 'CFR · head mechanic (crew lead)' },
  { pos: 'P1', rider: 'Luca Martin', event: 'World Cup · Lenzerheide', disc: 'XCO', result: 'WIN', medal: 'WIN', m: 6, year: '2026', role: 'CFR · head mechanic (crew lead)' },
  { pos: 'P1', rider: 'Luca Martin', event: 'World Cup overall · leader into the final rounds', disc: 'XCO', result: 'SERIES LEADER', medal: 'LEADER', m: 12, year: '2026', role: 'CFR · head mechanic (crew lead)' },
  { pos: 'P1', rider: 'Charlie Aldridge', event: 'World Cup · Les Gets XCC + Mont-Sainte-Anne XCO', disc: 'XCC/XCO', result: 'FIRST ELITE WC WINS', medal: 'WIN', m: 8, year: '2025', role: 'CFR · head mechanic (crew lead)' },
  { pos: 'P2', rider: 'Charlie Aldridge', event: 'World Championships · Val di Sole', disc: 'XCO', result: 'SILVER', medal: 'SILVER', m: 8, year: '2026', role: 'CFR · head mechanic (crew lead)' },
  { pos: 'P2', rider: 'Charlie Aldridge', event: 'World Championships · Val di Sole', disc: 'XCC', result: 'SILVER', medal: 'SILVER', m: 8, year: '2026', role: 'CFR · head mechanic (crew lead)' },
  { pos: 'P2', rider: 'Rachel Atherton', event: 'World Championships · Hafjell', disc: 'DH', result: 'SILVER', medal: 'SILVER', m: 9, year: '2014', role: 'GT FR · head mechanic' },
  { pos: 'P2', rider: 'Gee Atherton', event: 'World Championships · Leogang', disc: 'DH', result: 'SILVER', medal: 'SILVER', m: 9, year: '2012', role: 'GT FR · head mechanic' },
  { pos: 'P2', rider: 'Rachel Atherton', event: 'World Championships · Champéry', disc: 'DH', result: 'SILVER', medal: 'SILVER', m: 9, year: '2011', role: 'Animal Commencal · head mechanic' },
  { pos: 'P2', rider: 'Pauline Ferrand-Prévot', event: 'World Championships · Pal Arinsal', disc: 'XCC', result: 'SILVER', medal: 'SILVER', m: 8, year: '2024', role: 'INEOS · her mechanic' },
  { pos: 'P3', rider: 'Cole Punchard', event: 'World Championships · Val di Sole · first elite season', disc: 'XCO', result: 'BRONZE', medal: 'BRONZE', m: 8, year: '2026', role: 'CFR · his mechanic' },
  { pos: 'P3', rider: 'Luca Martin', event: 'World Championships · Val di Sole', disc: 'XCC', result: 'BRONZE', medal: 'BRONZE', m: 8, year: '2026', role: 'CFR · head mechanic (crew lead)' },
];
export const palmares: Row[] = [...rows].sort((a, b) => Number(b.year) - Number(a.year) || (b.m ?? 0) - (a.m ?? 0));

const dev: Row[] = [
  { pos: 'P1', rider: 'Taylor Vernon', event: 'World Cup · Windham · first junior World Cup win, by 0.8 s', disc: 'DH', result: 'JUNIOR WC WIN', medal: 'WIN', year: '2014', m: 8, role: 'GT FR · his mechanic' },
  { pos: 'P1', rider: 'Kade Edwards', event: 'Junior World Championships · Lenzerheide', disc: 'DH', result: 'JUNIOR WORLD CHAMPION', medal: 'GOLD', year: '2018', role: 'Trek FR · head mechanic (crew lead)' },
  { pos: 'P1', rider: 'Charlie Aldridge', event: 'U23 World Championships', disc: 'XCO', result: 'U23 WORLD CHAMPION', medal: 'GOLD', year: '2023', role: 'CFR · mechanic' },
  { pos: 'P2', rider: 'Mille Johnset', event: 'Junior World Championships · Mont-Sainte-Anne', disc: 'DH', result: 'SILVER', medal: 'SILVER', year: '2019', role: 'Atherton Bikes · head mechanic' },
  { pos: 'P3', rider: 'Mille Johnset', event: 'Junior World Championships · Lenzerheide', disc: 'DH', result: 'BRONZE', medal: 'BRONZE', year: '2018', role: 'Trek FR · head mechanic' },
  { pos: 'P2', rider: 'Cole Punchard', event: 'U23 World Championships · Crans-Montana', disc: 'XCO', result: 'SILVER', medal: 'SILVER', year: '2025', role: 'CFR · his mechanic' },
  { pos: 'P3', rider: 'Cole Punchard', event: 'U23 World Championships · Crans-Montana', disc: 'XCC', result: 'BRONZE', medal: 'BRONZE', year: '2025', role: 'CFR · his mechanic' },
];
export const development: Row[] = [...dev].sort((a, b) => Number(b.year) - Number(a.year) || (b.m ?? 0) - (a.m ?? 0));

export const countingRule = 'COUNTING RULE: UCI WORLD CUP ONLY · TOP-5 THROUGH 2024 · TOP-3 FROM 2025 · 100 OF 134 ARE ROOTS & RAIN-VERIFIED DH TOP-5s 2011–19 · RESULTS BELONG TO THE RIDERS — MY ROLE IS STATED PER ROW';
