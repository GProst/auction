import React from 'react'
import styled from 'styled-components'
import {Link as _Link} from 'react-router-dom'

import Button from '@material-ui/core/Button/Button'

import {ROUTES} from '../../routes'

const Link = styled(_Link)`
  text-decoration: none;
  color: inherit;
  padding: 8px 16px;
`

export const HomePageLink = () => (
  <Button variant='contained' style={{padding: 0, position: 'absolute', right: 0, top: 0, margin: '30px 40px'}}>
    <Link to={ROUTES.root}>
      Go to Home page
    </Link>
  </Button>
)
HomePageLink.displayName = 'HomePageLink'
