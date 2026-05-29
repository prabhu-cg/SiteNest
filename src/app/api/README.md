# API Routes

This directory will contain Next.js API routes for SiteNest.

## Planned Routes

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - Sign in user
- `POST /api/auth/signout` - Sign out user
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - List user's projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get project details
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project
- `POST /api/projects/[id]/share` - Generate public link

### Sitemap Nodes
- `GET /api/projects/[id]/nodes` - List all nodes in project
- `POST /api/projects/[id]/nodes` - Create new node
- `PUT /api/projects/[id]/nodes/[nodeId]` - Update node
- `DELETE /api/projects/[id]/nodes/[nodeId]` - Delete node

### Edges
- `GET /api/projects/[id]/edges` - List all edges in project
- `POST /api/projects/[id]/edges` - Create new edge
- `DELETE /api/projects/[id]/edges/[edgeId]` - Delete edge

### Exports
- `POST /api/projects/[id]/export/json` - Export as JSON
- `POST /api/projects/[id]/export/png` - Export as PNG

## Implementation Pattern

```typescript
// src/app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('projects')
      .insert([body])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
```

## Authentication

All routes (except auth routes) should verify the user:

```typescript
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  // Get auth token from request
  const token = request.headers.get('authorization')?.split(' ')[1];
  
  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Verify token and get user
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }

  // Continue with endpoint logic
}
```

## Error Handling

Use consistent error responses:

```typescript
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

Status codes:
- 200: Success
- 201: Created
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 404: Not found
- 500: Server error

## CORS

Supabase handles CORS automatically for authenticated requests.

## Rate Limiting

Not yet implemented. Consider for Phase 2.

## Testing

Test routes with:
```bash
# POST request
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"My Project","description":"Test"}'

# GET request
curl http://localhost:3000/api/projects
```

## Deployment

API routes run serverless on Vercel. No special configuration needed.
