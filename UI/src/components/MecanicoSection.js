import { useMemo } from "react";
import styles from "./MecanicoSection.module.css";

const MecanicoSection = ({
  mechanicName,
  propTop,
  propCursor,
  propHeight,
  propHeight1,
  onGroupContainer1Click,
}) => {
  const groupDiv1Style = useMemo(() => {
    return {
      top: propTop,
      cursor: propCursor,
    };
  }, [propTop, propCursor]);

  const lineIconStyle = useMemo(() => {
    return {
      height: propHeight,
    };
  }, [propHeight]);

  const lineIcon1Style = useMemo(() => {
    return {
      height: propHeight1,
    };
  }, [propHeight1]);

  return (
    <div
      className={styles.rectangleParent}
      onClick={onGroupContainer1Click}
      style={groupDiv1Style}
    >
      <div className={styles.groupChild} />
      <div className={styles.mecanico1}>{mechanicName}</div>
      <div className={styles.groupItem} />
      <img
        className={styles.groupInner}
        alt=""
        src="/line-8.svg"
        style={lineIconStyle}
      />
      <img
        className={styles.lineIcon}
        alt=""
        src="/line-8.svg"
        style={lineIcon1Style}
      />
    </div>
  );
};

export default MecanicoSection;
