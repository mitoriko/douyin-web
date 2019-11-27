import { Col, Icon, Row, Tooltip, Card, Table } from 'antd';
import React, { Component, Suspense } from 'react';
import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import PageLoading from './components/PageLoading';
import styles from './style.less';
import { ChartCard, Field } from './components/Charts';
import Trend from './components/Trend';
import { FormattedMessage } from 'umi-plugin-react/locale';
import numeral from 'numeral';
import { StateType } from './model';

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
          <a target="_blank" href={'/dashboard/dyuser/' + row.dyId}>
            {row.nickname}
          </a>
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
    render: (text, row, index) => {
      const a = numeral(row.sumPlay).format('0,0');
      return <span>{a}</span>;
    },
  },
  {
    title: <FormattedMessage id="dashboardandanalysis.table.fans" defaultMessage="Fans" />,
    dataIndex: 'follower',
    key: 'follower',
    sorter: (a: { follower: number }, b: { follower: number }) => a.follower - b.follower,
    className: styles.alignRight,
    render: (text, row, index) => {
      const a = numeral(row.follower).format('0,0');
      return <span>{a}</span>;
    },
  },
  {
    title: <FormattedMessage id="dashboardandanalysis.table.video" defaultMessage="Video" />,
    dataIndex: 'opus',
    key: 'opus',
    sorter: (a: { opus: number }, b: { opus: number }) => a.opus - b.opus,
    className: styles.alignRight,
    render: (text, row, index) => {
      const a = numeral(row.opus).format('0,0');
      return <span>{a}</span>;
    },
  },
  {
    title: <FormattedMessage id="dashboardandanalysis.table.zan" defaultMessage="Digg" />,
    dataIndex: 'likenum',
    key: 'likenum',
    sorter: (a: { likenum: number }, b: { likenum: number }) => a.likenum - b.likenum,
    className: styles.alignRight,
    render: (text, row, index) => {
      const a = numeral(row.likenum).format('0,0');
      return <span>{a}</span>;
    },
  },
  {
    title: <FormattedMessage id="dashboardandanalysis.table.comment" defaultMessage="Comment" />,
    dataIndex: 'sumComment',
    key: 'sumComment',
    sorter: (a: { sumComment: number }, b: { sumComment: number }) => a.sumComment - b.sumComment,
    className: styles.alignRight,
    render: (text, row, index) => {
      const a = numeral(row.sumComment).format('0,0');
      return <span>{a}</span>;
    },
  },
  {
    title: <FormattedMessage id="dashboardandanalysis.table.share" defaultMessage="Share" />,
    dataIndex: 'sumShare',
    key: 'sumShare',
    sorter: (a: { sumShare: number }, b: { sumShare: number }) => a.sumShare - b.sumShare,
    className: styles.alignRight,
    render: (text, row, index) => {
      const a = numeral(row.sumShare).format('0,0');
      return <span>{a}</span>;
    },
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

  componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch({
      type: 'dashboardTotal/fetchTotalData',
    });
  }

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
                  total={numeral(total_follower).format('0,0')}
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
                  total={numeral(total_opus).format('0,0')}
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
                  total={numeral(total_play).format('0,0')}
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
                  total={numeral(total_likenum).format('0,0')}
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
                  total={numeral(total_comment).format('0,0')}
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
                  total={numeral(total_share).format('0,0')}
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
        </React.Fragment>
      </GridContent>
    );
  }
}

export default Analysis;
