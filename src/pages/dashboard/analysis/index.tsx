import { Col, Dropdown, Icon, Menu, Row, Tooltip, Card, Table } from 'antd';

import React, { Component, Suspense } from 'react';

import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { RadioChangeEvent } from 'antd/es/radio';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import { connect } from 'dva';
import PageLoading from './components/PageLoading';
import { getTimeDistance } from './utils/utils';
// import { AnalysisData } from './data.d';
import styles from './style.less';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from './components/Charts';
import Trend from './components/Trend';
import Yuan from './utils/Yuan';
import { FormattedMessage } from 'umi-plugin-react/locale';
import numeral from 'numeral';
import { StateType } from './model';
import { list } from '@/pages/dashboard/analysis/model';

// const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
// const SalesCard = React.lazy(() => import('./components/SalesCard'));
// const TopSearch = React.lazy(() => import('./components/TopSearch'));
// const ProportionSales = React.lazy(() => import('./components/ProportionSales'));
// const OfflineData = React.lazy(() => import('./components/OfflineData'));

interface AnalysisProps {
  dashboardTotal: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface AnalysisState {
  // StateType:StateType;
}
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};
const columns = [
  {
    title: <FormattedMessage id="dashboardandanalysis.table.rank" defaultMessage="Rank" />,
    dataIndex: 'index',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: <FormattedMessage id="dashboardandanalysis.table.username" defaultMessage="User" />,
    dataIndex: 'nickname',
    key: 'nickname',
    render: (text, row, index) => {
      return (
        <span>
          <img style={{ height: 40 }} src={row.avatar} />{' '}
          <a href={'/dashboard/dyuser?id=' + row.dyId}>{row.nickname} </a>
        </span>
      );
    },
  },
  {
    title: <FormattedMessage id="dashboardandanalysis.table.play" defaultMessage="Play" />,
    dataIndex: 'sumPlay',
    key: 'sumPlay',
    sorter: (a: { sumPlay: number }, b: { sumPlay: number }) => a.sumPlay - b.sumPlay,
    className: styles.alignRight,
  },
  {
    title: <FormattedMessage id="dashboardandanalysis.table.fans" defaultMessage="Fans" />,
    dataIndex: 'follower',
    key: 'follower',
    sorter: (a: { follower: number }, b: { follower: number }) => a.follower - b.follower,
    className: styles.alignRight,
  },
  {
    title: <FormattedMessage id="dashboardandanalysis.table.video" defaultMessage="Video" />,
    dataIndex: 'opus',
    key: 'opus',
    sorter: (a: { opus: number }, b: { opus: number }) => a.opus - b.opus,
    className: styles.alignRight,
  },
  {
    title: <FormattedMessage id="dashboardandanalysis.table.zan" defaultMessage="Digg" />,
    dataIndex: 'sumDigg',
    key: 'sumDigg',
    sorter: (a: { sumDigg: number }, b: { sumDigg: number }) => a.sumDigg - b.sumDigg,
    className: styles.alignRight,
  },
  {
    title: <FormattedMessage id="dashboardandanalysis.table.comment" defaultMessage="Comment" />,
    dataIndex: 'sumComment',
    key: 'sumComment',
    sorter: (a: { sumComment: number }, b: { sumComment: number }) => a.sumComment - b.sumComment,
    className: styles.alignRight,
  },
  {
    title: <FormattedMessage id="dashboardandanalysis.table.share" defaultMessage="Share" />,
    dataIndex: 'sumShare',
    key: 'sumShare',
    sorter: (a: { sumShare: number }, b: { sumShare: number }) => a.sumShare - b.sumShare,
    className: styles.alignRight,
  },
];

@connect(
  ({
    dashboardTotal,
    loading,
  }: {
    dashboardTotal: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    dashboardTotal,
    loading: loading.effects['dashboardTotal/fetchTotalData'],
  }),
)
class Analysis extends Component<AnalysisProps, AnalysisState> {
  state: AnalysisState = {
    // StateType:{},
  };
  //
  // reqRef: number = 0;
  //
  // timeoutId: number = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch({
      type: 'dashboardTotal/fetchTotalData',
    });
  }

  // this.reqRef = requestAnimationFrame(() => {
  //   dispatch({
  //     type: 'dashboardTotal/fetchTotalData',
  //   });
  // });
  // }

  // componentWillUnmount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'dashboardTotal/clear',
  //   });
  //   cancelAnimationFrame(this.reqRef);
  //   clearTimeout(this.timeoutId);
  // }

  // handleChangeSalesType = (e: RadioChangeEvent) => {
  //   this.setState({
  //     salesType: e.target.value,
  //   });
  // };
  //
  // handleTabChange = (key: string) => {
  //   this.setState({
  //     currentTabKey: key,
  //   });
  // };

  // handleRangePickerChange = (rangePickerValue: RangePickerValue) => {
  //   const { dispatch } = this.props;
  //   this.setState({
  //     rangePickerValue,
  //   });
  //
  //   dispatch({
  //     type: 'dashboardAndanalysis/fetchTotalData',
  //   });
  // };

  // selectDate = (type: 'today' | 'week' | 'month' | 'year') => {
  //   const { dispatch } = this.props;
  //   this.setState({
  //     rangePickerValue: getTimeDistance(type),
  //   });
  //
  //   dispatch({
  //     type: 'dashboardAndanalysis/fetchTotalData',
  //   });
  // };

  // isActive = (type: 'today' | 'week' | 'month' | 'year') => {
  //   const { rangePickerValue } = this.state;
  //   const value = getTimeDistance(type);
  //   if (!rangePickerValue[0] || !rangePickerValue[1]) {
  //     return '';
  //   }
  //   if (
  //     rangePickerValue[0].isSame(value[0], 'day') &&
  //     rangePickerValue[1].isSame(value[1], 'day')
  //   ) {
  //     return styles.currentDate;
  //   }
  //   return '';
  // };

  render() {
    const {} = this.state;
    const {
      dashboardTotal: {
        total_focus,
        total_follower,
        total_likenum,
        total_opus,
        total_digg,
        total_comment,
        total_play,
        total_share,
        list,
      },
      loading,
    } = this.props;
    // let salesPieData;
    // if (salesType === 'all') {
    //   salesPieData = salesTypeData;
    // } else {
    //   salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    // }
    // const menu = (
    //   <Menu>
    //     <Menu.Item>操作一</Menu.Item>
    //     <Menu.Item>操作二</Menu.Item>
    //   </Menu>
    // );
    //
    // const dropdownGroup = (
    //   <span className={styles.iconGroup}>
    //     <Dropdown overlay={menu} placement="bottomRight">
    //       <Icon type="ellipsis" />
    //     </Dropdown>
    //   </span>
    // );

    // const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading />}>
            {/*<IntroduceRow loading={loading} visitData={StateType} />*/}

            <Row gutter={24} type="flex">
              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title={
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.total-fans"
                      defaultMessage="Total Fans"
                    />
                  }
                  action={
                    <Tooltip
                      title={
                        <FormattedMessage
                          id="dashboardandanalysis.analysis.introduce"
                          defaultMessage="Introduce"
                        />
                      }
                    >
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  loading={loading}
                  total={total_follower}
                  footer={
                    <Field
                      label={
                        <FormattedMessage
                          id="dashboardandanalysis.analysis.day-fans"
                          defaultMessage="Day Fans"
                        />
                      }
                      value={'敬请期待...'}
                    />
                  }
                  contentHeight={46}
                >
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.week"
                      defaultMessage="Weekly Changes"
                    />
                    <span className={styles.trendText}>0%</span>
                  </Trend>
                  <Trend flag="down">
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.day"
                      defaultMessage="Daily Changes"
                    />
                    <span className={styles.trendText}>0%</span>
                  </Trend>
                </ChartCard>
              </Col>

              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title={
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.total-video"
                      defaultMessage="Total Video"
                    />
                  }
                  action={
                    <Tooltip
                      title={
                        <FormattedMessage
                          id="dashboardandanalysis.analysis.introduce"
                          defaultMessage="Introduce"
                        />
                      }
                    >
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  loading={loading}
                  total={total_opus}
                  footer={
                    <Field
                      label={
                        <FormattedMessage
                          id="dashboardandanalysis.analysis.day-video"
                          defaultMessage="Day Video"
                        />
                      }
                      value={'敬请期待...'}
                    />
                  }
                  contentHeight={46}
                >
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.week"
                      defaultMessage="Weekly Changes"
                    />
                    <span className={styles.trendText}>0%</span>
                  </Trend>
                  <Trend flag="down">
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.day"
                      defaultMessage="Daily Changes"
                    />
                    <span className={styles.trendText}>0%</span>
                  </Trend>
                </ChartCard>
              </Col>

              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title={
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.total-play"
                      defaultMessage="Total Play"
                    />
                  }
                  action={
                    <Tooltip
                      title={
                        <FormattedMessage
                          id="dashboardandanalysis.analysis.introduce"
                          defaultMessage="Introduce"
                        />
                      }
                    >
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  loading={loading}
                  total={total_play}
                  footer={
                    <Field
                      label={
                        <FormattedMessage
                          id="dashboardandanalysis.analysis.day-play"
                          defaultMessage="Day Play"
                        />
                      }
                      value={'敬请期待...'}
                    />
                  }
                  contentHeight={46}
                >
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.week"
                      defaultMessage="Weekly Changes"
                    />
                    <span className={styles.trendText}>0%</span>
                  </Trend>
                  <Trend flag="down">
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.day"
                      defaultMessage="Daily Changes"
                    />
                    <span className={styles.trendText}>0%</span>
                  </Trend>
                </ChartCard>
              </Col>

              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title={
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.total-zan"
                      defaultMessage="Total digg"
                    />
                  }
                  action={
                    <Tooltip
                      title={
                        <FormattedMessage
                          id="dashboardandanalysis.analysis.introduce"
                          defaultMessage="Introduce"
                        />
                      }
                    >
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  loading={loading}
                  total={total_digg}
                  footer={
                    <Field
                      label={
                        <FormattedMessage
                          id="dashboardandanalysis.analysis.day-zan"
                          defaultMessage="Day digg"
                        />
                      }
                      value={'敬请期待...'}
                    />
                  }
                  contentHeight={46}
                >
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.week"
                      defaultMessage="Weekly Changes"
                    />
                    <span className={styles.trendText}>0%</span>
                  </Trend>
                  <Trend flag="down">
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.day"
                      defaultMessage="Daily Changes"
                    />
                    <span className={styles.trendText}>0%</span>
                  </Trend>
                </ChartCard>
              </Col>

              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title={
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.total-comment"
                      defaultMessage="Total comment"
                    />
                  }
                  action={
                    <Tooltip
                      title={
                        <FormattedMessage
                          id="dashboardandanalysis.analysis.introduce"
                          defaultMessage="Introduce"
                        />
                      }
                    >
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  loading={loading}
                  total={total_comment}
                  footer={
                    <Field
                      label={
                        <FormattedMessage
                          id="dashboardandanalysis.analysis.day-comment"
                          defaultMessage="day-comment"
                        />
                      }
                      value={'敬请期待...'}
                    />
                  }
                  contentHeight={46}
                >
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.week"
                      defaultMessage="Weekly Changes"
                    />
                    <span className={styles.trendText}>0%</span>
                  </Trend>
                  <Trend flag="down">
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.day"
                      defaultMessage="Daily Changes"
                    />
                    <span className={styles.trendText}>0%</span>
                  </Trend>
                </ChartCard>
              </Col>

              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title={
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.total-share"
                      defaultMessage="Total share"
                    />
                  }
                  action={
                    <Tooltip
                      title={
                        <FormattedMessage
                          id="dashboardandanalysis.analysis.introduce"
                          defaultMessage="Introduce"
                        />
                      }
                    >
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  loading={loading}
                  total={total_share}
                  footer={
                    <Field
                      label={
                        <FormattedMessage
                          id="dashboardandanalysis.analysis.day-share"
                          defaultMessage="Day share"
                        />
                      }
                      value={'敬请期待...'}
                    />
                  }
                  contentHeight={46}
                >
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.week"
                      defaultMessage="Weekly Changes"
                    />
                    <span className={styles.trendText}>0%</span>
                  </Trend>
                  <Trend flag="down">
                    <FormattedMessage
                      id="dashboardandanalysis.analysis.day"
                      defaultMessage="Daily Changes"
                    />
                    <span className={styles.trendText}>0%</span>
                  </Trend>
                </ChartCard>
              </Col>
            </Row>
          </Suspense>
          <Suspense fallback={<PageLoading />}>
            <Card
              loading={loading}
              bordered={false}
              title={
                <FormattedMessage
                  id="dashboardandanalysis.table.title"
                  defaultMessage="User Ranking Table"
                />
              }
              /*extra={dropdownGroup}*/
              style={{
                height: '100%',
              }}
            >
              <Table<any>
                rowKey={record => record.index}
                size="small"
                columns={columns}
                dataSource={list}
                pagination={false}
              />
            </Card>
          </Suspense>
          {/*<Suspense fallback={null}>*/}
          {/*<SalesCard*/}
          {/*rangePickerValue={rangePickerValue}*/}
          {/*salesData={salesData}*/}
          {/*isActive={this.isActive}*/}
          {/*handleRangePickerChange={this.handleRangePickerChange}*/}
          {/*loading={loading}*/}
          {/*selectDate={this.selectDate}*/}
          {/*/>*/}
          {/*</Suspense>*/}
          {/*<Row*/}
          {/*gutter={24}*/}
          {/*type="flex"*/}
          {/*style={{*/}
          {/*marginTop: 24,*/}
          {/*}}*/}
          {/*>*/}
          {/*<Col xl={12} lg={24} md={24} sm={24} xs={24}>*/}
          {/*<Suspense fallback={null}>*/}
          {/*<TopSearch*/}
          {/*loading={loading}*/}
          {/*visitData2={visitData2}*/}
          {/*searchData={searchData}*/}
          {/*dropdownGroup={dropdownGroup}*/}
          {/*/>*/}
          {/*</Suspense>*/}
          {/*</Col>*/}
          {/*<Col xl={12} lg={24} md={24} sm={24} xs={24}>*/}
          {/*<Suspense fallback={null}>*/}
          {/*<ProportionSales*/}
          {/*dropdownGroup={dropdownGroup}*/}
          {/*salesType={salesType}*/}
          {/*loading={loading}*/}
          {/*salesPieData={salesPieData}*/}
          {/*handleChangeSalesType={this.handleChangeSalesType}*/}
          {/*/>*/}
          {/*</Suspense>*/}
          {/*</Col>*/}
          {/*</Row>*/}
          {/*<Suspense fallback={null}>*/}
          {/*<OfflineData*/}
          {/*activeKey={activeKey}*/}
          {/*loading={loading}*/}
          {/*offlineData={offlineData}*/}
          {/*offlineChartData={offlineChartData}*/}
          {/*handleTabChange={this.handleTabChange}*/}
          {/*/>*/}
          {/*</Suspense>*/}
        </React.Fragment>
      </GridContent>
    );
  }
}

export default Analysis;
