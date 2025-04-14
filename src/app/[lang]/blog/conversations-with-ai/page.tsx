import React from 'react';
import { getDictionary } from '@/lib/dictionaries';
import ConversationsWithAIPost from '@/components/blog/posts/ConversationsWithAIPost';

const ConversationsWithAIPage = async ({ params }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <ConversationsWithAIPost lang={lang} dictionary={dictionary} />
  );
};

export default ConversationsWithAIPage;