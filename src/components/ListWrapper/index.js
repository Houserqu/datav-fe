import React, { Component } from 'react';
import { getLocationParams, filterObj } from '@/utils/utils';
import { stringify } from 'qs';
import { Pagination, Card } from 'antd';

/**
 * 高阶组件的包装器，用于接受多个参数
 * @param {Component} FilterComponent 检索条件组件:
 *   非受控组件。须接受 defaultValue 初始值，和暴露 onSubmit 提交数据方法
 * @param {function} fetchDataFunc 列表数据查询方法：
 *   返回对象结构约定 { items: [], pageBean: { pageSize, pageNo, totalCount} }
 *   return 的对象最终会通过 props 传递给 页面组件，只有 pageBean 会被父组件使用，items 会被原样传递
 * @param {object} option 配置条件:
 *   pagination: 是否显示分页器
 */
const withSearchAndPaging = (
  FilterComponent,
  fetchDataFunc,
  option = {
    pagination: true,
  }
) => {
  /**
   * 高阶组件生成方法，返回一个封装后的组件。接受的参数是 被包装的 列表组件
   */
  return ContentComponent => {
    /**
     * 列表高阶组件
     */
    return class EnhancedComponent extends Component {
      constructor(props) {
        super(props);
        this.state = {
          searchCondition: getLocationParams(), // 默认获取 url 里的搜索条件
          metaData: {},
          items: [],
          pageBean: {
            pageNo: 1,
            pageSize: 20,
            totalCount: 0,
          },
          loading: false,
        };
      }

      componentDidMount() {
        this.fetchData();
      }

      // 分页器每页条数改变
      onShowSizeChange = (current, pageSize) => {
        this.setState({ searchCondition: { ...this.state.searchCondition, pageSize } }, () => {
          this.fetchData();
        });
      };

      // 请求数据并 setState
      fetchData = () => {
        const { searchCondition } = this.state;

        // 添加默认 pageSize
        if (!('pageSize' in searchCondition)) {
          searchCondition.pageSize = 20;
        }
        // 添加默认 pageNo
        if (!('pageNo' in searchCondition)) {
          searchCondition.pageNo = 1;
        }

        this.setState({ loading: true }, async () => {
          // 执行请求数据方法
          const queryResult = await fetchDataFunc(this.props, searchCondition);
          // 更新 url
          this.props.history.replace(`?${stringify(searchCondition)}`);

          this.setState({
            metaData: queryResult,
            pageBean: queryResult.pageBean,
            items: queryResult.items,
            loading: false,
          });
        });
      };

      // 搜索
      searchSubmit = params => {
        this.setState(
          {
            searchCondition: filterObj({
              ...params,
              pageNo: 1,
              pageSize: this.state.searchCondition.pageSize,
            }),
          },
          () => this.fetchData()
        );
      };

      render() {
        const { items, searchCondition, pageBean = {}, metaData, loading } = this.state;

        // 分页器配置
        const paginationOption = option.pagination
          ? {
              onShowSizeChange: this.onShowSizeChange,
              pageSizeOptions: ['10', '20', '50', '100'],
              defaultCurrent: 1,
              pageSize: pageBean.pageSize || 20,
              current: pageBean.pageNo || 1,
              total: pageBean.totalCount || 0,
              showTotal: total => `共 ${total} 条`,
              onChange: pageNo => {
                this.setState(
                  { searchCondition: { ...this.state.searchCondition, pageNo } },
                  () => {
                    this.fetchData();
                  }
                );
              },
            }
          : null;
        return (
          <div>
            {FilterComponent && (
              <Card>
                <FilterComponent defaultValue={searchCondition} onSubmit={this.searchSubmit} />
              </Card>
            )}

            <ContentComponent
              metaData={metaData}
              pagingData={pageBean}
              itemsData={items}
              loading={loading}
              fetchData={this.fetchData}
              searchConditionData={searchCondition}
              {...this.props}
            />

            {option.pagination && (
              <Card bodyStyle={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination showSizeChanger showQuickJumper {...paginationOption} />
              </Card>
            )}
          </div>
        );
      }
    };
  };
};

export default withSearchAndPaging;
