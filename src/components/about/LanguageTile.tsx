import React, { CSSProperties } from 'react';
import classes from './LanguageTile.module.scss';
import { Tooltip, Text } from '@mantine/core';

const images = import.meta.glob('../../assets/languages/*.{png,svg,jpg}', {
  as: 'url',
  eager: true,
});

function LanguageTile({
  language,
  big,
  style,
}: {
  language: string;
  big: boolean;
  style: CSSProperties;
}) {
  const langName = language.replaceAll('.', '').replaceAll(' ', '').toLowerCase();
  const image =
    Object.entries(images).find(([url]) =>
      url.startsWith(`../../assets/languages/${langName}`),
    )?.[1] ?? '';

  return (
    <Tooltip
      label={
        <Text size={20} weight={700}>
          {language}
        </Text>
      }
      position={'bottom'}
      color={'#000000'}
      offset={-10}
    >
      <div className={`${classes.Tile} ${big ? classes.TileBig : ''}`} style={style}>
        <img src={image} alt={''} />
      </div>
    </Tooltip>
  );
}

export default LanguageTile;
