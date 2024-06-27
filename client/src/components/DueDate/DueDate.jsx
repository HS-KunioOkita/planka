import upperFirst from 'lodash/upperFirst';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import getDateFormat from '../../utils/get-date-format';

import styles from './DueDate.module.scss';

const SIZES = {
  TINY: 'tiny',
  SMALL: 'small',
  MEDIUM: 'medium',
};

const LONG_DATE_FORMAT_BY_SIZE = {
  tiny: 'longDate',
  small: 'longDate',
  medium: 'longDateTime',
};

const FULL_DATE_FORMAT_BY_SIZE = {
  tiny: 'fullDate',
  small: 'fullDate',
  medium: 'fullDateTime',
};

const DueDate = React.memo(({ value, size, isDisabled, onClick, isExpired }) => {
  const [t] = useTranslation();
  const wrapperClass = isExpired ? styles.wrapperExpired : styles.wrapper;

  const dateFormat = getDateFormat(
    value,
    LONG_DATE_FORMAT_BY_SIZE[size],
    FULL_DATE_FORMAT_BY_SIZE[size],
  );

  const contentNode = (
    <span
      className={classNames(
        wrapperClass,
        styles[`wrapper${upperFirst(size)}`],
        onClick && styles.wrapperHoverable,
      )}
    >
      {t(`format:${dateFormat}`, {
        value,
        postProcess: 'formatDate',
      })}
    </span>
  );

  return onClick ? (
    <button type="button" disabled={isDisabled} className={styles.button} onClick={onClick}>
      {contentNode}
    </button>
  ) : (
    contentNode
  );
});

DueDate.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  size: PropTypes.oneOf(Object.values(SIZES)),
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  isExpired: PropTypes.bool,
};

DueDate.defaultProps = {
  size: SIZES.MEDIUM,
  isDisabled: false,
  onClick: undefined,
  isExpired: false,
};

export default DueDate;
