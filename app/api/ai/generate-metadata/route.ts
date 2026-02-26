import { NextRequest, NextResponse } from 'next/server';
import { generateMetadata, improveMetadata, generateTags } from '@/lib/ai/agents/metadataGeneration';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { action, userInput, title, description, tags, context } = body;

    let result;

    switch (action) {
      case 'generate':
        if (!userInput) {
          return NextResponse.json(
            { error: 'userInput is required for generate action' },
            { status: 400 }
          );
        }
        result = await generateMetadata(userInput, context);
        break;

      case 'improve':
        if (!title || !description) {
          return NextResponse.json(
            { error: 'title and description are required for improve action' },
            { status: 400 }
          );
        }
        result = await improveMetadata(title, description, tags || []);
        break;

      case 'generate-tags':
        if (!title || !description) {
          return NextResponse.json(
            { error: 'title and description are required for generate-tags action' },
            { status: 400 }
          );
        }
        const generatedTags = await generateTags(title, description);
        result = { tags: generatedTags };
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: generate, improve, or generate-tags' },
          { status: 400 }
        );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Metadata generation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
