# Travel Soul Spectrum → POI Tag Mapping Logic (MVP)

This document defines the **mapping logic between Travel Soul Spectrum dimensions**
(from the questionnaire) and **POI tagging fields** used in the Shanghai MVP dataset.

The goal is to help the LLM make **consistent, explainable, and human-aligned
recommendation decisions**, without relying on rigid personality types.

---

## 1. Travel Soul Spectrum – Core Dimensions

The questionnaire resolves users into **four continuous psychological dimensions**.
Each dimension ranges from **0 to 1**.

### 1.1 Inner Orientation (Inner ↔ Outer)

Represents whether the traveler prefers **introspective / solitary experiences**
or **social / outward-facing experiences**.

```
inner_orientation ∈ [0, 1]
```

- 1 → highly introspective, prefers calm and solitude  
- 0 → highly social, prefers lively and people-centered places

Derived from: Q1, Q5, Q6, Q11, Q12

---

### 1.2 Exploration Preference (Hidden ↔ Iconic)

Represents whether the traveler prefers **discovering hidden gems**
or visiting **iconic, must-see landmarks**.

```
exploration_preference ∈ [0, 1]
```

- 1 → strong preference for exploration and niche places  
- 0 → strong preference for landmarks and iconic attractions

Derived from: Q3, Q7

---

### 1.3 Structure Preference (Planned ↔ Flow)

Represents how much the traveler relies on **planning and structure**
versus **spontaneity and flow**.

```
structure_preference ∈ [0, 1]
```

- 1 → highly planned, structured traveler  
- 0 → spontaneous, go-with-the-flow traveler

Derived from: Q4, Q8, Q9

---

### 1.4 Meaning Orientation (Meaning ↔ Pleasure)

Represents whether the traveler is driven more by **meaning, connection,
and growth**, or by **pleasure, relaxation, and fun**.

```
meaning_orientation ∈ [0, 1]
```

- 1 → meaning-driven, reflective traveler  
- 0 → pleasure-driven, enjoyment-focused traveler

Derived from: Q1, Q9, Q10

---

## 2. Mapping Logic: Travel Dimensions → POI Tags

This section defines how each psychological dimension influences
POI selection and ranking.

---

### 2.1 Exploration Preference → `exploration_level`

| exploration_preference | Recommended POI exploration_level |
|-----------------------|-----------------------------------|
| > 0.65 | `hidden_gem`, `semi-known` |
| 0.35 – 0.65 | `semi-known` |
| < 0.35 | `iconic` |

**Purpose**  
Controls whether the itinerary emphasizes discovery or must-see attractions.

---

### 2.2 Inner Orientation → `social_density`

| inner_orientation | Recommended POI social_density |
|------------------|--------------------------------|
| > 0.65 | `low-social` |
| 0.35 – 0.65 | `mixed` |
| < 0.35 | `high-social` |

**Purpose**  
Aligns POIs with the traveler’s comfort level around crowds and social energy.

---

### 2.3 Structure Preference → `structure_level`

| structure_preference | Recommended POI structure_level |
|---------------------|----------------------------------|
| > 0.65 | `highly-structured` |
| 0.35 – 0.65 | `semi-structured` |
| < 0.35 | `free-flow` |

**Purpose**  
Ensures POIs match the traveler’s tolerance for planning, schedules, and constraints.

---

### 2.4 Meaning Orientation → `content_type` (Soft Preference)

| meaning_orientation | Preferred content_type |
|--------------------|------------------------|
| > 0.65 | `history_culture`, `art_design`, `nature` |
| 0.35 – 0.65 | `urban_walk`, `neighborhood` |
| < 0.35 | `night_scene`, `food_focus`, `market` |

**Important Note**  
This is a **soft ranking signal**, not a hard filter.
Travelers may still enjoy other content types, but these should be prioritized.

---

## 3. Conflict Resolution Priority (Critical)

When POI tags conflict across dimensions, the LLM should resolve them
using the following priority order:

```
exploration_preference
→ social_density
→ structure_level
→ content_type
```

This order reflects observed decision impact from the questionnaire design.

---

## 4. Implementation Notes

- Internally, the system should operate on **continuous scores**, not labels.
- “Travel MBTI” may be shown to users, but **must not be used as logic primitives**.
- This mapping is intentionally MVP-level and designed to be:
  - explainable
  - adjustable
  - extensible

---

**Status**: MVP Ready  
**Intended Use**: LLM system prompt, recommendation logic, itinerary ranking
 