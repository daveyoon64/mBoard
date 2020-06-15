/**
 *
 * HomePage
 *
 */

import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  Link,
  useHistory,
} from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import styled from 'styled-components/macro';

import { reducer, sliceKey, actions } from './slice';
import { selectLists } from './selectors';
import { selectSearchInput } from '../SearchSheet/selectors';
import { homePageSaga } from './saga';

import { Paginator } from '../../components/Paginator';
import { ExpandablePosterList } from '../../components/ExpandablePosterList';
import { MovieSideSheet } from '../MovieSideSheet/Loadable';
import { SearchSheet } from '../SearchSheet/Loadable';
import { SearchBox } from '../SearchSheet/searchBox';
import { DISCOVER_FILTERS } from 'commontypes/api';

interface Props {}

export function HomePage(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });

  const lists = useSelector(selectLists);
  const searchValue = useSelector(selectSearchInput);

  const dispatch = useDispatch();

  const { path } = useRouteMatch();
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const loadFilteredList = useCallback(
    (filterKey: DISCOVER_FILTERS, page?: number) => {
      dispatch(actions.loadFilteredList({ filterKey, page }));
    },
    [],
  );

  const openSearch = useCallback(() => {
    history.push('/search');
  }, []);

  return (
    <>
      <Helmet>
        <title>home</title>
        <meta name="description" content="mBoard homepage" />
      </Helmet>
      <SearchBox onAnyAction={openSearch} value={searchValue} />
      {/* done very quickly */}
      {Object.values(DISCOVER_FILTERS).map(filter => (
        <ExpandablePosterList
          key={filter}
          posters={(lists[filter] && lists[filter]?.pages[1]) || []}
          name={filter}
          onLoad={loadFilteredList}
          tabColor="#FBE6A2"
          overflow
          loading={lists[filter] && lists[filter]?.pages[1] ? false : true}
        />
      ))}

      <Switch>
        <Route path="/search" component={SearchSheet} />
        <Route path="/movie/:id" component={MovieSideSheet} />
        <Redirect path={path} to={`/`} />
      </Switch>
    </>
  );
}

const SearchLink = styled(Link)`
  text-decoration: none;
`;
