## Sound Scout

#### What's this project about?

- Sound Scout was a project I've work for a long time and improved a lot my web development knowledge.
- The idea it's quite simple: A GPT wrapper that takes any prompt from the user, contextulizes it, asks for tracks related, and calls the Spotify API.

#### Why it's not deployed?

- The main reason why this project didn't make it to the end was due to Spotify's API use policies which states that the API interactions should not be made to train any type for ML model. Even though no data fetched from the API is not being sent to the OpenAI endpoint, they still consider it a violation of their policies.

#### Can I deploy it?

- Yes, but there's some caviats you need to be aware of. For the db services, I've opted for a serveless MySQL db called PlanetScale mostly for their amazing product and generous free plan. The following days, they're retiring their free plan so a possible migration and tweets to the db schema have to be done.
- Also the enviroment variables related to OpenAI and Spotify API should be set up.

#### Can I get a preview?

- Yeah, you can access the login page at [https://sound-scout.vercel.app/auth/signin], scroll down and understand the project's flow.


## Getting Started - Next.js

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
