import styles from './RangeInput.module.css';

const RangeInput = ({ min, max, step, value, onChange }) => {
    return (
        <input className={styles.rangeInput} type="range" min={min} max={max} step={step} value={value} onChange={onChange} />
    );
}

export default RangeInput;