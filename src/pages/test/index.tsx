import { useSelector, useDispatch } from "react-redux";
import { increment, selectCount } from "../../store/counter";
import PcBaseTable from "../../components/pc-base-table/index";
import "./index.less";
import { Button } from "antd";
import {GET} from '../../request/index.ts'
const Test = () => {
  const handleSend=()=>{
    GET('go/api/admin/info')
  }
  return (
    <div className="mian">
      <Button onClick={handleSend}>查询</Button>
      {/* <PcBaseTable></PcBaseTable> */}
    </div>
  );
};

export default Test;
