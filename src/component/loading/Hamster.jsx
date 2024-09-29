import React from 'react';
import styles from './WheelAndHamster.module.css'; 
import Loading from "../../assets/loading.gif"

function Hamster() {
  return (
    <div className={styles.hamsterContainer}> 
      <img 
        src={Loading} 
        className={styles.hamsterGif} 
      />
    </div>
  );
}

export default Hamster;
