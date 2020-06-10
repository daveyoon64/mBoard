/**
 *
 * SearchSheet
 *
 */

import React, {
  useLayoutEffect,
  useCallback,
  useRef,
  SyntheticEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectSearchInput } from './selectors';
import { searchSheetSaga } from './saga';

import { SideSheet, Position } from 'evergreen-ui';
import { SearchBox } from './searchBox';

interface Props {}

export function SearchSheet(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: searchSheetSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();
  const history = useHistory();

  const anchorTab = useRef<any>(null);

  useLayoutEffect(() => {
    if (anchorTab && anchorTab.current) anchorTab.current.focus();
  });

  const searchValue = useSelector(selectSearchInput);

  const closeSearchSheet = useCallback(() => {
    history.push('/');
  }, [dispatch, history]);

  const onSearchInput = useCallback(
    (e: SyntheticEvent) => {
      dispatch(
        actions.searchInputUpdated((e.target as HTMLTextAreaElement).value),
      );
    },
    [dispatch, actions],
  );

  return (
    <SideSheet
      position={Position.TOP as any}
      isShown={true}
      onCloseComplete={closeSearchSheet}
    >
      <SearchBox ref={anchorTab} value={searchValue} onInput={onSearchInput} />
    </SideSheet>
  );
}

const Div = styled.div`
  margin: ;
`;