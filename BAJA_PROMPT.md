# PROMPT: BAJA - The Unforgiving Brutalist Personal Trainer (Anti-Lazy Tracker App)

Act as a Senior UI/UX Designer and Frontend Engineer specializing in **Industrial Neo-Brutalism and Extreme Minimalism**. Your task is to build a single-page React application named **"BAJA"** (Indonesian for steel)—a strict, raw, and unforgiving personal habit and task supervisor.

---

## 1. Core Concept & Archetype

Unlike typical friendly assistants, **BAJA** is a strict supervisor. It treats laziness as a failure.
- **No motivating quotes** (e.g., "Keep it up!", "You're doing great!").
- **No pastel colors, gradients, or soft shadows**.
- **No social features or gamified badges**.
- **Tone**: Rigid, mechanical, objective, and technical.

---

## 2. Visual Theme & Aesthetic Rules (Strict)

- **Palette**: Extreme Monochromatic Dark Mode.
  - Background: Jet Black (`#0a0a0a` / `bg-neutral-950`).
  - Text & Borders: Solid White (`#ffffff` / `text-white`, `border-white`).
  - Accents: Raw Zinc/Stoneware Gray (`#262626` / `bg-neutral-900`, `border-neutral-800`).
  - Warning Red: Solid Blood Red (`#dc2626` / `bg-red-600`) — **strictly** reserved for strike alerts, failures, and lazy states.
- **Borders & Corners**: Thick, solid borders (`border-2` or `border-4 border-white`). **Absolutely zero rounded corners (`rounded-none` everywhere)**.
- **Shadows**: Only hard, solid block shadows (`shadow-[4px_4px_0_0_#fff]`). No soft box-shadows.
- **Typography**: 
  - Headlines & Titles: Extra bold, uppercase, condensed sans-serif (e.g., *Space Grotesk* or *Impact*).
  - Data, Timers, & UI: Monospace (e.g., *Space Mono*, *JetBrains Mono*).

---

## 3. Feature Mapping & Technical Requirements

### Module A: Agenda / Schedule (Time-Blocking)
- **Input**:
  - Task Name (e.g., "LATIHAN FISIK", "MENULIS KODE").
  - Duration (Time block in minutes or hours).
- **Core View**:
  - The UI must display **only the current active task** in a massive block.
  - Render a running countdown timer (HH:MM:SS) in a bold monospace font.
  - Upcoming tasks are displayed in a clean, vertical, raw list below the active task, showing only names and durations. No progress bars or color indicators.

### Module B: Diet Tracker (Binary Checklist)
- **Input**:
  - Simple daily binary questions:
    - **MAKAN BERSIH? (CLEAN EATING?)** [YA / TIDAK]
    - **AIR 2 LITER? (2L WATER?)** [YA / TIDAK]
    - **PROTEIN TERCAPAI? (PROTEIN MET?)** [YA / TIDAK]
  - No database search, no calorie calculator. Just yes or no.
- **Logic**:
  - Clicking "TIDAK" (NO) triggers an instant warning pulse and adds a Strike.

### Module C: Anti-Lazy Strike System (Punishment Logic)
- **Strike Counter**: A visible counter at the top of the interface: `STRIKES: [ 0 / 3 ]`.
- **Strike Triggers**:
  - Timer runs out on the active task without user clicking "DONE".
  - Daily diet tracker targets are marked as "TIDAK" (NO).
- **Punishment States**:
  - **Level 1 (Warning)**: Background of the active block changes to a solid dark red.
  - **Level 2 (Lockout)**: If a user accumulates 3 Strikes or leaves a task unfinished, the app enters **LOCKOUT** state.
    - The screen turns **solid warning red**.
    - The input form to schedule/plan new tasks for tomorrow is **completely locked/disabled**.
    - The lockout stays active until the user manually triggers a "Latihan Tebus" (Redemption Task: e.g., a mandatory 30-minute block that they must complete right now).

---

## 4. UI Layout & Component Wireframe

- **Header**:
  - Left: Title `BAJA // SYSTEM_V1`
  - Right: Strike indicator `STRIKES: [ 0 / 3 ]` (turns red and flashes if strikes > 0)
- **Main Section**:
  - Splits into 2 Columns on desktop:
    - **Left Column (Active Task Panel)**:
      - A massive box displaying the current active task name in `text-4xl font-black`.
      - Monospace countdown timer.
      - Dual buttons: `[ SELESAI / DONE ]` and `[ MENYERAH / SKIP ]` (Skip increments Strike).
    - **Right Column (Diet Checklist & Task Planner)**:
      - Card 1: Binary Diet Checklist (checkboxes/buttons styled as brutalist toggles).
      - Card 2: Simple input form to queue a task (Task name, duration input, and a `[ TAMBAH TUGAS + ]` button).
- **Footer**:
  - Monospace diagnostic text: `SYSTEM_STATUS: NOMINAL` (changes to `SYSTEM_STATUS: WARNING_LOCKOUT` in red when stiked).

---

## 5. Implementation Stack

- Build using **React** and **Tailwind CSS**.
- Use **LocalStorage** to persist task queue, strike counter, and lockout status across browser reloads.
