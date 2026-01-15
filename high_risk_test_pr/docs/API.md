/**
 * API Documentation
 * Complete API reference and usage examples
 */

# API Documentation

## Base URL

```
http://localhost:3000/api/v1
```

## Authentication

All API endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Users

#### Get Current User
```
GET /users/me
Response: {
  id: string
  email: string
  name: string
  createdAt: timestamp
}
```

#### Update User Profile
```
PUT /users/me
Body: {
  name?: string
  bio?: string
  avatar?: string
}
Response: User object
```

#### Get User by ID
```
GET /users/:id
Response: User object
```

### Posts

#### List Posts
```
GET /posts?page=1&limit=10&sort=-createdAt
Response: {
  items: Post[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}
```

#### Create Post
```
POST /posts
Body: {
  title: string
  content: string
  tags?: string[]
}
Response: Post object
```

#### Update Post
```
PUT /posts/:id
Body: Partial<Post>
Response: Post object
```

#### Delete Post
```
DELETE /posts/:id
Response: { success: boolean }
```

### Comments

#### Get Comments for Post
```
GET /posts/:id/comments
Response: Comment[]
```

#### Create Comment
```
POST /posts/:id/comments
Body: {
  content: string
}
Response: Comment object
```

## Error Handling

All errors follow this format:

```
{
  success: false
  error: {
    code: string
    message: string
    statusCode: number
    timestamp: string
  }
}
```

## Rate Limiting

- 100 requests per minute
- 429 Too Many Requests when exceeded
- Headers included: `X-RateLimit-Limit`, `X-RateLimit-Remaining`

## Response Status Codes

- `200` OK
- `201` Created
- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `429` Too Many Requests
- `500` Internal Server Error
