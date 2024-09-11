import React from 'react';
import styles from './Css/list_host.module.css';

function ListHost() {
  return (
    <div className={styles.container}>
      {/* Filter Section */}
      <div className={styles.filterSection}>
        {/* Search Bar */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Find Province"
            className={styles.searchInput}
          />
          <input
            type="text"
            placeholder="Find Name"
            className={styles.searchInput}
          />
        </div>

        {/* Date and Filters */}
        <div className={styles.filterTags}>
          <div className={styles.filterTag}>Sat, Nov 10 - Fri, Nov 24</div>
          <div className={styles.filterTag}>Home</div>
          <div className={styles.filterTag}>Room - 2</div>
          <div className={styles.filterTag}>Cat - Dog - Snake</div>
          <div className={styles.filterTag}>Pets - 3</div>
        </div>
      </div>

      {/* Card Grid */}
      <div className={styles.cardGrid}>
        {/* Cards */}
        {[...Array(9)].map((_, index) => (
          <div key={index} className={styles.card}>
            <img
              src="https://via.placeholder.com/200"
              alt="Host"
              className={styles.cardImage}
            />
            <div className={styles.cardTitle}>Gundam Build Fight...</div>
            <div className={styles.cardLocation}>
              <span>📍 Roi Et</span>
              <span>🏠 Home</span>
            </div>
            <div className={styles.cardPrice}>125–300$</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListHost;
