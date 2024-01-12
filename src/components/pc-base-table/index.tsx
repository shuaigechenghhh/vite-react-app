import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { getUserList } from "../../api/user/index";
import { usePagination } from "@alova/scene-react";

const PcBaseTable = () => {
  const ActionView = () => {
    return <a>删除</a>;
  };
  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: ActionView,
    },
  ];

  const onChange: TableProps<any>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const {
    loading,
    data: list, 
    // 下拉加载时可通过此参数判断是否还需要加载
    isLastPage,

    // 当前页码，改变此页码将自动触发请求
    page: [page, setPage],

    // 每页数据条数
    pageSize: [pageSize, setPageSize],

    // 分页页数
    pageCount,

    // 总数据量
    total,
  } = usePagination(
    (page, pageSize) => getUserList({ page: page, pageSize: pageSize }),
    {
      initialData: {
        data: [],
        total: 0,
      },
      initialPage: 1, // 初始页码，默认为1
      initialPageSize: 10,
    }
  );
  const handlePagination=(page:any,pageSize:any)=>{
    setPage(page)
    setPageSize(pageSize)
  }
  return (
    <Table columns={columns} dataSource={list as any} onChange={onChange} pagination={{total ,onChange:handlePagination}} loading={loading}/>
  );
};

export default PcBaseTable;
