import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ContentCard.module.css'

const ContentCard = ({ to, title }) => {
    return (
        <div className={styles.contentCard}>
            <Link to={to} className={styles.cardLink}>
                <h2>{title}</h2>
            </Link>
        </div>
    );
};

export default ContentCard;
