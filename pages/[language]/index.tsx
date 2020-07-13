import React from 'react';
import {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  // GetServerSideProps,
} from 'next';
import Head from 'next/head';
import {
  getI18nStaticPaths,
  withI18n,
  getI18nProps,
  GetI18nProps,
  GetI18nQuery,
  Link,
} from '../../utils/i18n';
import Title from '../../components/Title';
import SwtitchLink from '../../components/SwitchLink';
import SwtichButton from '../../components/SwitchButton';
import Page2Link from '../../components/Page2Link';

const Page: NextPage = () => (
  <>
    <Head>
      <meta name="title" content="Home" />
      <title>Home</title>
    </Head>
    <Title />
    <SwtitchLink />
    <SwtichButton />
    <Page2Link />
    <Link href="/dynamic">
      <a style={{ display: 'block' }}>
        dynamic (too lazy to translate this text)
      </a>
    </Link>
  </>
);

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getI18nStaticPaths(),
  fallback: false,
});

export const getStaticProps: GetStaticProps<GetI18nProps, GetI18nQuery> = async ({
  params,
}) => ({
  props: await getI18nProps(
    params?.language,
    [
      'NestedTranslation/NestedDir',
      'Page2Link',
      'SwitchButton',
      'SwitchLink',
      'Title',
    ],
  ),
});

export default withI18n(Page, '');
