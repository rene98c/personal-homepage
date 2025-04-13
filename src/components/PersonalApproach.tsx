'use client';

import { useTranslation } from 'next-i18next';

// Personal Approach section to add to the homepage
const PersonalApproach = () => {
  const { t } = useTranslation('home');

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">{t('personalApproach.title')}</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            {t('personalApproach.subtitle')}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl">
          <p className="text-lg/8 text-gray-600 mb-6">
            {t('personalApproach.paragraph1')}
          </p>
          
          <p className="text-lg/8 text-gray-600 mb-6">
            {t('personalApproach.paragraph2')}
          </p>
          
          <p className="text-lg/8 text-gray-600 mb-6">
            {t('personalApproach.paragraph3')}
          </p>
          
          <p className="text-lg/8 text-gray-600">
            {t('personalApproach.paragraph4')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalApproach;