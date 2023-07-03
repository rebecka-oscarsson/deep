import styles from "./userImage.module.scss";

const UserImage = ({ url, widthToHeightRatio }) => {
  return (
<img src={url} alt="" className={widthToHeightRatio<1? styles.portrait : styles.landscape}/>
  );
};

export default UserImage;
