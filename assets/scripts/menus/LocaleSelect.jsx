import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage } from 'react-intl'
import { DEFAULT_LOCALE } from '../locales/constants'
import {
  getAvailableLocales,
  getActualLocaleFromRequested
} from '../locales/locale'
import LoadingSpinner from '../ui/LoadingSpinner'
import { ICON_CHECK } from '../ui/icons'

LocaleSelect.propTypes = {
  locale: PropTypes.string,
  requestedLocale: PropTypes.string,
  selectLocale: PropTypes.func
}

function LocaleSelect (props) {
  const {
    locale = DEFAULT_LOCALE,
    requestedLocale,
    selectLocale = () => {}
  } = props
  const filteredLocales = getAvailableLocales()
  const actuallySelectedLocale = getActualLocaleFromRequested(locale)

  function renderLocaleOptions () {
    // Render each option
    return filteredLocales.map((locale) => {
      const classNames = ['menu-item']

      if (locale.value === actuallySelectedLocale) {
        classNames.push('menu-item-selected')
      }

      // TODO: ARIA roles and attributes have been added to help with
      // testing, but these are not actually to accessible spec
      return (
        <li
          className={classNames.join(' ')}
          key={locale.value}
          onClick={(event) => selectLocale(locale.value)}
          role="option"
          aria-selected={locale.value === actuallySelectedLocale}
        >
          {locale.value === requestedLocale && <LoadingSpinner size="small" />}
          {locale.value === actuallySelectedLocale && (
            <FontAwesomeIcon className="menu-item-icon" icon={ICON_CHECK} />
          )}
          {/* &#x200E; prevents trailing parentheses from going in the wrong place in rtl languages */}
          <span>{locale.label}&#x200E;</span>
          <span className="menu-item-subtext">
            <FormattedMessage id={locale.key} defaultMessage={locale.name} />
          </span>
        </li>
      )
    })
  }

  return (
    <ul
      className="menu-item-group"
      role="listbox"
      aria-labelledby="settings-menu-language-select"
    >
      {renderLocaleOptions()}
    </ul>
  )
}

export default LocaleSelect
