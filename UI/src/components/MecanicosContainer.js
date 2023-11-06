import { useMemo } from "react";
import styles from "./MecanicosContainer.module.css";

const MecanicosContainer = ({
  mechanicManagementTitle,
  propLeft,
  propTop,
  onGroupContainer1Click,
}) => {
  const groupDiv2Style = useMemo(() => {
    return {
      left: propLeft,
      top: propTop,
    };
  }, [propLeft, propTop]);

  return (
    <div
      className={styles.rectangleParent}
      style={groupDiv2Style}
      onClick={onGroupContainer1Click}
    >
      <div className={styles.groupChild} />
      <div className={styles.administracionDeMecanicos}>
        {mechanicManagementTitle}
      </div>
      <img className={styles.groupItem} alt="" src="/line-8.svg" />
      <img className={styles.groupInner} alt="" src="/line-8.svg" />
    </div>
  );
};

export default MecanicosContainer;
