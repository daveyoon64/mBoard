/**
 *
 * ContentSideSheet
 *
 */
import React from 'react';
// import styled from 'styled-components/macro';
// import { useTranslation } from 'react-i18next';

import {
  SideSheet,
  // Card,
  // Heading,
  Pane,
  // Paragraph,
  // majorScale,
  // Tablist,
  // Tab,
} from 'evergreen-ui';

import { Header as SheetHeader } from './Header';
import { TabBar as SheetTabBar } from './TabBar';

interface Props {
  closed: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function ContentSideSheet(props: Props) {
  const { closed, onClose } = props;

  // const { t, i18n } = useTranslation();

  return (
    <SideSheet
      isShown={!closed}
      onCloseComplete={onClose}
      containerProps={{
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
      }}
      preventBodyScrolling
    >
      {props.children}
    </SideSheet>
  );
}
export { SheetHeader, SheetTabBar };

// const Div = styled.div``;
