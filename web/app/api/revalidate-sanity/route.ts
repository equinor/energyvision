import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { groq } from 'next-sanity';
import { parseBody } from 'next-sanity/webhook';
import { getIsoFromName } from '@/sanity/helpers/localization';
import { client } from '@/sanity/lib/client';

type WebhookPayload = {
  id: string;
  _type: string;
  slug: string;
  lang: string;
};

/*
 *  newsroom has newsroom:en-GB or newsroom:nb-NO
 *  magazineIndex has magazineIndex:en-GB or magazineIndex:nb-NO
 *  homePage has homePage:en-GB or homePage:nb-NO
 *  All other pages have page:{slug} as tag.
 *  subMenu changes will have siteMenu:{locale} as tag.
 *
 *  Tags are not considered here. As they change less frequently.
 *
 *  All other tags have the format {docType}:{locale} as tag.
 */

export async function POST(req: NextRequest) {
  // do not revalidate when optimized fetch is disabled as this unnecessary and cause additional usage.
  if (process.env.NEXT_PUBLIC_OPTIMIZED_SANITY_FETCH === 'false') {
    return new Response(
      'Optimized fetch is disabled. So revalidation is not relevant.',
      { status: 200 },
    );
  }

  try {
    if (!process.env.SANITY_API_TOKEN) {
      return new Response('Missing environment variable SANITY_API_TOKEN', {
        status: 500,
      });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_API_TOKEN,
      true,
    );

    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }
    const docId = body?.id;
    const docType = body?._type;
    const docLang = body?.lang;
    const docSlug = body?.slug;

    if (!docType && !docSlug && !docLang) {
      const message = 'Bad Request';
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    const docsWithoutSlugCurrent = ['page', 'event'];
    //@ts-ignore
    if (docsWithoutSlugCurrent.includes(docType)) {
      const routes = await client.fetch(
        groq`*[_type match "route_*" && content._ref == $id]{"slug": slug.current}`,
        {
          id: docId,
        },
      );

      routes.forEach((route: any) => {
        const tag = `page:${route.slug}`;
        revalidateTag(tag, { expire: 0 });
        console.log(`revalidated tag: ${tag}`);
      });
    } else {
      const prefix =
        docType?.startsWith('route') ||
        ['news', 'localNews', 'magazine'].includes(docType || '')
          ? 'page'
          : docType;
      const tag =
        docType === 'textSnippet'
          ? docType
          : `${prefix}:${prefix === 'page' ? docSlug : getIsoFromName(docLang)}`;
      revalidateTag(tag, { expire: 0 });
      console.log(`revalidated tag: ${tag}`);
    }

    return NextResponse.json({ body });
  } catch (err) {
    console.error(err);
    return new Response((err as Error).message, { status: 500 });
  }
}
