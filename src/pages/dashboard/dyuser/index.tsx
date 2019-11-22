import { Avatar, Card, Col, Divider, Icon, Input, Row, Tag, Card, List } from 'antd';
import React, { PureComponent } from 'react';
import moment from 'moment';
import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import Link from 'umi/link';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'dva';
import { dyUser, StateType } from './model';
// import Projects from './components/Projects';
// import Articles from './components/Articles';
// import Applications from './components/Applications';
import styles from './style.less';
import AvatarList from './components/AvatarList';

const TagType = {
  key: '',
  label: '',
};

interface DyUserProps extends RouteChildrenProps {
  dispatch: Dispatch<any>;
  dyuser: StateType;
  loading: boolean;
}
interface DyUserState {
  newTags: TagType[];
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
    newTags: [],
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

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;
    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [...newTags, { key: `new-${newTags.length}`, label: inputValue }];
    }
    this.setState({
      newTags,
      inputVisible: false,
      inputValue: '',
    });
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
    const { newTags, inputVisible, inputValue, tabKey } = this.state;
    const {
      dyuser: { dyUser, list },
      loading,
    } = this.props;
    const dataLoading = loading || !(dyUser && Object.keys(dyUser).length);
    const operationTabList = [
      // {
      //   key: 'articles',
      //   tab: (
      //     <span>
      //       文章 <span style={{ fontSize: 14 }}>(8)</span>
      //     </span>
      //   ),
      // },
      // {
      //   key: 'applications',
      //   tab: (
      //     <span>
      //       应用 <span style={{ fontSize: 14 }}>(8)</span>
      //     </span>
      //   ),
      // },
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
                      {dyUser.follower}
                    </p>
                    <p>
                      <i className={styles.group} />
                      <Icon type="heart" />
                      {dyUser.likenum}
                    </p>
                    <p>
                      <i className={styles.address} />
                      <Icon type="play-circle" />
                      {dyUser.sumPlay}
                    </p>
                    <p>
                      <i className={styles.address} />
                      <Icon type="user-add" />
                      {dyUser.focus}
                    </p>
                    <p>
                      <i className={styles.address} />
                      <Icon type="share-alt" />
                      {dyUser.sumShare}
                    </p>
                    <p>
                      <i className={styles.address} />
                      <Icon type="message" />
                      {dyUser.sumComment}
                    </p>
                  </div>
                  <Divider dashed />
                  {/* <div className={styles.tags}>
                    <div className={styles.tagsTitle}>标签</div>
                    {currentUser.tags.concat(newTags).map(item => (
                      <Tag key={item.key}>{item.label}</Tag>
                    ))}
                    {inputVisible && (
                      <Input
                        ref={ref => this.saveInputRef(ref)}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                      />
                    )}
                    {!inputVisible && (
                      <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                      >
                        <Icon type="plus" />
                      </Tag>
                    )}
                  </div>
                  <Divider style={{ marginTop: 16 }} dashed />
                  <div className={styles.team}>
                    <div className={styles.teamTitle}>团队</div>
                    <Row gutter={36}>
                      {currentUser.notice &&
                      currentUser.notice.map(item => (
                        <Col key={item.id} lg={24} xl={12}>
                          <Link to={item.href}>
                            <Avatar size="small" src={item.logo} />
                            {item.member}
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </div>*/}
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
                            累计播放量：{item.playCount}
                          </p>
                          <p>
                            <i className={styles.group} />
                            点赞数：{item.diggCount}
                          </p>
                          <p>
                            <i className={styles.address} />
                            分享数：{item.shareCount}
                          </p>
                          <p>
                            <i className={styles.address} />
                            评论数：{item.commentCount}
                          </p>
                        </div>
                        {/*<span>{moment(item.updatedAt).fromNow()}</span>*/}
                        {/*<div className={styles.avatarList}>*/}
                        {/*<AvatarList size="small">*/}
                        {/*{item.members.map(member => (*/}
                        {/*<AvatarList.Item*/}
                        {/*key={`${item.id}-avatar-${member.id}`}*/}
                        {/*src={member.avatar}*/}
                        {/*tips={member.name}*/}
                        {/*/>*/}
                        {/*))}*/}
                        {/*</AvatarList>*/}
                        {/*</div>*/}
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
