import styles from "./PageHeaderLoggedIn.module.css";

const PageHeaderLoggedIn = ({ onGroupIconClick, onLogoText1Click }) => {
  return (
    <div className={styles.rectangleParent}>
      <div className={styles.groupChild} />
      <div className={styles.logo}>Logo</div>
      <img
        className={styles.groupItem}
        alt=""
        src="/group-41.svg"
        onClick={onGroupIconClick}
      />
      <img className={styles.groupInner} alt="" src="/group-3.svg" />
      <div className={styles.logo1} onClick={onLogoText1Click}>
        Logo
      </div>
    </div>
  );
};

export default PageHeaderLoggedIn;
