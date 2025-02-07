import styles from './BasicTextArea.module.scss';

interface Props {
    value: string;
    height?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

export const BasicTextArea = ({value, height = "200px", placeholder, onChange}: Props) => {
    const handleChangeValue = (event) => {
        if (typeof onChange === 'function') {
            onChange(event.target.value);
        }
    };

    return (
        <div className={styles.basicTextArea}>
            <textarea
                value={value}
                onChange={handleChangeValue}
                style={{height}}
                placeholder={placeholder ? placeholder : ""}
            />
        </div>
    )
}