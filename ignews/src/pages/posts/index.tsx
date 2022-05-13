import { GetStaticProps } from 'next';
import Head from 'next/head';
import { createClient } from '../../../prismicio';
import styles from './styles.module.scss';
import * as prismic from '@prismicio/client'

export default function Posts() {
    return (
        <>
            <Head>
                <title>
                    Posts | Ignews
                </title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href='#'>
                        <time>12 de março de 2021</time>
                        <strong>Creating a Monorepo with </strong>
                        <p>In the guide...</p>
                    </a>
                    <a href='#'>
                        <time>12 de março de 2021</time>
                        <strong>Creating a Monorepo with </strong>
                        <p>In the guide...</p>
                    </a>
                    <a href='#'>
                        <time>12 de março de 2021</time>
                        <strong>Creating a Monorepo with </strong>
                        <p>In the guide...</p>
                    </a>
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
    const client = createClient({ previewData, fetch: "[publication.title]" });

    const response = await client.get({
        fetch: ['publication.title', 'publication.content'],
        predicates: [
            prismic.predicate.at('document.type', 'publication')
        ],
        pageSize: 100
    })

    console.log(JSON.stringify(response, null, 2));
    return {
        props: {}
    }
}