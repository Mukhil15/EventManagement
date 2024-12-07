import TopBar from '../Components/TopBar'
import styles from '../css/Home.module.css'
import img1 from '../assets/img1.png'
const Homepage = () => {
  return (
    <>
      <div>
        <TopBar/>
      </div>
      <div className={styles.slideContainer}>
      <img src={img1} />
      </div>
    </>
  )
}

export default Homepage
