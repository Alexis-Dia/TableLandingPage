import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './CoreLayout.scss'

import NavigationBarLayout from '../childLayouts/navigationBarLayout/NavigationBarLayout';

export const CoreLayout = ({ children }) => (
  <div>
    <div >
      <NavigationBarLayout />
        { children }
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.node,
}

export default CoreLayout
