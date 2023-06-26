import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { increment, selectCount } from "../../store/counter";
const Test = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const handleclick = () => {
    dispatch(increment());
  };
  return <Button onClick={() => handleclick()}>test{count}</Button>;
};

export default Test;
