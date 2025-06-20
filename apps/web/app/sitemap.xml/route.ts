import { getServerSideSitemap } from 'next-sitemap';

import { createCmsClient } from '@kit/cms';

import appConfig from '~/config/app.config';

/**
 * @description The maximum age of the sitemap in seconds.
 * This is used to set the cache-control header for the sitemap. The cache-control header is used to control how long the sitemap is cached.
 * By default, the cache-control header is set to 'public, max-age=600, s-maxage=3600'.
 * This means that the sitemap will be cached for 600 seconds (10 minutes) and will be considered stale after 3600 seconds (1 hour).
 */
const MAX_AGE = 60;
const S_MAX_AGE = 3600;

export async function GET() {
  try {
    const paths = getPaths();
    // const contentItems = await getContentItems();

    const headers = {
      'Cache-Control': `public, max-age=${MAX_AGE}, s-maxage=${S_MAX_AGE}`,
    };

    return getServerSideSitemap([...paths], headers);
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // 返回一个基本的sitemap，只包含静态路径
    const basicPaths = getPaths();
    const headers = {
      'Cache-Control': `public, max-age=${MAX_AGE}, s-maxage=${S_MAX_AGE}`,
    };

    return getServerSideSitemap(basicPaths, headers);
  }
}

function getPaths() {
  const paths = [
    '/',
    '/faq',
    '/blog',
    '/docs',
    '/pricing',
    '/contact',
    '/cookie-policy',
    '/terms-of-service',
    '/privacy-policy',
    // add more paths here
  ];

  return paths.map((path) => {
    return {
      loc: new URL(path, appConfig.url).href,
      lastmod: new Date().toISOString(),
    };
  });
}

async function getContentItems() {
  try {
    const client = await createCmsClient();

    // we use a safe, large number to avoid paginating the content items
    const limit = 1000;

    const postsPromise = client
      .getContentItems({
        collection: 'posts',
        content: false,
        limit,
      })
      .then((response) => response.items)
      .then((posts) =>
        posts.map((post) => ({
          loc: new URL(`/blog/${post.slug}`, appConfig.url).href,
          lastmod: post.publishedAt
            ? new Date(post.publishedAt).toISOString()
            : new Date().toISOString(),
        })),
      )
      .catch((error) => {
        console.error('Error fetching posts for sitemap:', error);
        return [];
      });

    const docsPromise = client
      .getContentItems({
        collection: 'documentation',
        content: false,
        limit,
      })
      .then((response) => response.items)
      .then((docs) =>
        docs.map((doc) => ({
          loc: new URL(`/docs/${doc.slug}`, appConfig.url).href,
          lastmod: doc.publishedAt
            ? new Date(doc.publishedAt).toISOString()
            : new Date().toISOString(),
        })),
      )
      .catch((error) => {
        console.error('Error fetching docs for sitemap:', error);
        return [];
      });

    const [posts, docs] = await Promise.all([postsPromise, docsPromise]);
    return [...posts, ...docs];
  } catch (error) {
    console.error('Error creating CMS client for sitemap:', error);
    return [];
  }
}
