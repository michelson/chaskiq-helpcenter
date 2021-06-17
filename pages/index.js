import Head from 'next/head'
import Image from 'next/image'

import Layout from '../components/themes/base/Layout'
import Card from '../components/themes/base/Card'
import {
  ARTICLE_SETTINGS,
  ARTICLE_COLLECTIONS
} from '../client/queries'
import client from '../client/client'
import Link from 'next/link'

export default function Home({site, collections}) {
  return (
    <div className="page">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout className="py-12 sm:px-6 md:px-64 bg-gray-100" site={site}>
        <div className="md:grid md:grid-cols-3 md:gap-x-4 md:gap-y-10">
          {
            collections.map((card)=>(

              <div className="m-4" item key={card.id}>
                <Card
                  title={
                    <Link href={`/${card.slug}`}>
                      <a
                        className={'hover:underline'}
                        color={'primary'}
                      >
                        {card.icon && (
                          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                            <Image src={`https://app.chaskiq.io${card.icon}`} width="200" height="200"/>
                          </div>
                        )}
      
                        <p className="mt-2 text-base">{card.title}</p>
                      </a>
                    </Link>
                  }
                  //description={truncateOnWord(card.description, 120)}
                  description={card.description}
                ></Card>
              </div>
            ))
          }
        </div>
      </Layout>

      
    </div>
  )
}


// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts

  const res = await client(ARTICLE_SETTINGS, {"domain":"dev"})
  const site = await res.json()

  const postsRes = await client(ARTICLE_COLLECTIONS, {"domain":"dev","lang":"en"}) 
  
  const {data: {helpCenter: {collections}}} = await postsRes.json()

  console.log(JSON.stringify(collections))
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      site,
      collections 
    },
  }
}