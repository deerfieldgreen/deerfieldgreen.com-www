# AstroWind Template Reference

Quick reference for building pages and components in this AstroWind-based Astro site.

## Page Template

Every page follows this pattern:

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import Hero from '~/components/widgets/Hero.astro';
import Features from '~/components/widgets/Features.astro';
import Content from '~/components/widgets/Content.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';

const metadata = { title: 'Page Title' };
---

<Layout metadata={metadata}>
  <Hero
    tagline="Optional tagline"
    actions={[
      { variant: 'primary', text: 'Get Started', href: '/contact' },
      { text: 'Learn More', href: '#features' },
    ]}
    image={{ src: '~/assets/images/hero.png', alt: 'Hero' }}
  >
    <Fragment slot="title">Page <span class="text-accent highlight">Title</span></Fragment>
    <Fragment slot="subtitle">Subtitle text here.</Fragment>
  </Hero>

  <Features
    id="features"
    title="Our Features"
    subtitle="What we offer"
    columns={3}
    items={[
      { title: 'Feature 1', description: 'Description', icon: 'tabler:rocket' },
      { title: 'Feature 2', description: 'Description', icon: 'tabler:star' },
      { title: 'Feature 3', description: 'Description', icon: 'tabler:heart' },
    ]}
  />

  <Content
    isReversed
    title="About Us"
    image={{ src: '~/assets/images/team.jpg', alt: 'Team' }}
    items={[
      { title: 'Point 1', description: 'Details...' },
      { title: 'Point 2', description: 'Details...' },
    ]}
  >
    <Fragment slot="content">Paragraph of content here.</Fragment>
  </Content>

  <CallToAction
    actions={[{ variant: 'primary', text: 'Contact Us', href: '/contact' }]}
  >
    <Fragment slot="title">Ready to get started?</Fragment>
    <Fragment slot="subtitle">Reach out to learn more.</Fragment>
  </CallToAction>
</Layout>
```

## Available Widgets

### Hero / Hero2 / HeroText

Full-width banner sections.

```astro
<Hero
  tagline="Optional small text above title"
  image={{ src: '~/assets/images/photo.jpg', alt: 'Description' }}
  actions={[
    { variant: 'primary', text: 'CTA Button', href: '/link' },
    { text: 'Secondary Link', href: '#section' },
  ]}
>
  <Fragment slot="title">Main <span class="text-accent">Title</span></Fragment>
  <Fragment slot="subtitle">Supporting text below the title.</Fragment>
</Hero>
```

### Features / Features2 / Features3

Grid of items with icons.

```astro
<Features
  id="section-id"
  title="Section Title"
  subtitle="Section subtitle"
  tagline="Small label"
  columns={2}  <!-- 1, 2, 3, or 4 -->
  defaultIcon="tabler:star"
  items={[
    {
      title: 'Item Title',
      description: 'Item description text.',
      icon: 'tabler:icon-name',
      callToAction: { text: 'Learn more', href: '/link' },
    },
  ]}
/>
```

### Content

Split layout with text and image. Use `isReversed` to flip sides.

```astro
<Content
  isReversed={false}
  title="Section Title"
  subtitle="Subtitle"
  image={{ src: '~/assets/images/photo.jpg', alt: 'Alt' }}
  callToAction={{ text: 'Read More', href: '/link' }}
  items={[
    { title: 'Bullet 1', description: 'Detail text' },
    { title: 'Bullet 2', description: 'Detail text' },
  ]}
>
  <Fragment slot="content">Rich paragraph content here.</Fragment>
</Content>
```

### Steps / Steps2

Process or timeline display.

```astro
<Steps
  title="How It Works"
  image={{ src: '~/assets/images/process.jpg', alt: 'Process' }}
  items={[
    { title: 'Step 1', description: 'First step details.', icon: 'tabler:number-1' },
    { title: 'Step 2', description: 'Second step details.', icon: 'tabler:number-2' },
    { title: 'Step 3', description: 'Third step details.', icon: 'tabler:number-3' },
  ]}
/>
```

### CallToAction

Centered call-to-action section.

```astro
<CallToAction
  actions={[
    { variant: 'primary', text: 'Get Started', href: '/contact' },
  ]}
>
  <Fragment slot="title">Ready to begin?</Fragment>
  <Fragment slot="subtitle">Contact us today.</Fragment>
</CallToAction>
```

### Contact

Form section with inputs.

```astro
<Contact
  title="Contact Us"
  subtitle="We'd love to hear from you"
  inputs={[
    { type: 'text', name: 'name', label: 'Name' },
    { type: 'email', name: 'email', label: 'Email' },
  ]}
  textarea={{ label: 'Message', name: 'message', placeholder: 'Your message...' }}
  button="Send Message"
/>
```

### Stats

Metric/number displays.

```astro
<Stats
  title="By the Numbers"
  stats={[
    { amount: '50+', title: 'Clients', icon: 'tabler:users' },
    { amount: '$2B', title: 'Assets', icon: 'tabler:currency-dollar' },
    { amount: '15+', title: 'Years', icon: 'tabler:clock' },
  ]}
/>
```

### FAQs

Accordion Q&A section.

```astro
<FAQs
  title="Frequently Asked Questions"
  items={[
    { title: 'Question 1?', description: 'Answer 1.' },
    { title: 'Question 2?', description: 'Answer 2.' },
  ]}
/>
```

### Testimonials

Quote cards.

```astro
<Testimonials
  title="What People Say"
  testimonials={[
    {
      testimonial: 'Quote text here.',
      name: 'Person Name',
      job: 'Title, Company',
      image: { src: '~/assets/images/person.jpg', alt: 'Person' },
    },
  ]}
/>
```

### BlogLatestPosts / BlogHighlightedPosts

Blog feed sections.

```astro
<BlogLatestPosts title="Latest Articles" count={4} />
```

## Common Widget Props

All widgets accept:

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | HTML id for anchor links |
| `isDark` | `boolean` | Dark background variant |
| `bg` | slot | Custom background via `<Fragment slot="bg">` |
| `classes` | `Record` | Custom Tailwind classes per element |

## Button Variants

```astro
{ variant: 'primary', text: 'Label', href: '/link', icon: 'tabler:arrow-right' }
{ variant: 'secondary', text: 'Label', href: '/link' }
{ variant: 'tertiary', text: 'Label', href: '/link' }
{ variant: 'link', text: 'Label', href: '/link' }
```

## Icons

Uses `astro-icon` with these icon sets:
- **Tabler**: `tabler:icon-name` (e.g., `tabler:rocket`, `tabler:heart`, `tabler:arrow-right`)
- **Flat Color Icons**: `flat-color-icons:icon-name`

Browse icons at: https://tabler.io/icons

## Blog Post Frontmatter

```yaml
---
publishDate: 2026-01-15T00:00:00Z    # Required, ISO format with Z
title: "Article Title"
excerpt: "Brief summary for listings."
category: "Category Name"
tags:
  - tag1
  - tag2
author: "Author Name"
image: "~/assets/images/post-image.jpg"
draft: false                            # Set true to hide
---

Article content in Markdown...
```

## Image Paths

Three formats supported:
- **Local**: `~/assets/images/photo.jpg` (optimized by Astro)
- **Absolute URL**: `https://example.com/image.jpg`
- **CDN**: External CDN URLs (cdn.pixabay.com whitelisted)

## Adding a New Page

1. Create `src/pages/pagename.astro` (English)
2. Create `src/pages/ja/pagename.astro` (Japanese mirror)
3. Add navigation links in `src/navigation.ts` (both `headerData` and `headerDataJa`)
4. Use `getPermalink('pagename')` for internal links

## Bilingual Checklist

When adding content, always create both language versions:
- [ ] English page in `src/pages/`
- [ ] Japanese page in `src/pages/ja/`
- [ ] Navigation links in both `headerData` and `headerDataJa`
- [ ] Footer links in both `footerData` and `footerDataJa`
- [ ] Blog posts: English in `src/data/post/` and Japanese in `src/data/post/ja/`
