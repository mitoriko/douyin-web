import { DefaultFooter, MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import Link from 'umi/link';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import SelectLang from '@/components/SelectLang';
import { ConnectProps, ConnectState } from '@/models/connect';
import logo from '../assets/logo.png';
import styles from './UserLayout.less';
import {BasicLayoutProps} from "@/layouts/BasicLayout";
import {isAntDesignPro} from "@/utils/utils";

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
}

const UserLayout: React.SFC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    formatMessage,
    ...props,
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>A-Cubic</span>
              </Link>
            </div>
            <div className={styles.desc}>统计数据就象比基尼，暴露出的那部分固然重要，但没暴露出的那部分才更是要命。</div>
          </div>
          {children}
        </div>

        <DefaultFooter
          copyright="2019 A-Cubic DouYin Big Data"
          links={[
            {
              key: 'A-Cubic',
              title: 'A-Cubic',
              href: 'http://www.a-cubic.com/',
              blankTarget: true,
            },

          ]}
        />
      </div>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({
  ...settings,
}))(UserLayout);
