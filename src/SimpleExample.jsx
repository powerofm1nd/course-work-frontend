import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./redux/action/CounterAction";
import styles from "./SimpleExample.module.css";

export const SimpleExample = () => {
    const dispatch = useDispatch();
    // Извлекаем только числовое значение из состояния
    const count = useSelector((state) => state.counter.value); 

    console.log(count)

    return (
        <div className={styles.counterContainer}>
            <button onClick={() => dispatch(increment())}>+</button>
            <span>{count}</span>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
    );
};

export default SimpleExample;
