import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage } from 'umi/locale';
import styles from './Analysis.less';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from '@/components/Charts';
import Trend from '@/components/Trend';
import numeral from 'numeral';
import Yuan from '@/utils/Yuan';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = memo(
  ({
    loading,
    visitData,
    data: { memberTotal = 0, signupTotal = 0, pvTotal = 0, metGoing = 0, metTotal = 0 },
  }) => (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title={<FormattedMessage id="app.analysis.total-sales" defaultMessage="Total Sales" />}
          loading={loading}
          total={metTotal}
          contentHeight={46}
        >
          <Trend flag="up" style={{ marginRight: 16 }}>
            <FormattedMessage id="app.analysis.going" defaultMessage="Weekly Changes" />
            <span className={styles.trendText}>{((metGoing / metTotal) * 100).toFixed(0)}%</span>
          </Trend>
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title={<FormattedMessage id="app.analysis.visits" defaultMessage="Visits" />}
          // action={
          //   <Tooltip
          //     title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          //   >
          //     <Icon type="info-circle-o" />
          //   </Tooltip>
          // }
          total={numeral(pvTotal).format('0,0')}
          contentHeight={46}
        >
          <MiniArea color="#975FE4" data={visitData} />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title={<FormattedMessage id="app.analysis.payments" defaultMessage="Payments" />}
          // action={
          //   <Tooltip
          //     title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          //   >
          //     <Icon type="info-circle-o" />
          //   </Tooltip>
          // }
          total={numeral(signupTotal).format('0,0')}
          contentHeight={46}
        >
          <MiniBar data={visitData} />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title={
            <FormattedMessage
              id="app.analysis.operational-effect"
              defaultMessage="Operational Effect"
            />
          }
          // action={
          //   <Tooltip
          //     title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          //   >
          //     <Icon type="info-circle-o" />
          //   </Tooltip>
          // }
          total={memberTotal}
          contentHeight={46}
        >
          <MiniProgress percent={100} strokeWidth={8} color="#13C2C2" />
        </ChartCard>
      </Col>
    </Row>
  )
);

export default IntroduceRow;
