import { useMemo } from "react";
import styles from "./SectionCard.module.css";

const SectionCard = ({ serviceTitle, propTop, propHeight, propHeight1 }) => {
  const groupDivStyle = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

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
    <div className={styles.rectangleParent} style={groupDivStyle}>
      <div className={styles.groupChild} />
      <div className={styles.servicio2}>{serviceTitle}</div>
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
      <div className={styles.costoXxxxx}>Costo: ₡‎XXXXX</div>
    </div>
  );
};

export default SectionCard;
