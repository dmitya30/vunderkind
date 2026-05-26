# Промпты для генерации изображений

> Целевые генераторы: GPT Image 2.0 или Nano Banana Pro/2
> Формат: горизонтальные (16:9 или 3:2), высокое разрешение
> Стиль: фотореалистичный, светлый, чистый, современный. Тёплые тона. Без текста на изображениях.
> Люди: европейская внешность, естественные эмоции, без стоковой наигранности

---

## 1. Hero — фоновое изображение

**Назначение:** фон первого экрана, будет затемнён оверлеем для читаемости текста поверх

**Промпт:**
```
Photorealistic wide-angle photo of a bright modern classroom. A child around 8 years old is sitting at a clean white desk, focused and engaged, reading a colorful book with a slight smile. Soft natural light from large windows, blurred bookshelves in the background. Warm tones, shallow depth of field. The atmosphere is calm, focused, and inspiring. No text, no logos, no watermarks. Shot on Canon EOS R5, 35mm lens, f/2.8.
```

**Альтернативный вариант (если нужен более взрослый акцент):**
```
Photorealistic photo of a young professional woman in her late 20s sitting at a minimalist desk in a modern bright office, reading a book with full concentration. Soft warm lighting, clean background with blurred plants. The mood is productive, calm, intellectual. No text, no logos. Shot on Sony A7IV, 50mm, f/2.0.
```

---

## 2. Результаты — иконки

**Назначение:** маленькие иконки рядом с каждым пунктом результатов

**Решение:** НЕ генерировать — использовать SVG-иконки из набора Lucide или Heroicons:
- Скорость чтения → `zap` или `trending-up`
- Память → `brain`
- Концентрация → `target`
- Домашние задания → `clock`
- Мышление → `lightbulb`
- Мотивация → `star`
- Взрослые → `briefcase`

---

## 3. Программы — карточка «Вундеркинд» (5–10 лет)

**Назначение:** изображение в карточке программы

**Промпт:**
```
Photorealistic photo of a cheerful child around 6 years old sitting at a bright desk, holding a pencil and looking at a workbook with curiosity and excitement. The desk has colorful educational materials — building blocks, cards with letters. Bright classroom environment, soft daylight, warm tones. The child is genuinely happy. No text, no logos. Shot on Canon EOS R5, 50mm, f/2.8.
```

---

## 4. Программы — карточка «Техника чтения» (10–14 лет)

**Назначение:** изображение в карточке программы

**Промпт:**
```
Photorealistic photo of a focused schoolboy around 12 years old reading a thick book at a modern clean desk. He is leaning slightly forward, absorbed in the text. A notebook and pen are beside the book. Bright room with white walls and natural light from a window. Calm, studious atmosphere. Warm natural tones. No text, no logos. Shot on Nikon Z6, 85mm, f/2.0.
```

---

## 5. Программы — карточка «Скорочтение» (15+)

**Назначение:** изображение в карточке программы

**Промпт:**
```
Photorealistic photo of a young adult man around 25 years old in a casual smart outfit, sitting at a clean minimalist desk with an open book and a laptop nearby. He is reading with a confident, engaged expression. Modern bright interior, soft window light, clean background. The mood is professional, productive, intellectual. No text, no logos. Shot on Sony A7IV, 50mm, f/1.8.
```

---

## 6. Как проходят занятия

**Назначение:** фоновое или акцентное изображение секции

**Промпт:**
```
Photorealistic photo of a small group of 3 children aged 7-9 sitting together at a bright table in a modern classroom, each working on their own colorful workbook. A female teacher is standing nearby, pointing at something in one child's book with a warm supportive smile. Soft natural lighting, clean modern interior, educational posters slightly blurred on walls. Atmosphere of focused but relaxed learning. No text, no logos. Shot on Canon EOS R5, 35mm, f/2.8.
```

---

## 7. О методике

**Назначение:** изображение рядом с текстом о методике

**Промпт:**
```
Photorealistic close-up photo of a child's hands turning pages of a colorful educational workbook on a clean white desk. Colored pencils and small wooden blocks are scattered nearby. Soft warm directional light, shallow depth of field, focus on the hands and the book. The mood is warm, intellectual, and inviting. No text, no logos. Shot on Canon EOS R5, 100mm macro, f/2.8.
```

---

## 8. Отзывы — фон секции

**Назначение:** лёгкий фоновый паттерн или изображение с сильным затемнением

**Решение:** НЕ генерировать отдельное фото. Использовать цветной фон (#F5F5F5) или лёгкий градиент. Секция отзывов должна быть чистой, акцент — на тексте.

---

## 9. Контакты — не требуется

Секция контактов: Яндекс.Карты iframe + текст. Изображение не нужно.

---

## Общие требования к генерации

1. Никакого текста, надписей, логотипов, watermark на изображениях
2. Люди — европейская внешность, естественные позы и эмоции
3. Интерьеры — современные, светлые, чистые (не советский кабинет)
4. Цветовая температура — тёплая (не холодная/синяя)
5. Все фото — горизонтальные (aspect ratio 16:9 или 3:2)
6. Разрешение — максимально доступное для генератора
7. После генерации — оптимизировать вес (WebP, сжатие) перед размещением на сайте
