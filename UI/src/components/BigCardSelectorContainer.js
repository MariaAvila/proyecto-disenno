import { useMemo } from "react";
import styles from "./BigCardSelectorContainer.module.css";

const BigCardSelectorContainer = ({
  cardTitle,
  propLeft,
  onGroupContainer1Click,
}) => {
  const groupDivStyle = useMemo(() => {
    return {
      left: propLeft,
    };
  }, [propLeft]);

  return (
    <div
      className={styles.rectangleParent}
      onClick={onGroupContainer1Click}
      style={groupDivStyle}
    >
      <div className={styles.groupChild} />
      <div className={styles.historialDeTrabajos}>{cardTitle}</div>
      <img className={styles.groupItem} alt="" src="/line-8.svg" />
      <img className={styles.groupInner} alt="" src="/line-8.svg" />
    </div>
  );
};

export default BigCardSelectorContainer;
