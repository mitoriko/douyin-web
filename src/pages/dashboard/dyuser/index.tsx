import { Avatar, Card, Col, Divider, Icon, Input, Row, Tag, Card, List } from 'antd';
import React, { PureComponent } from 'react';
import moment from 'moment';
import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import Link from 'umi/link';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'dva';
import { dyUser, StateType } from './model';
import styles from './style.less';
import AvatarList from './components/AvatarList';
import numeral from 'numeral';

interface DyUserProps extends RouteChildrenProps {
  dispatch: Dispatch<any>;
  dyuser: StateType;
  loading: boolean;
}
interface DyUserState {
  tabKey: 'projects';
  inputVisible: boolean;
  inputValue: string;
}

@connect(
  ({
    loading,
    dyuser,
  }: {
    loading: { effects: { [key: string]: boolean } };
    dyuser: StateType;
  }) => ({
    dyuser,
    loading: loading.effects['dyuser/fetchDyUser'],
  }),
)
class DyUser extends PureComponent<DyUserrops, DyUserState> {
  state: DyUserState = {
    inputVisible: false,
    inputValue: '',
    tabKey: 'projects',
  };

  public input: Input | null | undefined = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    // const urlParams = window.location.search;
    // console.log(this.props.match.params.id)

    dispatch({
      type: 'dyuser/fetchDyUser',
      payload: {
        id: this.props.match.params.id,
      },
    });
  }

  onTabChange = (key: string) => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key as DyUserState['tabKey'],
    });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input && this.input.focus());
  };

  saveInputRef = (input: Input | null) => {
    this.input = input;
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  renderChildrenByTabKey = (tabKey: DyUserState['tabKey']) => {
    if (tabKey === 'projects') {
      return <Projects />;
    }
    // if (tabKey === 'applications') {
    //   return <Applications />;
    // }
    // if (tabKey === 'articles') {
    //   return <Articles />;
    // }
    return null;
  };

  render() {
    const { inputVisible, inputValue, tabKey } = this.state;
    const {
      dyuser: { dyUser, list },
      loading,
    } = this.props;
    const dataLoading = loading || !(dyUser && Object.keys(dyUser).length);
    const operationTabList = [
      {
        key: 'projects',
        tab: (
          <span>
            视频 <span style={{ fontSize: 14 }}>({dyUser.opus})</span>
          </span>
        ),
      },
    ];

    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={dataLoading}>
              {!dataLoading && (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={dyUser.avatar} />
                    <div className={styles.name}>{dyUser.nickname}</div>
                    <div>{dyUser.shortid}</div>
                    <div>签名：{dyUser.sign}</div>
                  </div>
                  <div>
                    <p>
                      <i className={styles.title} />
                      <Icon type="star" />
                      <b>粉丝数：{numeral(dyUser.follower).format('0,0')}</b>
                    </p>
                    <p>
                      <i className={styles.group} />
                      <Icon type="heart" />
                      <b>获赞数：{numeral(dyUser.likenum).format('0,0')}</b>
                    </p>
                    <p>
                      <i className={styles.address} />
                      <Icon type="play-circle" />
                      <b>播放量：{numeral(dyUser.sumPlay).format('0,0')}</b>
                    </p>
                    <p>
                      <i className={styles.address} />
                      <Icon type="user-add" />
                      <b>关注数：{numeral(dyUser.focus).format('0,0')}</b>
                    </p>
                    <p>
                      <i className={styles.address} />
                      <Icon type="share-alt" />
                      <b>分享数：{numeral(dyUser.sumShare).format('0,0')}</b>
                    </p>
                    <p>
                      <i className={styles.address} />
                      <Icon type="message" />
                      <b>评论数：{numeral(dyUser.sumComment).format('0,0')}</b>
                    </p>
                  </div>
                  <Divider dashed />
                </div>
              )}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={tabKey}
              onTabChange={this.onTabChange}
            >
              <List<ListItemDataType>
                className={styles.coverCardList}
                rowKey="id"
                grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                dataSource={list}
                renderItem={item => (
                  <List.Item>
                    <Card
                      className={styles.card}
                      hoverable
                      cover={<img alt={item.desc} src={item.coverImg} />}
                    >
                      <Card.Meta title={<a>{item.desc}</a>} />
                      <div>
                        <div className={styles.details}>
                          <p>
                            <i className={styles.title} />
                            累计播放量：{numeral(item.playCount).format('0,0')}
                          </p>
                          <p>
                            <i className={styles.group} />
                            点赞数：{numeral(item.diggCount).format('0,0')}
                          </p>
                          <p>
                            <i className={styles.address} />
                            分享数：{numeral(item.shareCount).format('0,0')}
                          </p>
                          <p>
                            <i className={styles.address} />
                            评论数：{numeral(item.commentCount).format('0,0')}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default DyUser;
