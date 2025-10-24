---
name: html-to-prismic-slice
description: Converts HTML markup into Prismic Slice components with model.json definitions and React component files. Use when the user wants to turn HTML into a Prismic Slice, create a slice from HTML, or convert markup to Prismic.
---

# HTML to Prismic Slice Converter

This skill converts HTML markup into fully-functional Prismic Slices, including the model.json definition and React component implementation.

## What This Skill Does

1. **Analyzes HTML Structure**: Parses the provided HTML to identify:
   - Content sections and their hierarchy
   - Text content (headings, paragraphs, etc.)
   - Images and media
   - Links and buttons
   - Repeating elements (lists, cards, etc.)

2. **Generates Prismic Slice Model**: Creates a `model.json` file with:
   - Appropriate field types (StructuredText, Image, Link, etc.)
   - Primary fields for non-repeating content
   - Items fields for repeating content
   - Proper configuration with labels and placeholders

3. **Creates React Component**: Generates a Next.js component that:
   - Uses @prismicio/react helpers
   - Implements proper TypeScript types
   - Preserves the original HTML structure and styling
   - Makes content editable through Prismic CMS

4. **Integrates with Project**: Updates the slices index file to register the new slice

## Instructions

When the user provides HTML to convert, **always reference `fields.md`** for choosing appropriate field types and their configurations.

### Step 1: Analyze the HTML
- Parse the HTML structure
- Identify distinct content elements
- Determine what should be editable in Prismic
- Identify repeating patterns (for the `items` array)
- **Check for custom CSS variables** in the HTML classes (e.g., `bg-background-primary`, `text-text-alternative`)
- **Note any Tailwind v4 theme tokens** that may need to be defined in `app/globals.css`

### Step 2: Create the Slice Name
- Ask the user for a slice name (e.g., "hero", "testimonials", "features")
- Use PascalCase for the component name
- Use kebab-case for the directory name

### Step 3: Update CSS Variables (if needed)

**IMPORTANT:** This project uses **Tailwind CSS v4**. Check if the HTML uses custom CSS variables that need to be defined in `app/globals.css`.

Common patterns to look for:
- `bg-background-primary`, `bg-background-alternative`, `bg-background-secondary`
- `text-text-primary`, `text-text-alternative`, `text-text-secondary`
- `border-border-primary`, `border-border-secondary`
- Other custom color tokens or theme variables

**If new variables are needed:**

1. Read the current `app/globals.css` file
2. Add new CSS variables to the `:root` selector (and dark mode variant if applicable)
3. Update the `@theme inline` block to expose variables as Tailwind tokens

**Example:**
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --background-primary: #ffffff;
  --background-alternative: #000000;
  --text-primary: #171717;
  --text-alternative: #ffffff;
  --border-primary: #e5e5e5;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-background-primary: var(--background-primary);
  --color-background-alternative: var(--background-alternative);
  --color-text-primary: var(--text-primary);
  --color-text-alternative: var(--text-alternative);
  --color-border-primary: var(--border-primary);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
    --background-primary: #0a0a0a;
    --background-alternative: #ffffff;
    --text-primary: #ededed;
    --text-alternative: #171717;
  }
}
```

**If no new variables are needed:**
- Proceed to the next step without modifying `app/globals.css`

### Step 4: Generate model.json

**IMPORTANT:** Before creating the model.json, consult the `fields.md` reference file to choose the appropriate field types for the HTML content.

Create the model.json with this structure:

```json
{
  "id": "slice_id",
  "type": "SharedSlice",
  "name": "SliceName",
  "description": "Description of what this slice does",
  "variations": [
    {
      "id": "default",
      "name": "Default",
      "docURL": "...",
      "version": "initial",
      "description": "Default",
      "imageUrl": "",
      "primary": {
        // Non-repeating fields go here
      },
      "items": {
        // Repeating fields go here (if any)
      }
    }
  ]
}
```

**Quick Field Selection Guide:**

Refer to `fields.md` for complete field type definitions and examples. Common mappings:

- **Simple text** (labels, taglines) → `Text`
- **Headings** (h1-h6) → `StructuredText` with `single` config
- **Rich text/paragraphs** (with formatting) → `StructuredText` with `multi` config
- **Images** → `Image`
- **Links/Buttons** → `Link`
- **Dropdown options** (style variants) → `Select`
- **Colors** → `Color`
- **Numbers** → `Number`
- **Toggle features** → `Boolean`

**Primary vs Items:**
- `primary`: Non-repeating content (main heading, intro text, featured image)
- `items`: Repeating content (list items, testimonials, feature cards, buttons)

See `fields.md` for detailed JSON examples and React usage patterns.

### Step 5: Create the React Component

Generate a component at `slices/[slice-name]/index.tsx`:

```tsx
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `SliceName`.
 */
export type SliceNameProps = SliceComponentProps<Content.SliceNameSlice>;

/**
 * Component for "SliceName" Slices.
 */
const SliceName = ({ slice }: SliceNameProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="your-classes-here"
    >
      {/* Implement the HTML structure here */}
      {/* Use PrismicRichText for text fields */}
      {/* Use PrismicNextImage for images */}
      {/* Use PrismicNextLink for links */}

      {/* Example for primary fields: */}
      <PrismicRichText field={slice.primary.heading} />

      {/* Example for items (repeating): */}
      {slice.items.map((item, index) => (
        <div key={index}>
          <PrismicRichText field={item.text} />
        </div>
      ))}
    </section>
  );
};

export default SliceName;
```

**Key Points:**
- Preserve the original HTML structure and CSS classes
- Use `@prismicio/next` components for images and links
- Use `@prismicio/react` for rich text rendering
- Include TypeScript types from generated `prismicio-types.d.ts`
- Add proper data attributes for Prismic preview

### Step 6: Update Slice Registry

Update `slices/index.ts` to include the new slice:

```typescript
import dynamic from "next/dynamic";

export const components = {
  slice_name: dynamic(() => import("./SliceName")),
  // ... other slices
};
```

### Step 7: Generate TypeScript Types

Instruct the user to run:
```bash
npm run slicemachine
```

Then push the slice to Prismic from the Slice Machine UI at http://localhost:9999

## Best Practices

1. **Tailwind CSS v4**: This project uses Tailwind v4 with CSS variables. Always check if custom theme tokens need to be added to `app/globals.css`
2. **Semantic Field Names**: Use descriptive names like `heading`, `description`, `feature_list` instead of generic names
3. **Appropriate Field Types**: Choose the right Prismic field type for the content (consult `fields.md`)
4. **Preserve Styling**: Keep original Tailwind/CSS classes in the component
5. **CSS Variables**: If HTML uses custom tokens like `bg-background-primary`, add them to `app/globals.css`
6. **Repeating Content**: Identify lists/cards and put them in `items` array
7. **Image Optimization**: Use `PrismicNextImage` for automatic image optimization
8. **Link Handling**: Use `PrismicNextLink` for proper link handling (internal/external)
9. **Accessibility**: Maintain semantic HTML structure

## Example Conversion

**Input HTML:**
```html
<section class="bg-gray-100 py-12">
  <div class="container mx-auto">
    <h2 class="text-4xl font-bold">Our Features</h2>
    <p class="text-gray-600">Discover what makes us unique</p>
    <div class="grid grid-cols-3 gap-6">
      <div class="card">
        <img src="/icon1.png" alt="Feature 1">
        <h3>Fast Performance</h3>
        <p>Lightning fast load times</p>
      </div>
      <!-- More cards... -->
    </div>
  </div>
</section>
```

**Output Structure:**
- Slice name: `features`
- Primary fields: `heading`, `subheading`
- Items fields: `icon`, `title`, `description`

## Troubleshooting

- **Missing Types**: Run `npm run slicemachine` to regenerate TypeScript types
- **Slice Not Showing**: Check that the slice is registered in `slices/index.ts`
- **Preview Not Working**: Ensure `/slice-simulator` page exists
- **Build Errors**: Verify all Prismic packages are installed

## Additional Resources

- **`fields.md`** - Complete Prismic field types reference with JSON examples and React usage
- [Prismic Slice Documentation](https://prismic.io/docs/slices)
- [Prismic Field Types](https://prismic.io/docs/fields)
- [@prismicio/next Documentation](https://prismic.io/docs/technologies/nextjs)
