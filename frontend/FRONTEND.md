# Vendly – Frontend

Frontend is built on `Next.js 16` with `React.js 19` and TypeScript. Tailwind CSS, Shad/CN UI & Lucide Icons for styling.

# Kick your \*ss

Execute following commands inside terminal. In SEQUENCE!!

Install dependencies:

```bash
pnpm install
```

Start development server:

```bash
pnpm run dev
```

## Directory Overview

```
frontend/
├── public/                                    # public assests
│   └── ...
├── src/
│   ├── app/
│   │   ├── login/page.tsx                     # login page
│   │   ├── signup/page.tsx                    # signup page
│   │   ├── verification/page.tsx              # email/account verification page
│   │   ├── ai/page.tsx              # ai agent chat page
│   │   └── favicon.ico
│   │
│   ├── actions/                               # server actions (API proxies)
│   │   └── auth.ts
│   │
│   ├── components/
│   │   ├── auth/                              # authentication related components
│   │   ├── landing/                           # landing page components
│   │   ├── providers/
│   │   │   ├── AppProvider.tsx                # app providers
│   │   │   ├── theme-provider.tsx             # theme-provider
│   │   │   └── ThemeToggle.tsx
│   │   └── ui/
│   │       └── ...                            # Shad/CN UI components
│   │
│   ├── hooks/
│   │   └── use-mobile.ts
│   │
│   ├── lib/
│   │   ├── auth.ts                            # auth, verifyJwt, getJwt, deleteJwt
│   │   ├── utils.ts
│   │   └── validations/                       # Upstash Redis client
│   │       └── auth.ts                        # zod schema types
│   │
│   └── proxy.ts                               # proxy middleware
│
└── FRONTEND.md                                # you're right here
```

## Caching – Tags and TTL

## Configuration

| Name | Value | Description                  |
| ---- | ----- | ---------------------------- |
| PORT | 3000  | In use by next.js web server |

## License

Secured under [MIT License](../LICENSE). View [LICENSE](../LICENSE) for more details.
