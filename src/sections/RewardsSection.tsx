import React from 'react';
import { observer } from 'mobx-react';

import StarIcon from '@material-ui/icons/Star';
import { SectionHeader } from '../components/structure/SectionHeader';
import { Section } from '../components/structure/Section';
import { useSectionsTitlesTranslations } from '../translations/translationsHooks';

export const RewardsSection = observer(() => {
  const sectionTitlesTranslations = useSectionsTitlesTranslations();

  return (
    <Section>
      <SectionHeader title={sectionTitlesTranslations('rewards')} icon={StarIcon} />
    </Section>
  );
});