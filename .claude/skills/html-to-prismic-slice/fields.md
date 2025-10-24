# Prismic Field Types Reference

Fields hold pieces of website content, like text, images, and links. They are used to model larger pieces of content in Prismic Slices.

## Common Field Types for Slices

### Boolean
A true/false toggle field.

```json
{
  "type": "Boolean",
  "config": {
    "label": "Show Feature",
    "placeholder_false": "Disabled",
    "placeholder_true": "Enabled",
    "default_value": false
  }
}
```

**Use cases:** Feature toggles, visibility controls, conditional rendering

---

### Color
A color field that stores values in hex format.

```json
{
  "type": "Color",
  "config": {
    "label": "Background Color",
    "placeholder": ""
  }
}
```

**Use cases:** Background colors, text colors, theme customization

**React usage:**
```tsx
<div style={{ backgroundColor: slice.primary.backgroundColor }}>
```

---

### Content Relationship
A reference to another Prismic document.

```json
{
  "type": "Link",
  "config": {
    "label": "Related Article",
    "select": "document",
    "customtypes": ["blog_post", "article"]
  }
}
```

**Use cases:** Linking to blog posts, related content, author profiles

---

### Date
A date field without time information.

```json
{
  "type": "Date",
  "config": {
    "label": "Event Date",
    "placeholder": "Select date"
  }
}
```

**Use cases:** Event dates, publication dates, deadlines

---

### Embed
Embed content from third-party services (YouTube, Vimeo, Spotify, etc.).

```json
{
  "type": "Embed",
  "config": {
    "label": "Video",
    "placeholder": "Paste a YouTube or Vimeo URL"
  }
}
```

**Use cases:** Video embeds, social media posts, audio players

---

### Geopoint
Stores geographical coordinates (latitude and longitude).

```json
{
  "type": "GeoPoint",
  "config": {
    "label": "Location"
  }
}
```

**Use cases:** Store locations, map markers, geographical data

---

### Image
A responsive image field with support for responsive views and thumbnails.

```json
{
  "type": "Image",
  "config": {
    "label": "Hero Image",
    "constraint": {
      "width": 1920,
      "height": 1080
    },
    "thumbnails": [
      {
        "name": "mobile",
        "width": 768,
        "height": 432
      },
      {
        "name": "thumbnail",
        "width": 300,
        "height": 300
      }
    ]
  }
}
```

**Use cases:** Hero images, thumbnails, galleries, icons

**React usage:**
```tsx
import { PrismicNextImage } from "@prismicio/next";

<PrismicNextImage field={slice.primary.image} />
```

---

### Integration Fields
Reference to third-party integration data (requires Integration Fields setup).

```json
{
  "type": "IntegrationFields",
  "config": {
    "label": "Product",
    "catalog": "my-catalog",
    "placeholder": "Select a product"
  }
}
```

**Use cases:** E-commerce products, CMS integrations, external data sources

---

### Link
A link to a web page, media file, or Prismic document.

```json
{
  "type": "Link",
  "config": {
    "label": "Button Link",
    "placeholder": "Select a link",
    "select": null
  }
}
```

**Options for `select`:**
- `null`: Any link type (document, web, media)
- `"document"`: Only Prismic documents
- `"media"`: Only media files
- `"web"`: Only external URLs

**React usage:**
```tsx
import { PrismicNextLink } from "@prismicio/next";

<PrismicNextLink field={slice.primary.buttonLink}>
  Click me
</PrismicNextLink>
```

**Use cases:** Buttons, navigation links, CTAs, file downloads

---

### Link to Media
Specifically for linking to media assets (PDFs, documents, etc.).

```json
{
  "type": "Link",
  "config": {
    "label": "Download PDF",
    "select": "media",
    "placeholder": "Upload or select a file"
  }
}
```

**Use cases:** PDF downloads, document attachments, file uploads

---

### Number
Stores integer or float values.

```json
{
  "type": "Number",
  "config": {
    "label": "Rating",
    "placeholder": "Enter a number"
  }
}
```

**Use cases:** Ratings, counts, prices, percentages, quantities

---

### Rich Text (StructuredText with multi)
Rich text field with formatting options like bold, italic, links, lists, etc.

```json
{
  "type": "StructuredText",
  "config": {
    "label": "Description",
    "multi": "paragraph,preformatted,heading1,heading2,heading3,heading4,heading5,heading6,strong,em,hyperlink,image,embed,list-item,o-list-item,rtl",
    "placeholder": "Enter description text"
  }
}
```

**Common multi options:**
- `paragraph` - Paragraph text
- `strong` - Bold text
- `em` - Italic text
- `hyperlink` - Links
- `list-item` - Unordered list
- `o-list-item` - Ordered list
- `heading1-6` - Headings
- `preformatted` - Code blocks
- `image` - Inline images
- `embed` - Embedded content

**React usage:**
```tsx
import { PrismicRichText } from "@prismicio/react";

<PrismicRichText field={slice.primary.description} />
```

**Use cases:** Long-form content, blog posts, descriptions, formatted text

---

### Title/Heading (StructuredText with single)
Single-line structured text for headings (no formatting options).

```json
{
  "type": "StructuredText",
  "config": {
    "label": "Heading",
    "single": "heading1,heading2,heading3,heading4,heading5,heading6",
    "placeholder": "Enter heading text"
  }
}
```

**React usage:**
```tsx
import { PrismicRichText } from "@prismicio/react";

<div className="text-4xl font-bold">
  <PrismicRichText field={slice.primary.heading} />
</div>
```

**Use cases:** Section headings, titles, single-line text with semantic meaning

---

### Select
Dropdown field with predefined options.

```json
{
  "type": "Select",
  "config": {
    "label": "Button Style",
    "placeholder": "Select style",
    "options": ["primary", "secondary", "outline", "ghost"],
    "default_value": "primary"
  }
}
```

**Use cases:** Style variants, layout options, categories, status values

**React usage:**
```tsx
const buttonClasses = item.buttonStyle === "primary"
  ? "bg-blue-500 text-white"
  : "bg-gray-200 text-black";
```

---

### Text
Simple text string without any formatting.

```json
{
  "type": "Text",
  "config": {
    "label": "Tagline",
    "placeholder": "Enter tagline"
  }
}
```

**Use cases:** Labels, taglines, simple text that doesn't need formatting

---

### Timestamp
Date and time field.

```json
{
  "type": "Timestamp",
  "config": {
    "label": "Event Start Time",
    "placeholder": "Select date and time"
  }
}
```

**Use cases:** Event times, scheduled posts, time-sensitive content

---

### UID
Unique identifier for documents (not commonly used in Slices, more for Custom Types).

```json
{
  "type": "UID",
  "config": {
    "label": "URL Slug",
    "placeholder": "unique-identifier"
  }
}
```

**Use cases:** URL slugs, unique document identifiers

---

## Choosing the Right Field Type

### For Text Content:
- **Simple text** (labels, taglines) → `Text`
- **Headings** (h1, h2, etc.) → `StructuredText` with `single`
- **Rich text** (paragraphs with formatting) → `StructuredText` with `multi`

### For Media:
- **Images** → `Image`
- **Videos/Embeds** → `Embed`
- **File downloads** → `Link` with `select: "media"`

### For Links:
- **Buttons/CTAs** → `Link`
- **File downloads** → `Link` with `select: "media"`
- **Related content** → `Link` with `select: "document"`

### For Options:
- **Style variants** → `Select`
- **Toggle features** → `Boolean`

### For Data:
- **Numbers** (ratings, counts) → `Number`
- **Dates** (events, deadlines) → `Date` or `Timestamp`
- **Colors** → `Color`
- **Locations** → `Geopoint`

---

## Primary vs Items

### Primary Fields
Use for **non-repeating content** that appears once in the slice:
- Main heading
- Introduction text
- Featured image
- Section title

```json
"primary": {
  "heading": { "type": "StructuredText", ... },
  "description": { "type": "StructuredText", ... }
}
```

### Items (Repeating Fields)
Use for **repeating content** that can have multiple instances:
- List items
- Testimonials
- Team members
- Feature cards
- Gallery images
- Buttons

```json
"items": {
  "featureIcon": { "type": "Image", ... },
  "featureTitle": { "type": "Text", ... },
  "featureDescription": { "type": "StructuredText", ... }
}
```

**React usage for items:**
```tsx
{slice.items.map((item, index) => (
  <div key={index}>
    <PrismicNextImage field={item.featureIcon} />
    <h3>{item.featureTitle}</h3>
    <PrismicRichText field={item.featureDescription} />
  </div>
))}
```
