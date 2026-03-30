# The Daily Chronicle - Serverless News Platform

A modern news website inspired by BBC and NYT, built with React frontend and AWS serverless backend. This project demonstrates real-world cloud architecture patterns suitable for school assignments and professional portfolios.

## Architecture Overview

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser]
    end

    subgraph "AWS CloudFront CDN"
        CF[CloudFront Distribution<br/>api.your-domain.com]
    end

    subgraph "S3 Frontend"
        S3Bucket[S3 Bucket<br/>news-frontend-assets]
    end

    subgraph "API Gateway"
        APIGW[REST API<br/>NewsApi]
    end

    subgraph "AWS Lambda"
        L1[ListArticlesHandler]
        L2[GetArticleHandler]
        L3[FilterByCategoryHandler]
    end

    subgraph "DynamoDB"
        DDB[(Articles Table<br/>Partition: articleId<br/>GSI: categoryIndex)]
    end

    Browser --> CF
    CF -->|/static/*| S3Bucket
    CF -->|/api/*| APIGW
    APIGW -->|/articles| L1
    APIGW -->|/articles/{id}| L2
    APIGW -->|/articles?category=| L3
    L1 --> DDB
    L2 --> DDB
    L3 --> DDB

    style S3Bucket fill:#FF9900,color:#000
    style CF fill:#00A1C9,color:#fff
    style APIGW fill:#FF9900,color:#000
    style DDB fill:#3F8624,color:#fff
    style Browser fill:#4283E4,color:#fff
```

## Architecture Comparison with BBC/NYT

| Component | This Project | BBC | NYT |
|-----------|-------------|-----|-----|
| Frontend | React + S3 + CloudFront | Next.js + Fastly | Next.js + AWS |
| API | API Gateway + Lambda | Internal services | GraphQL + REST |
| Database | DynamoDB | PostgreSQL | Apache Cassandra |
| CDN | CloudFront | Fastly | Fastly + CloudFront |
| Authentication | Optional | Auth0 | Custom + OAuth |
| Caching | CloudFront caching | Varnish + CDN | Redis + CDN |

## Project Structure

```
news/
├── frontend/                 # React 18 + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── components/      # Navbar, HeroArticle, ArticleCard, Footer, etc.
│   │   ├── pages/            # HomePage, SectionPage, ArticlePage
│   │   ├── hooks/            # useArticles, useArticle
│   │   ├── context/          # SearchContext
│   │   ├── types/            # TypeScript interfaces
│   │   ├── utils/            # API client, helpers
│   │   └── test/             # React Testing Library tests
│   ├── public/               # Static assets
│   └── package.json
│
├── backend/                  # AWS CDK + TypeScript
│   ├── src/
│   │   ├── handlers/         # Lambda function handlers
│   │   └── infrastructure/   # CDK stack definitions
│   ├── test/                 # Backend tests
│   └── package.json
│
├── scripts/                  # Utility scripts
│   └── seedData.ts           # DynamoDB seed script
│
└── README.md                 # This file
```

## Features

### Frontend
- Responsive design with Tailwind CSS
- Editorial aesthetic with Playfair Display serif font
- BBC-inspired red accent color (#BB1919)
- Asymmetric newspaper-style grid layouts
- React Router v6 for client-side navigation
- TypeScript for type safety
- React Testing Library for unit tests

### Backend
- AWS Lambda functions (Node.js 20.x)
- Amazon DynamoDB with Global Secondary Index
- API Gateway REST API with CORS support
- CloudFront distribution for global content delivery
- S3 bucket for static frontend hosting
- IAM roles with least-privilege permissions

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/articles` | List all articles (paginated) |
| GET | `/articles/{id}` | Get article by ID |
| GET | `/articles?category={cat}` | Filter by category |

### Response Format

```json
{
  "articles": [
    {
      "articleId": "uuid",
      "title": "Article Title",
      "summary": "Brief summary...",
      "body": "Full article content...",
      "author": "Author Name",
      "date": "2024-03-15T09:00:00Z",
      "category": "technology",
      "imageUrl": "https://...",
      "readTimeMinutes": 5
    }
  ],
  "count": 8
}
```

## Deployment Instructions

### Prerequisites

- Node.js 20.x or later
- AWS CLI configured with appropriate credentials
- Python 3.x (for CDK)
- AWS CDK CLI installed

### Step 1: Deploy Backend Infrastructure

```bash
cd backend

# Install dependencies
npm install

# Build TypeScript handlers
npm run build

# Install Python dependencies for CDK
pip install -r requirements.txt  # Create this file if needed

# Deploy infrastructure
cdk deploy --all
```

### Step 2: Build and Deploy Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env file with API URL
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL

# Build for production
npm run build
```

### Step 3: Seed Database

```bash
cd scripts

# Install dependencies
npm install

# Configure AWS credentials
export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key

# Run seed script
npm run seed
```

### Step 4: Update Frontend .env

After deployment, update the frontend `.env` file with your API Gateway URL:

```
VITE_API_BASE_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/prod
```

Then rebuild the frontend:

```bash
cd frontend
npm run build
```

## Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend (Local Testing)

For local Lambda testing, you can use AWS SAM CLI:

```bash
cd backend
sam build
sam local invoke GetArticleHandler -e test/events/get-article.json
```

## Testing

### Frontend Tests

```bash
cd frontend
npm test
```

### Backend Tests

```bash
cd backend
npm test
```

## Cost Optimization

This architecture uses several cost-saving measures:

1. **DynamoDB On-Demand**: Pay only for read/write capacity used
2. **CloudFront Caching**: Reduces origin requests
3. **Lambda Concurrency**: Scales automatically, no idle resources
4. **S3 Standard Storage**: Cost-effective for static assets

Estimated monthly cost for moderate traffic: **$10-50/month**

## Security Best Practices

- IAM roles with least-privilege permissions
- DynamoDB table with no write access from Lambda (seed uses separate credentials)
- CloudFront HTTPS-only with TLS 1.2+
- CORS configured for specific origins (update for production)
- No secrets stored in code or environment variables in production

## Extending the Project

### Adding Authentication

```typescript
// In CDK, add Cognito User Pool authorizer
const authorizer = new apigateway.CognitoUserPoolsAuthorizer(...)
```

### Adding Real-Time Updates

```typescript
// Use API Gateway WebSocket API
const wsApi = new apigatewayv2.WebSocketApi(...)
```

### Adding Search

```typescript
// Add CloudSearch or OpenSearch Service
const search = new cloudsearch.Domain(...)
```

## References

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [DynamoDB Best Practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)

## License

MIT License - Feel free to use for educational purposes.
