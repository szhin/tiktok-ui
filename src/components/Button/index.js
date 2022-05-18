import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    children,
    leftIcon,
    rightIcon,
    className,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] == 'function') {
                delete props[key];
            }
        });
    }
    // thêm ...passProps để sau này trong thẻ Comp bên index.js có thể thực thi thêm các lệnh phía sau
    // Ví dụ target = "_blank"

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        // có className thì lấy className làm key
        // nếu className, thì nó sẽ hiểu là className: className,
        primary,
        outline,
        text,
        small,
        large,
        disabled,
        rounded,
    });
    // khi nào props primary đc truyền thì khi đó nó sẽ add thêm class primary
    // khi nào scss vào .primary thì nó mới module hóa primary trên source code
    // ban đầu bên button cái dấu login là primary
    // sau đó scss thì nó thành Button_primary_....

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
