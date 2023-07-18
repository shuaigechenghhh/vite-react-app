import { useSelector, useDispatch } from "react-redux";
import { increment, selectCount } from "../../store/counter";
import PcBaseTable from '../../components/pc-base-table/index'
import './index.less'

const Test = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const handleclick = () => {
    dispatch(increment());
  };
  return <div className="mian">
  <PcBaseTable></PcBaseTable>
  </div> ;
};

export default Test;
