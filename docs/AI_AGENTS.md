# AI Agents Documentation

DRIMM uses AI agents powered by Claude (Anthropic) to automate content operations.

## Overview

AI agents handle:
- Content moderation
- Metadata generation
- Content discovery & recommendations
- Trending topic analysis

## Setup

### 1. Get Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up for an account
3. Create an API key
4. Add to `.env.local`:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 2. Test the Agents

Restart your dev server and test the API endpoints:

```bash
# Test content moderation
curl -X POST http://localhost:3000/api/ai/moderate \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Video","description":"A test description","tags":["test"]}'

# Test metadata generation
curl -X POST http://localhost:3000/api/ai/generate-metadata \
  -H "Content-Type: application/json" \
  -d '{"action":"generate","userInput":"A video about ancient African kingdoms"}'
```

## Agent #1: Content Moderation

**Purpose:** Automatically review video content before publishing

**Features:**
- Detects inappropriate content
- Flags policy violations
- Provides reasoning for decisions
- Suggests corrective actions

**Usage:**

```typescript
import { moderateContent } from '@/lib/ai/agents/contentModeration';

const result = await moderateContent(
  'Video Title',
  'Video description',
  ['tag1', 'tag2']
);

if (result.isApproved) {
  // Publish video
} else {
  // Show flags and reasoning to user
  console.log(result.flags);
  console.log(result.reasoning);
}
```

**Response:**

```typescript
{
  isApproved: boolean;
  flags: string[];
  severity: 'safe' | 'warning' | 'blocked';
  reasoning: string;
  suggestedActions?: string[];
}
```

**Moderation Criteria:**

✅ **Approved:**
- Creative and artistic content
- Educational material
- Cultural storytelling
- Sci-fi and fantasy
- Historical content
- Nature documentaries

❌ **Flagged:**
- Explicit violence
- Adult content
- Hate speech
- Misinformation
- Spam
- Copyright violations

## Agent #2: Metadata Generation

**Purpose:** Create compelling titles, descriptions, and tags

**Features:**
- Generate metadata from user input
- Improve existing metadata
- Auto-generate tags
- SEO optimization
- Cultural sensitivity

**Usage:**

```typescript
import { generateMetadata, improveMetadata, generateTags } from '@/lib/ai/agents/metadataGeneration';

// Generate new metadata
const metadata = await generateMetadata(
  'A video about Anansi the spider trickster',
  {
    aiModel: 'Sora',
    region: 'West Africa'
  }
);

// Improve existing metadata
const improved = await improveMetadata(
  'Old Title',
  'Old description',
  ['old', 'tags']
);

// Generate tags only
const tags = await generateTags('Title', 'Description');
```

**Response:**

```typescript
{
  title: string;
  description: string;
  tags: string[];
  category: string;
  suggestedThumbnailDescription?: string;
}
```

**Best Practices:**
- Provide context (AI model, region, culture)
- Review generated metadata before publishing
- Combine AI suggestions with human creativity
- Use for inspiration, not replacement

## Agent #3: Content Discovery

**Purpose:** Recommend videos and discover trends

**Features:**
- Personalized recommendations
- Similar video discovery
- Trending topic analysis
- Cultural diversity awareness

**Usage:**

```typescript
import { 
  getPersonalizedRecommendations,
  findSimilarVideos,
  analyzeTrendingTopics 
} from '@/lib/ai/agents/contentDiscovery';

// Get personalized recommendations
const recommended = await getPersonalizedRecommendations(
  userWatchHistory,
  allVideos,
  10 // limit
);

// Find similar videos
const similar = await findSimilarVideos(
  currentVideo,
  allVideos,
  6 // limit
);

// Analyze trending topics
const trends = await analyzeTrendingTopics(recentVideos);
```

## API Endpoints

### POST /api/ai/moderate

Moderate video content.

**Request:**
```json
{
  "title": "Video Title",
  "description": "Video description",
  "tags": ["tag1", "tag2"]
}
```

**Response:**
```json
{
  "isApproved": true,
  "flags": [],
  "severity": "safe",
  "reasoning": "Content is appropriate"
}
```

### POST /api/ai/generate-metadata

Generate or improve metadata.

**Request (Generate):**
```json
{
  "action": "generate",
  "userInput": "A video about...",
  "context": {
    "aiModel": "Sora",
    "region": "West Africa"
  }
}
```

**Request (Improve):**
```json
{
  "action": "improve",
  "title": "Current Title",
  "description": "Current description",
  "tags": ["current", "tags"]
}
```

**Request (Generate Tags):**
```json
{
  "action": "generate-tags",
  "title": "Video Title",
  "description": "Video description"
}
```

## Cost Management

Claude API pricing (as of 2024):
- Claude 3.5 Sonnet: $3 per million input tokens, $15 per million output tokens
- Average moderation: ~500 tokens (~$0.002 per video)
- Average metadata generation: ~1000 tokens (~$0.005 per video)

**Tips to reduce costs:**
- Cache common prompts
- Use lower temperature for consistent tasks
- Batch process when possible
- Set max_tokens limits
- Monitor usage in Anthropic console

## Error Handling

All agents include fallback behavior:

```typescript
try {
  const result = await moderateContent(title, description, tags);
} catch (error) {
  // Agent returns safe defaults on error
  // Logs error for monitoring
  // Continues operation
}
```

**Fallback behaviors:**
- Moderation: Approve with warning flag
- Metadata: Return user input or existing data
- Discovery: Return trending/popular content

## Monitoring

Track agent performance:

```typescript
import { trackPerformance } from '@/lib/monitoring';

const start = performance.now();
const result = await moderateContent(title, description, tags);
const duration = performance.now() - start;

trackPerformance('ai_moderation', duration);
```

## Future Agents (Planned)

**Agent #4: Personalization Engine**
- User preference learning
- Viewing pattern analysis
- Custom homepage curation

**Agent #5: Community Manager**
- Auto-respond to common questions
- Flag problematic comments
- Suggest community guidelines

**Agent #6: SEO Optimizer**
- Keyword research
- Title optimization
- Description enhancement

**Agent #7: Trend Detector**
- Real-time trend analysis
- Viral content prediction
- Topic suggestions for creators

## Best Practices

✅ **DO:**
- Test agents thoroughly before production
- Monitor API usage and costs
- Provide human oversight for critical decisions
- Log all agent actions for audit
- Set appropriate timeouts
- Handle errors gracefully

❌ **DON'T:**
- Rely solely on AI for moderation
- Expose API keys in client code
- Skip error handling
- Ignore user feedback on AI decisions
- Use for real-time critical operations without fallbacks

## Troubleshooting

**"API key not found" error:**
- Check `ANTHROPIC_API_KEY` in `.env.local`
- Restart dev server

**Slow response times:**
- Reduce max_tokens
- Use caching
- Consider async processing

**Inconsistent results:**
- Lower temperature (0.3-0.5)
- Improve system prompts
- Add more context

**High costs:**
- Monitor usage in Anthropic console
- Implement rate limiting
- Cache common requests
- Batch process when possible

## Resources

- [Anthropic Documentation](https://docs.anthropic.com)
- [Claude API Reference](https://docs.anthropic.com/claude/reference)
- [Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/prompt-engineering)

## Need Help?

Check the main [README.md](../README.md) or open an issue on GitHub.
